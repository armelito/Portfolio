import * as THREE from 'three'

import PolygonTransition from './World/PolygonTransition'
import Floor from './World/Floor.js'

export default class World
{
  constructor(_options)
  {
    this.experience = window.experience
    this.config = this.experience.config
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.time = this.experience.time
    this.renderer = this.experience.renderer

    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false

    //this.setLoader()

    this.resources.on('groupEnd', (_group) =>
    {
      if(_group.name === 'base')
      {
        this.setReveal()
        this.setShadows()
        this.setMaterials()
        this.setShadows()
        this.setPhysics()
        this.setWalls()
        //this.setFloor()
        this.setTiles()
        this.setPolygonTransition()
      }
    })
  }

  setUp()
  {

  }

  setLoader()
  {
    this.loader = {}
  }

  setReveal()
  {
    this.reveal = {}
    this.reveal.matcapsProgress = 0
    this.reveal.floorShadowsProgress = 0
    this.reveal.previousMatcapsProgress = null
    this.reveal.previousFloorShadowsProgress = null

    this.reveal.go = () =>
    {
      console.log('reveal code')
    }
  }

  setFloor()
  {
    this.floor = new Floor()
    this.scene.add(this.floor.container)
  }

  setShadows()
  {

  }

  setMaterials()
  {

  }

  setShadows()
  {

  }

  setPhysics()
  {

  }

  setWalls()
  {

  }

  setTiles()
  {

  }

  setPolygonTransition()
  {
    console.log('set')

    this.polygonTransition = new PolygonTransition({
      detail: 10,
      duration: 2,
      offsettop: 0.,
      ease: "power2.in",
      progress: 0
    })
  }
  /*
  *   LISTENERS
  *
  */
  onChangeStart(_template)
  {
    if(this.polygonTransition && this.polygonTransition.onChangeStart)
      this.polygonTransition.onChangeStart(_template)
  }

  onChangeEnd(_template)
  {
    if(this.polygonTransition && this.polygonTransition.onChangeEnd)
      this.polygonTransition.onChangeEnd(_template)
  }

  resize()
  {
    if(this.polygonTransition && this.polygonTransition.resize)
      this.polygonTransition.resize()
  }

  update()
  {
    if(this.polygonTransition && this.polygonTransition.update)
      this.polygonTransition.update()
  }

  destroy()
  {

  }
}
