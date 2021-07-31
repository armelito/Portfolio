// Ogl
import { Transform, Mesh, Texture, Program, Vec2, Flowmap, Triangle, Plane } from 'ogl'
// Shaders
import fragment from 'shaders/background-fragment.glsl'
import vertex from 'shaders/background-vertex.glsl'

//import fragment from 'shaders/plane-fragment.glsl'
//import vertex from 'shaders/plane-vertex.glsl'
// class
export default class Background
{
  constructor ({ gl, scene, values })
  {
    // Webgl variables
    this.gl = gl
    this.scene = scene
    this.group = new Transform()
    // Values
    this.aspect = values.aspect
    this.sizes = values.sizes
    this.renderer = values.renderer
    // Flowmap
    this.flowmap = new Flowmap(this.gl, { size: 5, falloff: 0.5, alpha: 0.75, dissipation: 0.9 })
    // Functions
    this.params = this.initParams()
    this.createGeometry()
    this.createTexture()
    this.createProgram()
    this.createMesh()
    // Add group to the scene
    this.group.setParent(scene)
  }

  initParams ()
  {
    // Init params object
    const params = {}
    // Variable inputs to control flowmap
    params.aspect = 1
    params.mouse = new Vec2(-1)
    params.velocity = new Vec2()
    params.resolution = new Vec2()
    params.lastTime
    params.lastMouse = new Vec2()
    // Return params object
    return params
  }

  createGeometry ()
  {
    this.geometry = new Triangle(this.gl)
  }

  createTexture ()
  {
    // Create a texture
    this.texture = new Texture(this.gl, { wrapS: this.gl.REPEAT, wrapT: this.gl.REPEAT })
    // Load the image background as the texutre
    this.image = new window.Image()
    this.image.crossOrigin = "anonymous"
    this.image.src = 'dots-texture2.svg'
    this.image.onload = _ => (this.texture.image = this.image)
  }

  createProgram ()
  {
    this.program = new Program(this.gl,
    {
      vertex,
      fragment,
      uniforms:
      {
        //tMap: { value: this.texture }
        uTime: { value: 0 },
        tWater: { value: this.texture },
        u_resolution: { value: this.params.resolution },
          // Note that the uniform is applied without using an object and value property
          // This is because the class alternates this texture between two render targets
          // and updates the value property after each render.
        tFlow: this.flowmap.uniform,
      },
    })
  }

  createMesh ()
  {
    this.mesh = new Mesh(this.gl,
    {
      geometry: this.geometry,
      program: this.program
    })

    this.mesh.setParent(this.scene)
  }

  onResize()
  {
    // Set the uniform resolution to the canvas sizes
    this.program.uniforms.u_resolution.value.x = this.renderer.width
    this.program.uniforms.u_resolution.value.y = this.renderer.height
  }

  onTouchStart (_event)
  {
    this.updateMouse(_event)
  }

  onTouchMove (_event)
  {
    this.updateMouse(_event)
  }

  onMouseMove (_event)
  {
    this.updateMouse(_event)
  }

  updateMouse (_event)
  {
    if (_event.changedTouches && _event.changedTouches.length)
    {
      _event.x = _event.changedTouches[0].pageX
      _event.y = _event.changedTouches[0].pageY
    }

    if (_event.x === undefined)
    {
      _event.x = _event.pageX
      _event.y = _event.pageY
    }
    // Get mouse value in 0 to 1 range, with y flipped
    this.params.mouse.set(_event.x / this.gl.renderer.width, 1.0 - _event.y / this.gl.renderer.height)
    // Calculate velocity
    if (!this.params.lastTime)
    {
      // First frame
      this.params.lastTime = performance.now()
      this.params.lastMouse.set(_event.x, _event.y)
    }

    const deltaX = _event.x - this.params.lastMouse.x
    const deltaY = _event.y - this.params.lastMouse.y

    this.params.lastMouse.set(_event.x, _event.y)

    let time = performance.now()
    // Avoid dividing by 0
    let delta = Math.max(14, time - this.params.lastTime)
    this.params.lastTime = time

    this.params.velocity.x = deltaX / delta
    this.params.velocity.y = deltaY / delta
    // Flag update to prevent hanging velocity values when not moving
    this.params.velocity.needsUpdate = true
  }

  update (t)
  {
    // Reset velocity when mouse not moving
    if (!this.params.velocity.needsUpdate)
    {
      this.params.mouse.set(-1)
      this.params.velocity.set(0)
    }

   this.params.velocity.needsUpdate = false

    // Update flowmap inputs
    this.flowmap.aspect = this.aspect
    this.flowmap.mouse.copy(this.params.mouse)

    // Ease velocity input, slower when fading out
    this.flowmap.velocity.lerp(this.params.velocity, this.params.velocity.len ? 0.5 : 0.1)

    this.flowmap.update()

    this.program.uniforms.uTime.value = t * 0.001
  }
}
