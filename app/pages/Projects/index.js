import Page from 'classes/Page'

export default class Projects extends Page {
  constructor () {
    super({
      id: 'projects',
      element: '.projects',
      elements: {
        wrapper: '.projects__wrapper',
        navigation: document.querySelector('.navigation')
      }
    })
  }
}
