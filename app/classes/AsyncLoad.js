import Component from 'classes/Component'

export default class AsyncLoad extends Component {
  constructor ({ element }) {
    super({ element })
    // Create observer
    this.createObserver()
  }
  // Init observer
  createObserver ()
  {
    this.observer = new window.IntersectionObserver(entries =>
    {
      entries.forEach(entry =>
      {
        // If intersecting
        if (entry.isIntersecting)
        {
          // If image not loaded
          if (!this.element.src)
          {
            // Create src with data attribute value
            this.element.src = this.element.getAttribute('data-src')
            // If loaded
            this.element.onload = _ =>
            {
              // Add loaded animation
              this.element.classList.add('loaded')
            }
          }
          // If image loaded
          else
          {
            // Add loaded animation
            this.element.classList.add('loaded')
          }
        }
        // If not intersecting
        else
        {
          // Remove loaded animation
          this.element.classList.remove('loaded')
        }
      })
    })
    // Observe target
    this.observer.observe(this.element)
  }
}
