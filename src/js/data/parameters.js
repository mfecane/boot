import diffuseTextureSource from 'assets/boot-textures/boot_baseColor.png'
import diffuseTextureSource2 from 'assets/boot-textures/boot_baseColor-2.png'
import normalTextureSource from 'assets/boot-textures/boot_normal.png'
import occlusionRoughnessMetallic from 'assets/boot-textures/boot_occlusionRoughnessMetallic.png'

export const defaultTextues = {
  diffuse: diffuseTextureSource,
  normal: normalTextureSource,
  occlusionRoughnessMetallic: occlusionRoughnessMetallic,
}

export const partsConfig = {
  shaft: { modelName: 'shaft_low', screenName: 'Shaft' },
  tongue: { modelName: 'tongue_low', screenName: 'Tongue' },
}

export const textureSets = {
  set1: {
    diffuse: diffuseTextureSource,
  },
  set2: {
    diffuse: diffuseTextureSource2,
  },
}

export const parameterValues = [
  {
    parts: ['shaft', 'tongue'],
    values: {
      nubuck: {
        screenName: 'nubuck',
        color: '#973a3a',
        textureSet: 'set1',
      },
      leather: {
        screenName: 'black leather',
        color: '#4660a7',
        textureSet: 'set2',
      },
      leather: {
        screenName: 'yellow leather',
        color: '#c04c4c',
        textureSet: 'set3',
      },
      leather: {
        screenName: 'crocodile leather',
        color: '#c04c4c',
        textureSet: 'set4',
      },
    },
  },
  {
    parts: ['sole'],
    values: {
      black: {
        screenName: 'white sole made of junk',
        color: '#bbbbbb',
        textureSet: 'set1',
      },
      white: {
        screenName: 'black crocodile leather',
        color: '#4d4d4d',
        textureSet: 'set2',
      },
    },
  },
]
