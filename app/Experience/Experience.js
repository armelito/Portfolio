import * as THREE from 'three'
import Time from './Utils/Time'
import Sizes from './Utils/Sizes'
import Stats from './Utils/Stats'

import Resources from './Resources'
import Renderer from './Renderer'
import Camera from './Camera'
import World from './World'

import assets from './assets.js'

export default class Experience
{
  constructor(_options = {})
  {
    window.experience = this
    this.targetElement = _options.targetElement
    this.template = _options.template

    if(!this.targetElement)
    {
      console.warn('Missing \'targetElement\' property')
      return
    }

    this.time = new Time()
    this.sizes = new Sizes()
    this.setConfig()
    this.setStats()
    this.setScene()
    this.setCamera()
    this.setRenderer()
    this.setResources()
    this.setWorld()
  }

  setConfig()
  {
    this.config = {}
    this.config.debug = window.location.hash === '#debug'
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)
    //console.log(window.innerWidth, window.innerHeight)
    const boundings = this.targetElement.getBoundingClientRect()
    this.config.width = boundings.width
    this.config.height = boundings.height
  }

  setStats()
  {
    if(this.config.debug) this.stats = new Stats(true)
  }

  setScene()
  {
    this.scene = new THREE.Scene()
  }

  setCamera()
  {
    this.camera = new Camera()
  }

  setRenderer()
  {
    this.renderer = new Renderer({ rendererInstance: this.rendererInstance })
    this.targetElement.appendChild(this.renderer.instance.domElement)
  }

  setResources()
  {
    this.resources = new Resources(assets)
  }

  setWorld()
  {
    this.world = new World()
  }

  update()
  {
    if(this.stats) this.stats.update()
    if(this.camera) this.camera.update()
    if(this.world) this.world.update()
    if(this.renderer) this.renderer.update()
  }
  /*
  *   LISTENERS
  *
  */
  onChangeStart(_template)
  {
    if(this.world) this.world.onChangeStart(_template)
  }

  onChangeEnd(_template)
  {
    if(this.world) this.world.onChangeEnd(_template)
  }

  onResize()
  {
    const boundings = this.targetElement.getBoundingClientRect()
    this.config.width = boundings.width
    this.config.height = boundings.height
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

    if(this.camera) this.camera.resize()
    if(this.renderer) this.renderer.resize()
    if(this.world) this.world.resize()
  }

  destroy()
  {

  }
}
