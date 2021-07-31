import * as THREE from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

export default class Renderer
{
  constructor(_options = {})
  {
    this.experience = window.experience
    this.config = this.experience.config
    this.debug = this.experience.debug
    this.stats = this.experience.stats
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera

    this.usePostprocess = false

    this.setInstance()
    this.setPostProcess()
  }

  setInstance ()
  {
    this.clearColor = '#010101'

    // Renderer
    this.instance = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true
    })

    //this.instance.domElement.style.position = 'absolute'
    //this.instance.domElement.style.top = 0
    //this.instance.domElement.style.left = 0
    this.instance.domElement.style.width = '100%'
    this.instance.domElement.style.height = '100%'

    this.instance.setClearColor(this.clearColor, 1)
    this.instance.setSize(this.config.width, this.config.height)
    this.instance.setPixelRatio(this.config.pixelRatio)

    this.context = this.instance.getContext()
  }

  setPostProcess ()
    {
    this.postProcess = {}
    /**
     * Render pass
     */
    this.postProcess.renderPass = new RenderPass(this.scene, this.camera.instance)
    /**
     * Effect composer
     */
    const RenderTargetClass = this.config.pixelRatio >= 2 ? THREE.WebGLRenderTarget : THREE.WebGLMultisampleRenderTarget
    // const RenderTargetClass = THREE.WebGLRenderTarget
    this.renderTarget = new RenderTargetClass(
      this.config.width,
      this.config.height,
      {
        generateMipmaps: false,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat,
        encoding: THREE.sRGBEncoding
      }
    )

    this.postProcess.composer = new EffectComposer(this.instance, this.renderTarget)
    this.postProcess.composer.setSize(this.config.width, this.config.height)
    this.postProcess.composer.setPixelRatio(this.config.pixelRatio)
    this.postProcess.composer.addPass(this.postProcess.renderPass)
  }

  onResize ()
  {
    // Instance
    this.instance.setSize(this.config.width, this.config.height)
    this.instance.setPixelRatio(this.config.pixelRatio)
    // Post process
    this.postProcess.composer.setSize(this.config.width, this.config.height)
    this.postProcess.composer.setPixelRatio(this.config.pixelRatio)
  }

  update ()
  {
    if(this.usePostprocess)
    {
      this.postProcess.composer.render()
    }
    else
    {
      this.instance.render(this.scene, this.camera.instance)
    }
  }

  destroy ()
  {
    this.instance.renderLists.dispose()
    this.instance.dispose()
    this.renderTarget.dispose()
    this.postProcess.composer.renderTarget1.dispose()
    this.postProcess.composer.renderTarget2.dispose()
  }
}
