import * as THREE from 'three'
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry"
import {Controller, GUI} from 'three/examples/jsm/libs/lil-gui.module.min'
import {Font, FontLoader} from "three/examples/jsm/loaders/FontLoader"
import fontJson from './assets/Roboto_Regular.json'
import {botCraft} from "./proto/botCraft"
import State = botCraft.State;
import Options = botCraft.Options;
import EntityType = botCraft.EntityType;

type GamesDataActionV1 = {
    data: number[]
    user: number
}

type GamesDataTickV1 = {
    tick: number
    state: string
    actions: GamesDataActionV1[]
}

type GamesDataUserV1 = {
    id: number
    gh_login: string
    name: string
    avatar_url: string
}

type GamesDataGameUserV1 = {
    score: number
    new_score: number
    user: GamesDataUserV1
}

type GamesDataGameV1 = {
    ts: string
    participants: GamesDataGameUserV1[]
    winner: number
    options: string
    ticks: GamesDataTickV1[]
}

export class Player {
    private readonly container: HTMLElement
    private readonly options: Options
    private readonly ticks: Array<State>
    private readonly participants: GamesDataGameUserV1[]
    private readonly winner: number
    private settings: {
        curTick: number
        play: Function
        pause: Function
    }
    private readonly clock = new THREE.Clock()
    private readonly scene: THREE.Scene
    private readonly camera: THREE.PerspectiveCamera
    private readonly renderer: THREE.WebGLRenderer
    private readonly font: Font
    private pieces: { [key: number]: THREE.Mesh } = {}
    private curUserPointer: THREE.Mesh

    constructor(container: HTMLElement, gameData: GamesDataGameV1) {
        console.log("Hello world")
        this.container = container
        container.style.height = (container.clientWidth / 2).toString().concat('px')

        this.options = Options.decode(Uint8Array.from(window.atob(gameData.options), (v) => v.charCodeAt(0)));

        this.options.entityProperties.forEach((entity, i) => {
            console.log("entity: entityType=", entity.entityType, EntityType[entity.entityType], "maxHealth=", entity.maxHealth, "...")
        })
        console.log("options: mapSize=", this.options.mapSize,)

        this.ticks = gameData.ticks.map(t => {
            return State.decode(Uint8Array.from(window.atob(t.state), (v) => v.charCodeAt(0)))
        })
        this.ticks.forEach((tick, i) => {
            console.log("tick: tick=", i, "tickId=", tick.tick, "entityCount=", tick.entities.length)
        })

        this.participants = gameData.participants
        this.winner = gameData.winner

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.offsetHeight, 1, 1000)
        this.camera.position.set(0, 0, 200)
        this.camera.lookAt(0, 0, 0)

        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(container.clientWidth, container.offsetHeight)
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        container.appendChild(this.renderer.domElement)

        const fontLoader = new FontLoader()
        this.font = fontLoader.parse(fontJson)

