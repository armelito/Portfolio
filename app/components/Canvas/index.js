import { Renderer, Camera, Transform } from "ogl"

// Modules
import Cursor from './Modules/Cursor'
// Pages
//import Home from "./Home/index.js";
//import About from "./About/index.js";
//import Collections from "./Collections/index.js";

export default class Canvas
{
  constructor({ template })
  {
    // Variables
    this.template = template
    this.mouse = { x: 0, y: 0 }
    // Params
    this.x =
    {
      start: 0,
      distance: 0,
      end: 0,
    }

    this.y =
    {
      start: 0,
      distance: 0,
      end: 0,
    }
    // Init functions
    this.createRenderer()
    this.createScene()
    this.createCamera()
    this.createCursor()
    this.onResize()
  }

  createRenderer()
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




  createScene() {
    this.scene = new Transform()
  }

  createCamera()
  {
    this.camera = new Camera(this.gl)
    this.camera.position.z = 5
  }

  createCursor () {
    // Init cursor
    this.cursor = new Cursor()
    // Create cursor
    this.cursor.create()
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.camera.perspective({ aspect: window.innerWidth / window.innerHeight })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.sizes =
    {
      height,
      width,
    }

    const values = { sizes: this.sizes }

    /*if (this.about) {
      this.about.onResize(values);
    }
    if (this.collections) {
      this.collections.onResize(values);
    }

    if (this.home) {
      this.home.onResize(values);
    }*/
  }

  onMouseDown (_event) {
    if (this.cursor && this.cursor.onMouseDown)
    {
      this.cursor.onMouseDown(_event)
    }
  }

  onMouseMove (_event) {
    // Coordonnées
    this.mouse.x = _event.clientX
    this.mouse.y = _event.clientY
    // If cursor + function
    if (this.cursor && this.cursor.onMouseMove)
    {
      this.cursor.onMouseMove(this.mouse)
    }
  }

  onMouseUp (_event) {
    if (this.cursor && this.cursor.onMouseUp)
    {
      this.cursor.onMouseUp(_event)
    }
  }

  update () {
    // Init update function if page is updated
    if (this.cursor && this.cursor.update)
    {
      this.cursor.update()
    }

  }



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
