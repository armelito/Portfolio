import Component from 'classes/Component'
import each from 'lodash/each'

export default class Animation extends Component
{
  constructor ({ element, elements })
  {
    super(
      {
        element,
        elements
      }
    )
    this.separateElements()
    this.createHover()
    this.createObserver()
  }

  separateElements ()
  {
    // Init tabs
    this.elementsToObserve = []
    this.elementsToHover = []
    // Check if it's an element to observe
    if(this.element.attributes[1].value != "link")
    {
      // Push it in the right tab
      this.elementsToObserve.push(this.element)
    }
    // Check if it's an hover element
    else if(this.element.attributes[1].value === "link")
    {
      // Push it in the right tav
      this.elementsToHover.push(this.element)
    }

    return this.elementsToObserve, this.elementsToHover
  }


  createObserver ()
  {
    this.observer = new IntersectionObserver(entries =>
    {
      entries.forEach(entry =>
      {
        if (entry.isIntersecting)
        {
          this.animateIn()
        }
        else
        {
          this.animateOut()
        }
      })
    })
    // Only observe elements to observer (if it is not empty, it's a bug fix)
    each(this.elementsToObserve, elementToObserve =>
    {
      if(elementToObserve.length != 0)
      {
        this.observer.observe(elementToObserve)
      }
    })
  }

  createHover ()
  {
    // Only elements to hover
    each(this.elementsToHover, elementToHover =>
    {
      if(elementToHover.length != 0)
      {
        const el = elementToHover
        // Hove in
        el.addEventListener('mouseenter', event =>
        {
          this.animateIn(event)
        })
        // Hover out
        el.addEventListener('mouseleave', event =>
        {
          this.animateOut(event)
        })
      }
    })
  }

  animateIn ()
  {
    // Overwrited in animations files
  }

  animateOut ()
  {
    // Overwrited in animations files
  }

}
