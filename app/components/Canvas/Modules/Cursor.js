export default class Cursor
{
  constructor ()
  {
    this.mouse = { x: 0, y: 0 }
    this.coords = { x: 0, y: 0 }
    // Cursor
    this.element = document.createElement('div')
    this.element.classList.add('cursor')
    document.body.appendChild(this.element)

    this.cursor = document.querySelector('.cursor')
  }

  create ()
  {

  }

  onMouseDown (_event) {
    this.cursor.classList.add('mouse-down')
  }

  onMouseMove (_mouse) {
    this.mouse = _mouse
  }

  onMouseUp (_event) {
    this.cursor.classList.remove('mouse-down')
  }

  update ()
  {
    // Met à jour les coordonnées de la balle en appliquant un easing
    this.coords.x += (this.mouse.x - this.coords.x) * 0.1
    this.coords.y += (this.mouse.y - this.coords.y) * 0.1

    this.cursor.style.left = `${this.coords.x}px`
    this.cursor.style.top = `${this.coords.y}px`

    //this.context.arc(this.coords.x, this.coords.y, 50, 0, Math.PI * 2)

  }
}
