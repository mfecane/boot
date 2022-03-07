import diffuseTextureSource from 'assets/boot-textures/boot_baseColor.png'
import normalTextureSource from 'assets/boot-textures/boot_normal.png'
import occlusionRoughnessMetallic from 'assets/boot-textures/boot_occlusionRoughnessMetallic.png'

export default [
  {
    sources: {
      diffuse: diffuseTextureSource,
      normal: normalTextureSource,
      roughness: occlusionRoughnessMetallic,
      metalness: occlusionRoughnessMetallic,
      ao: occlusionRoughnessMetallic,
    },
    parts: [
      {
        partName: 'shaft_low',
        value: '1',
      },
      {
        partName: 'tongue_low',
        value: '1',
      },
      {
        partName: 'tip_low',
        value: '1',
      },
      {
        partName: 'heel_low',
        value: '1',
      },
      {
        partName: 'strap_low',
        value: '1',
      },
      {
        partName: 'laces_low',
        value: '1',
      },
      {
        partName: 'sole_low',
        value: '1',
      },
    ],
  },
  {
    sources: {
      diffuse: diffuseTextureSource,
    },
    parts: [
      {
        partName: 'shaft_low',
        value: '2',
      },
      {
        partName: 'tongue_low',
        value: '2',
      },
      {
        partName: 'tip_low',
        value: '2',
      },
      {
        partName: 'heel_low',
        value: '2',
      },
      {
        partName: 'strap_low',
        value: '2',
      },
      {
        partName: 'laces_low',
        value: '2',
      },
      {
        partName: 'sole_low',
        value: '2',
      },
    ],
  },
]
