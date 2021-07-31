import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
  constructor(_options)
  {
    this.experience = window.experience
    this.config = this.experience.config
    this.debug = this.experience.debug
    this.time = this.experience.time
    this.sizes = this.experience.sizes
    this.targetElement = this.experience.targetElement
    this.scene = this.experience.scene

    this.mode = 'debug' // defaultCamera \ debugCamera

    this.setInstance()
    this.setModes()
  }
  setInstance()
  {
    this.instance = new THREE.PerspectiveCamera(70, this.config.width / this.config.height, 0.001, 1000)
    this.instance.rotation.reorder('YXZ')

    this.scene.add(this.instance)
  }
  setModes()
  {
    this.modes = {}

    this.modes.default = {}
    this.modes.default.instance = this.instance.clone()
    this.modes.default.instance.rotation.reorder('YXZ')

    this.modes.debug = {}
    this.modes.debug.instance = this.instance.clone()
    this.modes.debug.instance.rotation.reorder('YXZ')
    this.modes.debug.instance.position.set(0, 0, 2)

    this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement)
    this.modes.debug.orbitControls.enabled = this.modes.debug.active
    this.modes.debug.orbitControls.screenSpacePanning = true
    this.modes.debug.orbitControls.enableKeys = false
    this.modes.debug.orbitControls.zoomSpeed = 0.25
    this.modes.debug.orbitControls.enableDamping = true
    this.modes.debug.orbitControls.update()
  }

  resize()
  {
    this.instance.aspect = this.config.width / this.config.height
    this.instance.fov = 2 * ( 180 / Math.PI ) * Math.atan( 2 / ( 2 * this.instance.position.z * 1))
    this.instance.updateProjectionMatrix()

    this.modes.default.instance.aspect = this.config.width / this.config.height
    this.modes.default.instance.fov = 2 * ( 180 / Math.PI ) * Math.atan( 2 / ( 2 * this.instance.position.z * 1))
    this.modes.default.instance.updateProjectionMatrix()

    this.modes.debug.instance.aspect = this.config.width / this.config.height
    this.modes.debug.instance.fov = 2 * ( 180 / Math.PI ) * Math.atan( 2 / ( 2 * this.instance.position.z * 1))
    this.modes.debug.instance.updateProjectionMatrix()
  }

  update()
  {
    this.modes.debug.orbitControls.update()

    this.instance.position.copy(this.modes[this.mode].instance.position)
    this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)
    this.instance.updateMatrixWorld() // To be used in projection
  }

  destroy()
  {
    this.modes.debug.orbitControls.destroy()
  }
}
