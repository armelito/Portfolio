import Page from 'Classes/Page'

export default class Projects extends Page {
  constructor () {
    super({
      _id: 'projects',
      _element: '.projects',
      _elements: {
        wrapper: '.projects__wrapper',
        navigation: document.querySelector('.navigation')
      }
    })
  }
}
