//import { Renderer, Camera, Transform } from "ogl"
import * as THREE from 'three'
// Utils
import Sizes from './Utils/Sizes'
import Stats from './Utils/Stats'
// THREE objects
import Resources from './Resources'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World'
import assets from './assets'
// Modules
import Background from './Modules/Background'
import Cursor from './Modules/Cursor'
// Pages
import Home from './Home/Home'
//import About from "./About/index.js";
//import Collections from "./Collections/index.js";
export default class Canvas
{
  constructor ({ target, template })
  {
    // Variables
    window.experience = this
    this.targetElement = target
    this.template = template
    this.mouse = { x: 0, y: 0 }
    // Verif
    if(!this.targetElement)
    {
      console.warn('Missing \'targetElement\' property')
      return
    }
    // Init functions
    this.sizes = new Sizes()
    this.setConfig()
    this.setStats()
    this.setScene()
    this.setCamera()
    this.setRenderer()
    this.setResources()
    this.setWorld()
    this.setCursor()
    //this.createRenderer()
    //this.createCamera()
    //this.createScene()
    //this.onResize()
    //this.createHome()
    //this.createBackground()
    //this.createCursor()
  }

  setConfig()
  {
    this.config = {}
    // Debug
    this.config.debug = window.location.hash === '#debug'
    // Pixel ratio
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)
    // Width and height
    const boundings = this.targetElement.getBoundingClientRect()
    this.config.width = boundings.width
    this.config.height = boundings.height || window.innerHeight
  }

  setStats()
  {
    if(this.config.debug)
      this.stats = new Stats(true)
  }

  setScene ()
  {
    this.scene = new THREE.Scene()
  }

  setCamera ()
  {
    this.camera = new Camera()
  }


  setRenderer ()
  {
    this.renderer = new Renderer({ rendererInstance: this.rendererInstance })
    this.targetElement.appendChild(this.renderer.instance.domElement)
  }

  setResources ()
  {
    this.resources = new Resources(assets)
  }

  setWorld ()
  {
    this.world = new World()
  }

  setCursor ()
  {
    // Init cursor
    this.cursor = new Cursor()
    this.cursor.create()
  }

  //setBackground ()
  //{
  //  this.background = new Background({ gl: this.gl, scene: this.scene, values: this.values })
  //}


  onResize ()
  {
    // Sizes
    if (this.sizes && this.sizes.onResize)
      this.sizes.onResize()
    // Camera
    if (this.camera && this.camera.onResize)
      this.camera.onResize()
    // Renderer
    if (this.renderer && this.renderer.onResize)
      this.renderer.onResize()
    // World
    if(this.world && this.world.onResize)
      this.world.onResize()
    // Home
    if (this.home && this.home.onResize)
      this.home.onResize(this.sizes)
    // Background
    if (this.background && this.background.onResize)
      this.background.onResize(this.sizes)
  }

  update ()
  {
    // Camera
    if (this.camera && this.camera.update)
      this.camera.update()
    // Renderer
    if (this.renderer && this.renderer.update)
      this.renderer.update()
    // World
    if(this.world && this.world.update)
      this.world.update()
    // Init update function if page is updated
    if (this.cursor && this.cursor.update)
      this.cursor.update()
    // Background
    if (this.background && this.background.update)
      this.background.update()
  }

  onTouchStart (_event)
  {
    if (this.background && this.background.onTouchStart)
      this.background.onTouchStart(_event)
  }

  onTouchMove (_event)
  {
    if (this.background && this.background.onTouchMove)
      this.background.onTouchMove(_event)
  }

  onMouseDown (_event)
  {
    if (this.cursor && this.cursor.onMouseDown)
      this.cursor.onMouseDown(_event)
  }

  onMouseMove (_event)
  {
    // Coordonnées
    this.mouse.x = _event.clientX
    this.mouse.y = _event.clientY
    // If cursor + function
    if (this.cursor && this.cursor.onMouseMove)
      this.cursor.onMouseMove(this.mouse)
    // Background
    if (this.background && this.background.onTouchMove)
      this.background.onTouchMove(_event)
  }

  onMouseUp (_event)
  {
    if (this.cursor && this.cursor.onMouseUp)
      this.cursor.onMouseUp(_event)
  }

  /*createRenderer ()
  {
    // Renderer object
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
    })
    // Craft Canvas
    this.gl = this.renderer.gl
    document.body.appendChild(this.gl.canvas)
    // Variables
    this.canvas = document.querySelector('canvas')
  }

  createScene ()
  {
    this.scene = new Transform()
  }

  createCamera ()
  {
    this.camera = new Camera(this.gl)
    this.camera.position.z = 5
  }*/



  createHome ()
  {
    //this.home = new Home({ gl: this.gl, scene: this.scene })
  }

  /*onResize()
  {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.aspect = window.innerWidth / window.innerHeight

    this.camera.perspective({ aspect: this.aspect })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.sizes =
    {
      height,
      width,
    }

    this.values =
    {
      sizes: this.sizes,
      aspect: this.aspect,
      renderer: this.renderer
    }

    if (this.home)
    {
      this.home.onResize(this.values)
    }

    if (this.background)
    {
      this.background.onResize(this.values)
    }
  }*/

  /*update ()
  {
    // Init update function if page is updated
    if (this.cursor && this.cursor.update)
    {
      this.cursor.update()
    }

    // Background
    if (this.background && this.background.update)
    {
      this.background.update()
    }

    this.renderer.render({ camera: this.camera, scene: this.scene })
  }*/



  /*onTouchDown(event) {
    this.isDown = true;

    this.x.start = event.touches ? event.touches[0].clientX : event.clientX;
    this.y.start = event.touches ? event.touches[0].clientY : event.clientY;

    const values = {
      x: this.x,
      y: this.y,
    };

    if (this.about) {
      this.about.onTouchDown(values);
    }

    if (this.collections) {
      this.collections.onTouchDown(values);
    }

    // if (this.detail) {
    //   this.detail.onTouchDown(values)
    // }

    if (this.home) {
      this.home.onTouchDown(values);
    }
  }

  onTouchMove(event) {
    if (!this.isDown) return;

    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const y = event.touches ? event.touches[0].clientY : event.clientY;

    this.x.end = x;
    this.y.end = y;

    const values = {
      x: this.x,
      y: this.y,
    };

    if (this.collections) {
      this.collections.onTouchMove(values);
    }

    // if (this.detail) {
    //   this.detail.onTouchMove(values)
    // }

    if (this.home) {
      this.home.onTouchMove(values);
    }
    if (this.about) {
      this.about.onTouchMove(values);
    }
  }

  onTouchUp(event) {
    this.isDown = false;

    const x = event.changedTouches
      ? event.changedTouches[0].clientX
      : event.clientX;
    const y = event.changedTouches
      ? event.changedTouches[0].clientY
      : event.clientY;

    this.x.end = x;
    this.y.end = y;

    const values = {
      x: this.x,
      y: this.y,
    };

    if (this.about) {
      this.about.onTouchUp(values);
    }

    if (this.collections) {
      this.collections.onTouchUp(values);
    }

    // if (this.detail) {
    //   this.detail.onTouchUp(values)
    // }

    if (this.home) {
      this.home.onTouchUp(values);
    }
  }*/

  /*onWheel(_event)
  {
    if (this.projects)
    {
      this.projects.onWheel(_event)
    }

    if (this.home)
    {
      this.home.onWheel(_event)
    }
  }

  createHome()
  {
    this.home = new Home({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes,
    });
  }

  destroyHome() {
    if (!this.home) return;
    this.home.destroy();
    this.home = null;
  }

  createAbout() {
    this.about = new About({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes,
    });
  }

  destroyAbout() {
    if (!this.about) return;
    this.about.destroy();
    this.about = null;
  }

  createCollections() {
    this.collections = new Collections({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes,
    });
  }

  destroyCollections() {
    if (!this.collections) return;
    this.collections.destroy();
    this.collections = null;
  }

  /**
   * Detail.
   */
  // createDetail () {
  //   this.detail = new Detail({
  //     gl: this.gl,
  //     scene: this.scene,
  //     sizes: this.sizes,
  //     transition: this.transition
  //   })
  // }

  // destroyDetail () {
  //   if (!this.detail) return

  //   this.detail.destroy()
  //   this.detail = null
  // }

  /*onPreloaded() {
    this.onChangeEnd(this.template);
  }

  onChangeStart() {
    if (this.home) {
      this.home.hide();
    }
    if (this.about) {
      this.about.hide();
    }
    if (this.collections) {
      this.collections.hide();
    }

    if (this.detail) {
      this.detail.hide();
    }
  }

  onChangeEnd(template) {
    if (template === "home") {
      this.createHome();
    } else if (this.home) {
      this.destroyHome();
    }
    if (template === "about") {
      this.createAbout();
    } else {
      this.destroyAbout();
    }

    if (template === "collections") {
      this.createCollections();
    } else {
      this.destroyCollections();
    }

    // if (template === "detail") {
    //   this.createDetail();
    // } else {
    //   this.destroyDetail();
    // }
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight,
    });

    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.sizes = {
      height,
      width,
    };

    const values = {
      sizes: this.sizes,
    };
    if (this.about) {
      this.about.onResize(values);
    }
    if (this.collections) {
      this.collections.onResize(values);
    }

    if (this.home) {
      this.home.onResize(values);
    }
  }

  update(scroll) {
    if (this.home) {
      this.home.update();
    }
    if (this.about) {
      this.about.update(scroll);
    }
    if (this.collections) {
      this.collections.update();
    }
    this.renderer.render({
      camera: this.camera,
      scene: this.scene,
    });
  }*/
}
