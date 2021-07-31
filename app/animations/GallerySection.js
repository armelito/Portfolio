import Animation from '../Classes/Animation'

export default class GallerySection extends Animation
{
  constructor({ _element, _elements })
  {
    super (
      {
        _element,
        _elements
      }
    )

    this.hoverIn, this.hoverOut
    this.coords = { x: 0, y: 0 }
    this.media =
    {
      image: null,
      offset:
      {
        top: 0,
        left: 0
      }
    }
  }

  onMouseMove(_mouse)
  {
    // Met à jour les coordonnées de la balle en appliquant un easing
   //this.coords.x = _mouse.x - 20
   //this.coords.y = _mouse.y + 100
   // if (this.media.image && this.hoverIn)
   // {
   //   this.coords.x -= this.media.offset.left
   //   this.coords.y -= this.media.offset.top
//
   //   this.updateImage()
   // }
  }

  updateImage()
  {
    //this.media.image.style.left = `${this.coords.x}px`
    //this.media.image.style.top = `${this.coords.y}px`
  }

  animateIn()
  {
    //this.hoverIn = true
    //this.media.image = this.element.querySelector('figure')
    //this.media.offset.top = this.media.image.getBoundingClientRect().top
    //this.media.offset.left = this.media.image.getBoundingClientRect().left
  }

  animateOut()
  {
    //this.hoverIn = false
//
    //this.media.image.style.left = `0px`
    //this.media.image.style.top = `0px`
  }

  onResize ()
  {

  }
}
