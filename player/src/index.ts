import * as THREE from 'three'
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MOUSE } from 'three'
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

interface StringMap {
    [key: string]: number
}
interface NumberMap {
    [key: number]: number
}

// TODO: change colors
const attackColor = 0xff0000
const repairColor = 0x00ff00
const buildColor = 0x0000ff

// const initActions: {
//     attacks: Array<botCraft.AppliedAttack>,
//     repairs: Array<botCraft.AppliedRepair>,
//     builds: Array<botCraft.AppliedBuild>,
// } = {
//     attacks: [],
//     repairs: [],
//     builds: [],
// }

const gridColor = 0xffffff
const gridLineWidth = 1
const geometryOffset = 0.2
const IDToUnitColor: StringMap = {
    "0": 0x0000ff,
    "1": 0xff0000,
    "-1": 0x00ff00,
}
const speedMap: NumberMap = {
    1: 200,
    2: 100,
    3: 50,
    4: 25,
}

const maxSpeed = 4
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
        speed: Function
        curSpeed: number
        curTimeout: number
    }
    private readonly clock = new THREE.Clock()
    private readonly scene: THREE.Scene
    private readonly camera: THREE.PerspectiveCamera
    private readonly renderer: THREE.WebGLRenderer
    private readonly controls: OrbitControls
    private readonly font: Font
    private pieces: { [key: number]: THREE.Mesh } = {}
    private curUserPointer: THREE.Mesh
    // private tickObjects = {};
    private tickObjects: { [key: string]: THREE.Object3D} = {};
    private tickActions: {
        [key: string]: { [key: string]: THREE.Line},
        "attacks": { [key: string]: THREE.Line},
        "repairs":{ [key: string]: THREE.Line},
        "builds": { [key: string]: THREE.Line},
    } = {
        "attacks": {},
        "repairs": {},
        "builds": {},
    }

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

        // console.log("---ticks---", this.ticks)

        // this.ticks.forEach((tick, i) => {
        //     console.log("tick: tick=", i, "tickId=", tick.tick, "entityCount=", tick.entities.length)
        // })

        this.participants = gameData.participants
        this.winner = gameData.winner

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.offsetHeight, 1, 1000)

        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(container.clientWidth, container.offsetHeight)
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        container.appendChild(this.renderer.domElement)

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.enableDamping = false
        this.controls.target.set(mapSize/2, mapSize/2, 0)
        this.controls.maxDistance = 40
        this.controls.minDistance = 5
        this.controls.mouseButtons = { LEFT: MOUSE.PAN, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };

        this.camera.position.set(mapSize/2 , mapSize/2, 30)
        this.controls.update()

        const fontLoader = new FontLoader()
        this.font = fontLoader.parse(fontJson)

        this.initScene()
        this.initGUI()
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
        let speedBtn: Controller

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

                    window.setTimeout(play, this.settings.curTimeout)
                }
                play()
            },
            pause() {
                pauseBtn.hide()
                playBtn.show()
            },
            curSpeed: 1,
            curTimeout: 200,
            speed: () => {
                this.settings.curSpeed++
                if (this.settings.curSpeed > maxSpeed) {
                    this.settings.curSpeed = 1
                }
                this.settings.curTimeout = speedMap[this.settings.curSpeed]
                speedBtn.name(`Change speed: ${this.settings.curSpeed}`)
            },
        }

        const panel = new GUI({
            title: 'BotCraft',
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
                this.generateObjects(curState, nextState)

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

        speedBtn = panel.add(this.settings, 'speed')
            .name(`Change speed: ${this.settings.curSpeed}`)

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

        this.updateCamera()
        this.renderer.render(this.scene, this.camera)
    }

    private lettersMaterial = [
        new THREE.MeshPhongMaterial({color: 0x555555, flatShading: true}), // front
        new THREE.MeshPhongMaterial({color: 0x888888}) // side
    ]

    private updateCamera() {
        const cur_x = this.controls.target.x
        const cur_y = this.controls.target.y
        const mapSize = this.options.mapSize
        if (cur_x > mapSize || cur_x < 0) {
            this.controls.target.x = this.controls.target.x > 0 ? mapSize : 0
            this.camera.position.x = this.controls.target.x > 0 ? mapSize : 0
        }
        if (cur_y > mapSize || cur_y < 0) {
            this.controls.target.y = this.controls.target.y > 0 ? mapSize : 0
            this.camera.position.y = this.controls.target.y > 0 ? mapSize : 0
        }

        this.controls.update()
    }

    private createHelperText(text: string, size: number) {
        return new THREE.Mesh(
            new TextGeometry(text, {
                font: this.font,
                size: size,
                height: 0,
            }),
        )
    }

    private findCoords(init_x: number, init_y: number, entityType: botCraft.EntityType) {
        let unitSize = 0
        this.options.entityProperties.forEach((properties) => {
            if (properties.entityType === entityType) {
                unitSize = properties.size
                return
            }
        })
        const mapSize = this.options.mapSize
        const x = init_x + unitSize / 2
        const y = mapSize - (init_y + unitSize / 2)
        return {x, y}
    }
    

    private getSizeFor(entityType: botCraft.EntityType) {
        // TODO: strange for buildings (big=>small=>big)
        let result = 0;
        this.options.entityProperties.forEach((properties) => {
            if (properties.entityType === entityType) {
                result = properties.size;
                return;
            }
        });
        
        return result; // TODO rise error?
    }

    private getScale(entityType: botCraft.EntityType, currentHealth: number) {
        let maxHealth = currentHealth
        this.options.entityProperties.forEach((properties) => {
            if (properties.entityType === entityType) {
                maxHealth = properties.maxHealth;
                return;
            }
        });
        return Number((currentHealth / maxHealth).toFixed(3));
    }

    private setOpacity(object: THREE.Object3D, isActive: boolean) {
        const opacity = isActive ? 1 : 0.5

        object.children.forEach((child: THREE.Mesh) => {
            if (child.material as THREE.Material) {
                const material: THREE.Material = child.material as THREE.Material
                material.opacity = opacity
            }
        })
    }

    private renderAction(firstUnit: THREE.Object3D, secondUnit: THREE.Object3D, color: number, type: string) {
        const material = new THREE.LineBasicMaterial({
            color: color
        });
        const points = []
        points.push( new THREE.Vector3( firstUnit.position.x, firstUnit.position.y, 0 ) );
        points.push( new THREE.Vector3( secondUnit.position.x, secondUnit.position.y, 0 ) );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const action = new THREE.Line( geometry, material );
        action.userData = {initiatorId: firstUnit.userData.id, targetId: secondUnit.userData.id}
        this.tickActions[type][action.userData.initiatorId] = action
        this.scene.add(action);
    }

    private generateObjects(state: State, nextState: State) {

        const texture = new THREE.TextureLoader().load(image);
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        const textureMaterial = new THREE.MeshBasicMaterial({map: texture, transparent: true});

        Object.keys(this.tickObjects).forEach(key => {
            if (!state.entities.some(entity => String(entity.id) === key)) {
                const object = this.tickObjects[key]
                delete this.tickObjects[key]
                this.scene.remove(object)
            }
        })

        // console.log("--STATE--", state)
        state.entities.forEach((entity) => {
            let object = this.tickObjects[entity.id]

            if (object) {
                this.updateObject(object, entity)
            } else {
                object = this.createObject(entity, textureMaterial)

                // const edges = new THREE.EdgesGeometry( plane.geometry ); 
                // const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 

                // lines.position.x = coords.y
                // lines.position.y = coords.x
                // this.scene.add(lines)
            }

         })

        if (!(nextState == null)) {
            // TODO: discuss nextState and state
            this.renderAttacks(nextState)
            this.renderRepairs(nextState)
            this.renderBuilds(state)
        }
    }

    private piecesMaterials = {
        Green: new THREE.MeshPhongMaterial({color: 0x00ff00, flatShading: true}),
        Yellow: new THREE.MeshPhongMaterial({color: 0xffff00, flatShading: true}),
        Red: new THREE.MeshPhongMaterial({color: 0xff0000, flatShading: true}),
    }

    private renderAttacks(state: botCraft.State) {
        for (let key of Object.keys(this.tickActions.attacks)) {
            if (!(state.appliedAttacks.some(appliedAttack => String(appliedAttack.attackerId) === key))) {
                const attack = this.tickActions.attacks[key]
                delete this.tickActions.attacks[key]
                this.scene.remove(attack)
            }
        }

        for (let appliedAttack of state.appliedAttacks) {
            let action = this.tickActions.attacks[appliedAttack.attackerId]
            if (action) {
                const targetId = action.userData.targetId
                if (targetId === appliedAttack.targetId) {
                    continue
                }
                if (!(targetId === appliedAttack.targetId)) {
                    delete this.tickActions.attacks[appliedAttack.attackerId]
                    this.scene.remove(action)
                }
            }
            const attacker = this.tickObjects[appliedAttack.attackerId]
            const target = this.tickObjects[appliedAttack.targetId]
            this.renderAction(attacker, target, attackColor, "attacks")
        }
    }

    private renderRepairs(state: botCraft.State) {
        for (let key of Object.keys(this.tickActions.repairs)) {
            if (!(state.appliedRepairs.some(item => String(item.repairerId) === key))) {
                const repair = this.tickActions.repairs[key]
                delete this.tickActions.repairs[key]
                this.scene.remove(repair)
            }
        }

        for (let appliedRepair of state.appliedRepairs) {
            let action = this.tickActions.repairs[appliedRepair.repairerId]
            if (action) {
                const targetId = action.userData.targetId
                if (targetId === appliedRepair.targetId) {
                    continue
                }
                if (!(targetId === appliedRepair.targetId)) {
                    delete this.tickActions.repairs[appliedRepair.repairerId]
                    this.scene.remove(action)
                }
            }
            const repairer = this.tickObjects[appliedRepair.repairerId]
            const target = this.tickObjects[appliedRepair.targetId]
            this.renderAction(repairer, target, repairColor, "repairs")
        }
    }

    private renderBuilds(state: botCraft.State) {
        for (let key of Object.keys(this.tickActions.builds)) {
            if (!(state.appliedBuilds.some(item => String(item.builderId) === key))) {
                const build = this.tickActions.builds[key]
                delete this.tickActions.builds[key]
                this.scene.remove(build)
            }
        }

        for (let appliedBuild of state.appliedBuilds) {
            let action = this.tickActions.builds[appliedBuild.builderId]
            if (action) {
                const targetId = action.userData.targetId
                if (targetId === appliedBuild.targetId) {
                    continue
                }
                if (!(targetId === appliedBuild.targetId)) {
                    delete this.tickActions.builds[appliedBuild.builderId]
                    this.scene.remove(action)
                }
            }
            const builder = this.tickObjects[appliedBuild.builderId]
            const target = this.tickObjects[appliedBuild.targetId]
            this.renderAction(builder, target, buildColor, "builds")
        }
    }

    private createObject(entity: botCraft.IEntity, textureMaterial: THREE.MeshBasicMaterial) {
        const unitSize: number = this.getSizeFor(entity.entityType)

        const playerId: number = entity.playerId
        const unitColor = IDToUnitColor[playerId]

        const geometry = new THREE.PlaneGeometry(
            unitSize - geometryOffset,
            unitSize - geometryOffset
        )

        const colorMaterial = new THREE.MeshBasicMaterial({ color: unitColor })

        const icon = new THREE.Mesh(geometry, textureMaterial)
        const plane = new THREE.Mesh(geometry, colorMaterial)

        const coords = this.findCoords(
            entity.position.x || 0, entity.position.y || 0, entity.entityType
        )
        
        const object = new THREE.Object3D()

        object.userData = entity
        object.add(plane)
        object.add(icon)

        object.position.x = coords.x
        object.position.y = coords.y

        this.setOpacity(object, entity.active)

        this.scene.add(object)
        this.tickObjects[object.userData.id] = object
        return object
    }

    private updateObject(object: THREE.Object3D, entity: botCraft.IEntity) {
        object.userData = entity

        const scale = this.getScale(object.userData.entityType, object.userData.health)
        object.scale.x = scale
        object.scale.y = scale

        const coords = this.findCoords(
            entity.position.x || 0, entity.position.y || 0, entity.entityType
        )
        object.position.x = coords.x
        object.position.y = coords.y

        this.setOpacity(object, entity.active)
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
