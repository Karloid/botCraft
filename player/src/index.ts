import * as THREE from 'three'
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry"
import {Controller, GUI} from 'three/examples/jsm/libs/lil-gui.module.min'
import {Font, FontLoader} from "three/examples/jsm/loaders/FontLoader"
import fontJson from './assets/Roboto_Regular.json'
import {botCraft} from "./proto/botCraft"

import image from "./assets/icons/huski.png"
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

interface NumberMap {
    [key: string]: number
}

const gridColor = 0xffffff
const gridLineWidth = 1
const geometryOffset = 0.2
const IDToUnitColor: NumberMap = {
    "0": 0x0000ff,
    "1": 0xff0000,
    "-1": 0x00ff00,
}
// TODO:

// 1. add health decreasing
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
    private tickObjects: any[] = [];

    constructor(container: HTMLElement, gameData: GamesDataGameV1) {
        console.log("---constructor---")
        this.container = container
        container.style.height = (container.clientWidth / 2).toString().concat('px')

        this.options = Options.decode(Uint8Array.from(window.atob(gameData.options), (v) => v.charCodeAt(0)));

        console.log("---options---", this.options)

        this.options.entityProperties.forEach((entity, i) => {
            console.log("entity: entityType=", entity.entityType, EntityType[entity.entityType], "maxHealth=", entity.maxHealth, "...")
        })
        const mapSize = this.options.mapSize
        console.log("options: mapSize=", mapSize,)

        this.ticks = gameData.ticks.map(t => {
            return State.decode(Uint8Array.from(window.atob(t.state), (v) => v.charCodeAt(0)))
        })

        console.log("---ticks---", this.ticks)

        this.ticks.forEach((tick, i) => {
            console.log("tick: tick=", i, "tickId=", tick.tick, "entityCount=", tick.entities.length)
        })

        this.participants = gameData.participants
        this.winner = gameData.winner

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.offsetHeight, 1, 1000)
        this.camera.position.set(mapSize / 2, mapSize / 2, 30)
        this.camera.lookAt(mapSize / 2, mapSize / 2, 0)

        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(container.clientWidth, container.offsetHeight)
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        container.appendChild(this.renderer.domElement)

        const fontLoader = new FontLoader()
        this.font = fontLoader.parse(fontJson)

        this.initScene()
        this.initGUI()
    }

    private getSizeFor(entityType: botCraft.EntityType) {
        let result = 0;
        this.options.entityProperties.forEach((properties, i) => {
                if (properties.entityType === entityType) {
                    result = properties.size
                    return
                }
            }
        )

        return result // TODO rise error?
    }

    private initScene() {
        console.log("---initScene---")
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.4))

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
        directionalLight.position.set(0.75, 0.75, 0).normalize()
        this.scene.add(directionalLight)

        // const gridGeometry = new THREE.BufferGeometry().setFromPoints([
        //     new THREE.Vector3(-1, 0, 1), new THREE.Vector3(1, 0, 1),
        //     new THREE.Vector3(-1, 0, 0.33), new THREE.Vector3(1, 0, 0.33),
        //     new THREE.Vector3(-1, 0, -0.33), new THREE.Vector3(1, 0, -0.33),
        //     new THREE.Vector3(-1, 0, -1), new THREE.Vector3(1, 0, -1),

        //     new THREE.Vector3(-1, 0, 1), new THREE.Vector3(-1, 0, -1),
        //     new THREE.Vector3(-0.5, 0, 1), new THREE.Vector3(-0.5, 0, -1),
        //     new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, -1),
        //     new THREE.Vector3(0.5, 0, 1), new THREE.Vector3(0.5, 0, -1),
        //     new THREE.Vector3(1, 0, 1), new THREE.Vector3(1, 0, -1),
        //     new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 1),
        // ])

        // const gridMaterial = new THREE.LineBasicMaterial({color: 0x888888})
        // const lines = new THREE.LineSegments(gridGeometry, gridMaterial)
        // lines.scale.set(75, 50, 50)
        // lines.translateX(-75)
        // this.scene.add(lines)


        const mapSize = this.options.mapSize

        const startCoordinateText = this.createHelperText("0", 1)
        const endCoordinateXText = this.createHelperText(String(mapSize - 1), 1)
        const endCoordinateYText = this.createHelperText(String(mapSize - 1), 1)
        // const startCoordinateText = this.createHelperText("0", 1)
        startCoordinateText.position.x = -1
        startCoordinateText.position.y = -1
        endCoordinateXText.position.x = mapSize - 1
        endCoordinateXText.position.y = -1
        endCoordinateYText.position.x = -2
        endCoordinateYText.position.y = mapSize - 1

        // gridHelper
        const size = mapSize;
        const divisions = mapSize;
        const material = new THREE.LineBasicMaterial({
            color: gridColor,
            linewidth: gridLineWidth,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin: 'round' //ignored by WebGLRenderer
        });

        const gridHelper = new THREE.GridHelper(size, divisions, 0xffff00);
        gridHelper.material = material; // TODO: uncomment to expose real grid
        gridHelper.rotation.x += Math.PI / 2;
        gridHelper.position.y = mapSize / 2;
        gridHelper.position.x = mapSize / 2;
        this.scene.add(gridHelper);
        this.scene.add(startCoordinateText);
        this.scene.add(endCoordinateXText);
        this.scene.add(endCoordinateYText);

        /*   this.ticks[this.ticks.length - 1].field.forEach((cell, i) => {
               const piece = this.newPiece()
               piece.position.set(-131.5 + (i % 4) * 37.5, 0, -33.5 + Math.floor(i / 4) * 33.5)
               this.scene.add(piece)
               this.pieces[i] = piece
           })*/

        // TODO:
        // this.participants.forEach((p, i) => {
        //     console.log("participants forEach world=", p, i)
        //     const t = this.newText(
        //         p.user.name || p.user.gh_login,
        //         this.winner > 0 && i + 1 == this.winner
        //             ? [
        //                 new THREE.MeshPhongMaterial({color: 0x009900, flatShading: true}), // front
        //                 new THREE.MeshPhongMaterial({color: 0x008800}) // side
        //             ]
        //             : this.winner > 0 && i + 1 != this.winner
        //                 ? [
        //                     new THREE.MeshPhongMaterial({color: 0xBB0000, flatShading: true}), // front
        //                     new THREE.MeshPhongMaterial({color: 0x880000}) // side
        //                 ]
        //                 : this.lettersMaterial
        //     )
        //     t.geometry.computeBoundingBox()
        //     t.rotateX(-Math.PI / 2)
        //     t.position.set(30, 0, i ? 20 : -20)
        //     this.scene.add(t)
        // })

        // TODO: comment below
        /*  const sphereGeometry = new THREE.SphereGeometry(6, 32, 32)
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
  */
        // this.scene.rotateX(Math.PI / 2)

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

        // const coords = {x: 0, y: 0}
        curTickCtrl = panel.add(this.settings, 'curTick', 0, this.ticks.length - 1, 1)
            .name('Current tick')
            .listen()
            .onChange((state: botCraft.State) => {

                // const geometry = new THREE.PlaneGeometry( 1, 1 );
                // const material = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
                // const plane = new THREE.Mesh( geometry, material );
                // plane.position.x = coords.x
                // plane.position.y = coords.y
                // this.scene.add( plane );
                // coords.x += 1
                // coords.y += 1

                const curTick: number = this.settings.curTick
                const curState: State = this.ticks[curTick]
                const nextState: State = curTick + 1 < this.ticks.length ? this.ticks[curTick + 1] : null

                // this.scene.clear()
                this.createUnits(curState, nextState)

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


                /*   if (this.settings.curTick == 0) {
                       this.curUserPointer.visible = false
                   } else {
                       this.curUserPointer.visible = true
                       /!*
                                           this.curUserPointer.position.z = this.ticks[this.settings.curTick-1].curUser == 0
                                               ? -26
                                               : 15
                       *!/
                   }*/
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

        // const delta = this.clock.getDelta()

        this.renderer.render(this.scene, this.camera)
    }

    private lettersMaterial = [
        new THREE.MeshPhongMaterial({color: 0x555555, flatShading: true}), // front
        new THREE.MeshPhongMaterial({color: 0x888888}) // side
    ]

    private createHelperText(text: string, size: number) {
        return new THREE.Mesh(
            new TextGeometry(text, {
                font: this.font,
                size: size,
                height: 0,
            }),
        )
    }

    private findCoords(init_x: number, init_y: number, unitSize: number) {
        const mapSize = this.options.mapSize
        const x = init_x + unitSize / 2
        const y = mapSize - (init_y + unitSize / 2)
        return {x, y}
    }

    private createUnits(state: State, nextState: State) {
        if (!nextState == null) {
            nextState.appliedAttacks   // TODO handle
            nextState.appliedRepairs   // TODO handle
            nextState.appliedBuilds    // TODO handle
        }
        // TODO move Object3D instead
        this.tickObjects.forEach((obj) => {
            this.scene.remove(obj)
        })
        this.tickObjects = []


        const texture = new THREE.TextureLoader().load(image);
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        const textureMaterial = new THREE.MeshBasicMaterial({map: texture, transparent: true});

        state.entities.forEach((entity) => {
            const unitSize: number = this.getSizeFor(entity.entityType)

            entity.active

            const playerId: number = entity.playerId
            const unitColor = IDToUnitColor[playerId]

            const coords = this.findCoords(entity.position.x || 0, entity.position.y || 0, unitSize)
            const geometry = new THREE.PlaneGeometry(unitSize - geometryOffset, unitSize - geometryOffset);

            const colorMaterial = new THREE.MeshBasicMaterial({color: unitColor});

            const icon = new THREE.Mesh(geometry, textureMaterial);
            const plane = new THREE.Mesh(geometry, colorMaterial);

            plane.position.x = coords.x
            plane.position.y = coords.y
            plane.renderOrder = 1
            this.scene.add(plane);

            icon.position.x = coords.x
            icon.position.y = coords.y
            icon.renderOrder = 2
            this.scene.add(icon);

            // const edges = new THREE.EdgesGeometry( plane.geometry ); 
            // const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 

            // lines.position.x = coords.y
            // lines.position.y = coords.x
            // this.scene.add(lines)

            this.tickObjects.push(plane)
            this.tickObjects.push(icon)
        })
    }

    // private newText(text: string, material: Array<THREE.MeshPhongMaterial> = this.lettersMaterial) {
    //     return new THREE.Mesh(
    //         new TextGeometry(text, {
    //             font: this.font,
    //             size: 11,
    //             height: 4,
    //             curveSegments: 40,
    //             bevelThickness: 0.5,
    //             bevelSize: 0.1,
    //             bevelEnabled: true
    //         }),
    //         material
    //     )
    // }

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