        this.initScene()
        this.initGUI()
    }

    private initScene() {

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.4))

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
        directionalLight.position.set(0.75, 0.75, 0).normalize()
        this.scene.add(directionalLight)

        const gridGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-1, 0, 1), new THREE.Vector3(1, 0, 1),
            new THREE.Vector3(-1, 0, 0.33), new THREE.Vector3(1, 0, 0.33),
            new THREE.Vector3(-1, 0, -0.33), new THREE.Vector3(1, 0, -0.33),
            new THREE.Vector3(-1, 0, -1), new THREE.Vector3(1, 0, -1),

            new THREE.Vector3(-1, 0, 1), new THREE.Vector3(-1, 0, -1),
            new THREE.Vector3(-0.5, 0, 1), new THREE.Vector3(-0.5, 0, -1),
            new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, -1),
            new THREE.Vector3(0.5, 0, 1), new THREE.Vector3(0.5, 0, -1),
            new THREE.Vector3(1, 0, 1), new THREE.Vector3(1, 0, -1),
            new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 1),
        ])

        const gridMaterial = new THREE.LineBasicMaterial({color: 0x888888})
        const lines = new THREE.LineSegments(gridGeometry, gridMaterial)
        lines.scale.set(75, 50, 50)
        lines.translateX(-75)
        this.scene.add(lines)

        /*   this.ticks[this.ticks.length - 1].field.forEach((cell, i) => {
               const piece = this.newPiece()
               piece.position.set(-131.5 + (i % 4) * 37.5, 0, -33.5 + Math.floor(i / 4) * 33.5)
               this.scene.add(piece)
               this.pieces[i] = piece
           })*/

        this.participants.forEach((p, i) => {
            console.log("participants forEach world=", p, i)
            const t = this.newText(
                p.user.name || p.user.gh_login,
                this.winner > 0 && i + 1 == this.winner
                    ? [
                        new THREE.MeshPhongMaterial({color: 0x009900, flatShading: true}), // front
                        new THREE.MeshPhongMaterial({color: 0x008800}) // side
                    ]
                    : this.winner > 0 && i + 1 != this.winner
                        ? [
                            new THREE.MeshPhongMaterial({color: 0xBB0000, flatShading: true}), // front
                            new THREE.MeshPhongMaterial({color: 0x880000}) // side
                        ]
                        : this.lettersMaterial
            )
            t.geometry.computeBoundingBox()
            t.rotateX(-Math.PI / 2)
            t.position.set(30, 0, i ? 20 : -20)
            this.scene.add(t)
        })

        const sphereGeometry = new THREE.SphereGeometry(6, 32, 32)
        const sphereMaterial = new THREE.MeshPhongMaterial({
            color: 0x0000bb,
            flatShading: true,
            emissive: 0x0000ff,
            emissiveIntensity: 5,
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.setX(23)
        sphere.visible = false
        this.curUserPointer = sphere
        this.scene.add(sphere)

        this.scene.rotateX(Math.PI / 2)

        this.animate()
    }

    private initGUI() {
        let curTickCtrl: Controller
        let playBtn: Controller
        let pauseBtn: Controller

        this.settings = {
            curTick: 0,
            play: () => {
                playBtn.hide()
                pauseBtn.show()

                if (this.settings.curTick == this.ticks.length - 1)
                    curTickCtrl.setValue(0)

                const play = () => {
                    if (pauseBtn._hidden)
                        return

                    if (this.settings.curTick < this.ticks.length - 1) {
                        this.settings.curTick++
                        curTickCtrl.setValue(this.settings.curTick)
                    } else {
                        pauseBtn.hide()
                        playBtn.show()
                    }

                    window.setTimeout(play, 1000)
                }
                play()
            },
            pause() {
                pauseBtn.hide()
                playBtn.show()
            }
        }

        const panel = new GUI({
            title: 'Semaphore',
            container: this.container,
            width: this.container.clientWidth,
            autoPlace: true
        })
        curTickCtrl = panel.add(this.settings, 'curTick', 0, this.ticks.length - 1, 1)
            .name('Current tick')
            .listen()
            .onChange(() => {
                /*
                                this.ticks[this.settings.curTick].field.forEach((cell, i) => {
                                    const piece = this.pieces[i]
                                    if (!piece)
                                        return

                                    switch (cell) {
                                        case botCraft.Cell.Empty:
                                            piece.visible = false
                                            break
                                        case botCraft.Cell.Green:
                                            piece.visible = true
                                            piece.material = this.piecesMaterials.Green
                                            break
                                        case botCraft.Cell.Yellow:
                                            piece.visible = true
                                            piece.material = this.piecesMaterials.Yellow
                                            break
                                        case botCraft.Cell.Red:
                                            piece.visible = true
                                            piece.material = this.piecesMaterials.Red
                                            break
                                    }
                                })
                */

                if (this.settings.curTick == 0) {
                    this.curUserPointer.visible = false
                } else {
                    this.curUserPointer.visible = true
                    /*
                                        this.curUserPointer.position.z = this.ticks[this.settings.curTick-1].curUser == 0
                                            ? -26
                                            : 15
                    */
                }
            }).setValue(0)

        playBtn = panel.add(this.settings, 'play')
            .name('Play')

        pauseBtn = panel.add(this.settings, 'pause')
            .name('Pause')
            .hide()

        window.addEventListener('resize', () => {
            this.container.style.height = (this.container.clientWidth / 2).toString().concat('px')
            this.camera.aspect = this.container.clientWidth / this.container.offsetHeight
            this.camera.updateProjectionMatrix()

            this.renderer.setSize(this.container.clientWidth, this.container.offsetHeight)
        })
    }

    private animate() {
        requestAnimationFrame(() => {
            this.animate()
        })

        const delta = this.clock.getDelta()

        this.renderer.render(this.scene, this.camera)
    }

    private lettersMaterial = [
        new THREE.MeshPhongMaterial({color: 0x555555, flatShading: true}), // front
        new THREE.MeshPhongMaterial({color: 0x888888}) // side
    ]

    private newText(text: string, material: Array<THREE.MeshPhongMaterial> = this.lettersMaterial) {
        return new THREE.Mesh(
            new TextGeometry(text, {
                font: this.font,
                size: 11,
                height: 4,
                curveSegments: 40,
                bevelThickness: 0.5,
                bevelSize: 0.1,
                bevelEnabled: true
            }),
            material
        )
    }

    private piecesMaterials = {
        Green: new THREE.MeshPhongMaterial({color: 0x00ff00, flatShading: true}),
        Yellow: new THREE.MeshPhongMaterial({color: 0xffff00, flatShading: true}),
        Red: new THREE.MeshPhongMaterial({color: 0xff0000, flatShading: true}),
    }

    private newPiece(): THREE.Mesh {
        const shape = new THREE.Shape()
        shape.moveTo(0, 1)
        shape.quadraticCurveTo(1, 1, 1, 0)
        shape.quadraticCurveTo(1, -1, 0, -1)
        shape.quadraticCurveTo(-1, -1, -1, 0)
        shape.quadraticCurveTo(-1, 1, 0, 1)

        const geometry = new THREE.ExtrudeGeometry(shape, {depth: 0.2, bevelEnabled: false})

        const piece = new THREE.Mesh(geometry, this.piecesMaterials.Green)
        piece.rotateX(Math.PI / 2)
        piece.scale.setScalar(15)
        piece.visible = false

        return piece
    }
}