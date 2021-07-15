import EventEmitter from 'events'

import each from 'lodash/each'

export default class Component extends EventEmitter {
  constructor ({
    element,
    elements
  }) {
    super()

    this.selector = element
    this.selectorChildren = { ...elements }
    // Init functions
    this.create()
    this.addEventListeners()
  }

  create ()
  {
    // If DOM element already selected in a variable
    if (this.selector instanceof window.HTMLElement)
    {
      // Store the variable of selected DOM element
      this.element = this.selector
    }
    // If DOM element not selected
    else
    {
      // Store DOM element in a variable
      this.element = document.querySelector(this.selector)
    }
    // Create elements object
    this.elements = {}
    // Loop on the DOM children of the element
    each(this.selectorChildren, (entry, key) =>
    {
      // If DOM element already selected in a variable
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry))
      {
        // Store the variable of selected DOM element
        this.elements[key] = entry
      }
      // If DOM element not selected
      else
      {
        // Store DOM elements in a variable
        this.elements[key] = document.querySelectorAll(entry)
        // If there is no elements
        if (this.elements[key].length === 0)
        {
          this.elements[key] = null
        }
        // If there is one element
        else if (this.elements[key].length === 1)
        {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })
  }

  addEventListeners ()
  {
    // Overwrited in components files
  }

  removeEventListeners ()
  {
    // Overwrited in components files
  }
}
