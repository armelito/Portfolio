import * as THREE from 'three'

import fragment from '../../Shaders/PolygonTransition/fragment.glsl'
import vertex from '../../Shaders/PolygonTransition/vertex.glsl'

export default function()
{
  this.experience = window.experience
  this.resources = this.experience.resources

  const uniforms =
  {
    time: { value: null },
    uBorderAlpha: { value: null },
    uStrikeAlpha: { value: null },
    progress: { type: "f", value: 0 },
    resolution: { type: "v4", value: new THREE.Vector4() },
    texture1: { type: "t", value: this.resources.items.dotsTexture }
  }

  const material = new THREE.ShaderMaterial
  ({
    extensions: {
      derivatives: "#extension GL_OES_standard_derivatives : enable"
    },
    wireframe: false,
    transparent: true,
    side: THREE.DoubleSide,
    depthTest: false,
    depthWrite: false,
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment
  })

  return material
}
