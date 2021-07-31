import * as THREE from 'three'
import { TweenLite, Back } from 'gsap'

import EventEmitter from '../Utils/EventEmitter.js'

export default class Area extends EventEmitter
{
  constructor(_options)
  {
    super()
    // Options
    this.experience = window.experience
    this.config = this.experience.config
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.renderer = this.experience.renderer
    this.time = this.experience.time
    this.sizes = this.experience.sizes
    this.targetElement = this.experience.targetElement
    //this.sounds = _options.sounds
    this.position = _options.position
    this.halfExtents = _options.halfExtents
    this.hasKey = _options.hasKey
    this.active = _options.active
    // Set up
    this.container = new THREE.Object3D()
    this.container.position.x = this.position.x
    this.container.position.y = this.position.y
    this.container.matrixAutoUpdate = false
    this.container.updateMatrix()

    this.isIn = false

    this.setInteractions()

    if(this.hasKey)
      this.setKey()
  }

  activate()
  {
    this.active = true

    if(this.isIn)
      this.in()
  }

  deactivate()
  {
    this.active = false

    if(this.isIn)
      this.out()
  }

  setKey()
  {
    this.key = {}
    this.key.hiddenZ = 1.5
    this.key.shownZ = 2.5

    // Container
    this.key.container = new THREE.Object3D()
    this.key.container.position.z = this.key.hiddenZ
    this.container.add(this.key.container)

    // Enter
    this.key.enter = {}
    this.key.enter.size = 1.4
    this.key.enter.geometry = new THREE.PlaneBufferGeometry(this.key.enter.size, this.key.enter.size / 4, 1, 1)
    this.key.enter.texture = this.resources.items.areaEnterTexture
    this.key.enter.texture.magFilter = THREE.NearestFilter
    this.key.enter.texture.minFilter = THREE.LinearFilter
    this.key.enter.material = new THREE.MeshBasicMaterial({ color: 0xffffff, alphaMap: this.key.enter.texture, transparent: true, opacity: 0, depthWrite: false })
    this.key.enter.mesh = new THREE.Mesh(this.key.enter.geometry, this.key.enter.material)
    this.key.enter.mesh.rotation.x = Math.PI * 0.5
    this.key.enter.mesh.position.x = this.key.enter.size * 0.75
    this.key.enter.mesh.matrixAutoUpdate = false
    this.key.enter.mesh.updateMatrix()
    this.key.container.add(this.key.enter.mesh)

    // Icon
    this.key.icon = {}
    this.key.icon.size = 0.75
    this.key.icon.geometry = new THREE.PlaneBufferGeometry(this.key.icon.size, this.key.icon.size, 1, 1)
    this.key.icon.texture = this.resources.items.areaKeyEnterTexture
    this.key.icon.texture.magFilter = THREE.NearestFilter
    this.key.icon.texture.minFilter = THREE.LinearFilter
    this.key.icon.material = new THREE.MeshBasicMaterial({ color: 0xffffff, alphaMap: this.key.icon.texture, transparent: true, opacity: 0, depthWrite: false })
    this.key.icon.mesh = new THREE.Mesh(this.key.icon.geometry, this.key.icon.material)
    this.key.icon.mesh.rotation.x = Math.PI * 0.5
    this.key.icon.mesh.position.x = - this.key.enter.size * 0.15
    this.key.icon.mesh.matrixAutoUpdate = false
    this.key.icon.mesh.updateMatrix()
    this.key.container.add(this.key.icon.mesh)
  }

  interact(_showKey = true)
  {
    // Not active
    if(!this.active)
    {
        return
    }

    if(this.hasKey)
    {
      TweenLite.killTweensOf(this.key.container.position)
      TweenLite.killTweensOf(this.key.icon.material)
      TweenLite.killTweensOf(this.key.enter.material)
    }

    if(this.hasKey && _showKey)
    {
      this.key.container.position.z = this.key.shownZ
      TweenLite.fromTo(this.key.icon.material, 1.5, { opacity: 1 }, { opacity: 0.5 })
      TweenLite.fromTo(this.key.enter.material, 1.5, { opacity: 1 }, { opacity: 0.5 })
    }

    // Play sound
    //this.sounds.play('uiArea')

    this.trigger('interact')
  }

  in(_showKey = true)
  {
    this.isIn = true

    // Not active
    if(!this.active)
      return

    // Key
    if(this.hasKey)
    {
      TweenLite.killTweensOf(this.key.container.position)
      TweenLite.killTweensOf(this.key.icon.material)
      TweenLite.killTweensOf(this.key.enter.material)

      // Animate
      if(_showKey)
      {
        TweenLite.to(this.key.container.position, 0.35, { z: this.key.shownZ, ease: Back.easeOut.config(3), delay: 0.1 })
        TweenLite.to(this.key.icon.material, 0.35, { opacity: 0.5, ease: Back.easeOut.config(3), delay: 0.1 })
        TweenLite.to(this.key.enter.material, 0.35, { opacity: 0.5, ease: Back.easeOut.config(3), delay: 0.1 })
      }
    }

    // Change cursor
    if(!this.config.touch)
    {
      this.renderer.domElement.classList.add('has-cursor-pointer')
    }

    this.trigger('in')
  }

  out()
  {
    this.isIn = false

    // Key
    if(this.hasKey)
    {
      TweenLite.killTweensOf(this.key.container.position)
      TweenLite.killTweensOf(this.key.icon.material)
      TweenLite.killTweensOf(this.key.enter.material)
      TweenLite.to(this.key.container.position, 0.35, { z: this.key.hiddenZ, ease: Back.easeIn.config(4), delay: 0.1 })
      TweenLite.to(this.key.icon.material, 0.35, { opacity: 0, ease: Back.easeIn.config(4), delay: 0.1 })
      TweenLite.to(this.key.enter.material, 0.35, { opacity: 0, ease: Back.easeIn.config(4), delay: 0.1 })
    }

    // Change cursor
    if(!this.config.touch)
    {
      this.renderer.domElement.classList.remove('has-cursor-pointer')
    }

    this.trigger('out')
  }

  setInteractions()
  {
    this.mouseMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(this.halfExtents.x * 2, this.halfExtents.y * 2, 1, 1),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
    )
    this.mouseMesh.position.z = - 0.01
    this.mouseMesh.matrixAutoUpdate = false
    this.mouseMesh.updateMatrix()
    this.container.add(this.mouseMesh)

    this.time.on('tick', () =>
    {

    })

    window.addEventListener('keydown', (_event) =>
    {
      if((_event.key === 'f' || _event.key === 'e' || _event.key === 'Enter') && this.isIn)
      {
        this.interact()
      }
    })
  }
}
