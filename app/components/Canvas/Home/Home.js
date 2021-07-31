// Ogl
import { Plane, Transform } from 'ogl'
// Nodes modules
import map from 'lodash/map'
// Media
import Media from './Media'
// class
export default class Home
{
  constructor ({ gl, scene, values })
  {
    this.gl = gl
    this.sizes = values.sizes
    this.group = new Transform()
    this.medias = document.querySelectorAll('.gallery__project__media__image')

    this.createGeometry()
    this.createGallery()

    this.group.setParent(scene)
  }

  createGeometry ()
  {
    this.geometry = new Plane(this.gl)
  }

  createGallery ()
  {
    map(this.medias, (element, index) =>
    {
      return new Media(
      {
        element,
        geometry: this.geometry,
        index,
        gl: this.gl,
        scene: this.group
      })
    })
  }

  onResize()
  {

  }
}
