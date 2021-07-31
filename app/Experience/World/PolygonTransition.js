import each from 'lodash/each'

import * as THREE from "three"
import gsap from 'gsap'

import PolygonTransitionGeometry from '../Geometries/PolygonTransition'
import PolygonTransitionMaterial from '../Materials/PolygonTransition'


export default class PolygonTransition {
  constructor(_options)
  {
    this.experience = window.experience
    this.config = this.experience.config
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.resources = this.experience.resources

    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false
    this.scene.add(this.container)

    this.ease = _options.ease || 'none'
    this.duration = _options.duration
    this.settings =
    {
      progress: _options.progress || 0
    }

    this.geometry = PolygonTransitionGeometry(_options.detail, _options.offsettop || 0)

    this.rendering = true
    this.aspect = this.config.height / this.config.width
    this.imageAspect = this.resources.items.lennaTexture.image.naturalHeight / this.resources.items.lennaTexture.image.naturalWidth

    this.addObjects()
    this.resize()
  }

  onChangeStart(_template)
  {
    this.template = _template
  }

  onChangeEnd(_template)
  {
    let nextTemplate = _template

    if(nextTemplate != this.template)

      if(nextTemplate === 'home' && this.template != 'projects')
        this.setTransition(this.resources.items.dotsTexture, this.resources.items.lennaTexture)

      else if(nextTemplate === 'projects' && this.template != 'home')
        this.setTransition(this.resources.items.dotsTexture, this.resources.items.lennaTexture)

      else if(nextTemplate === 'about')
        this.setTransition(this.resources.items.lennaTexture, this.resources.items.dotsTexture)

      else if(nextTemplate === 'project')
        this.setTransition(this.resources.items.lennaTexture, this.resources.items.dotsTexture)

      else
        return

    else
      return
  }

  setTransition(_current, _next)
  {
    if(!this.isRunning)
    {
      this.isRunning = true
      this.rendering = true

      gsap.to(this.settings,
      {
        duration: this.duration,
        progress: 1,
        ease: this.ease,
        onComplete: () =>
        {
          this.settings.progress = 0
          this.material.uniforms.texture1.value = _current
          this.nextMaterial.uniforms.texture1.value = _next
          this.isRunning = false
          this.rendering = false
        }
      })
    }
  }

  resize()
  {
    if(this.aspect < this.imageAspect)
      this.aspectZ = 1,
      this.aspectW = (1 / this.imageAspect) * this.aspect

    else
      this.aspectZ = this.aspect * this.imageAspect,
      this.aspectW = 1

    this.material.uniforms.resolution.value.x = this.config.width
    this.material.uniforms.resolution.value.y = this.config.height
    this.material.uniforms.resolution.value.z = this.aspectZ
    this.material.uniforms.resolution.value.w = this.aspectW
    this.nextMaterial.uniforms.resolution.value.x = this.config.width
    this.nextMaterial.uniforms.resolution.value.y = this.config.height
    this.nextMaterial.uniforms.resolution.value.z = this.aspectZ
    this.nextMaterial.uniforms.resolution.value.w = this.aspectW

    this.mesh.scale.set(this.camera.instance.aspect, 1, 1)
    this.nextMesh.scale.set(this.camera.instance.aspect, 1, 1)
  }

  update()
  {
    if(this.material)
      this.material.uniforms.progress.value = this.settings.progress
  }

  addObjects = () =>
  {
    this.material = new PolygonTransitionMaterial()
    this.nextMaterial = this.material.clone()

    this.material.needsUpdate = true
    console.log(this.material.uniforms.texture1.value, this.nextMaterial.uniforms.texture1.value)

    this.mesh = new THREE.Mesh( this.geometry, this.material )
    this.nextMesh = new THREE.Mesh( this.geometry, this.nextMaterial )

    this.mesh.frustumCulled = false
    this.mesh.matrixAutoUpdate = false

    this.nextMesh.position.z = -0.0001

    this.container.add(this.mesh)
    this.container.add(this.nextMesh)
  }
}
