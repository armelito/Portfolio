import * as THREE from 'three'

export default class World
{
  constructor (_options)
  {
    this.experience = window.experience
    this.config = this.experience.config
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.on('groupEnd', (_group) =>
    {
      if(_group.name === 'base')
      {
        console.log('ok', _group)
        this.setDummy()
      }
    })

    console.log(this.experience.resources.name, this.experience.resources.items)
  }

  setDummy ()
  {
    console.log(this.resources.items.dotsTexture)
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ map: this.resources.items.dotsTexture })
    )

    this.scene.add(cube)
  }

  onResize ()
  {

  }

  update ()
  {

  }

  destroy ()
  {

  }
}
