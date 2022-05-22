import diffuseTextureSource from 'assets/boot-textures/var1-boot_baseColor.png'
import normalTextureSource from 'assets/boot-textures/var1-boot_normal.png'
import occlusionRoughnessMetallic from 'assets/boot-textures/var1-boot_occlusionRoughnessMetallic.png'

import diffuseTextureSource2 from 'assets/boot-textures/var2-boot_baseColor.png'
import normalTextureSource2 from 'assets/boot-textures/var2-boot_normal.png'
import occlusionRoughnessMetallic2 from 'assets/boot-textures/var2-boot_occlusionRoughnessMetallic.png'

import diffuseTextureSource3 from 'assets/boot-textures/var3-boot_baseColor.png'
import normalTextureSource3 from 'assets/boot-textures/var3-boot_normal.png'
import occlusionRoughnessMetallic3 from 'assets/boot-textures/var3-boot_occlusionRoughnessMetallic.png'

import diffuseTextureSource4 from 'assets/boot-textures/var4-boot_baseColor.png'
import normalTextureSource4 from 'assets/boot-textures/var4-boot_normal.png'
import occlusionRoughnessMetallic4 from 'assets/boot-textures/var4-boot_occlusionRoughnessMetallic.png'

import diffuseTextureSource5 from 'assets/boot-textures/var5-boot_baseColor.png'
import normalTextureSource5 from 'assets/boot-textures/var5-boot_normal.png'
import occlusionRoughnessMetallic5 from 'assets/boot-textures/var5-boot_occlusionRoughnessMetallic.png'

import diffuseTextureSource6 from 'assets/boot-textures/var6-boot_baseColor.png'
import normalTextureSource6 from 'assets/boot-textures/var6-boot_normal.png'
import occlusionRoughnessMetallic6 from 'assets/boot-textures/var6-boot_occlusionRoughnessMetallic.png'

export const partsConfig = {
  tip: { modelName: 'tip_low', screenName: 'Tip' },
  tongue: { modelName: 'tongue_low', screenName: 'Tongue' },
  heel: { modelName: 'heel_low', screenName: 'Heel' },
  strap: { modelName: 'strap_low', screenName: 'Strap' },
  shaft: { modelName: 'shaft_low', screenName: 'Shaft' },
  sole: { modelName: 'sole_low', screenName: 'Sole' },
  laces: { modelName: 'laces_low', screenName: 'Laces' },
}

export type PartsKey = keyof typeof partsConfig

export const textureSets = {
  set1: {
    diffuse: diffuseTextureSource,
    normal: normalTextureSource,
    occlusionRoughnessMetallic: occlusionRoughnessMetallic,
  },
  set2: {
    diffuse: diffuseTextureSource2,
    normal: normalTextureSource2,
    occlusionRoughnessMetallic: occlusionRoughnessMetallic2,
  },
  set3: {
    diffuse: diffuseTextureSource3,
    normal: normalTextureSource3,
    occlusionRoughnessMetallic: occlusionRoughnessMetallic3,
  },
  set4: {
    diffuse: diffuseTextureSource4,
    normal: normalTextureSource4,
    occlusionRoughnessMetallic: occlusionRoughnessMetallic4,
  },
  set5: {
    diffuse: diffuseTextureSource5,
    normal: normalTextureSource5,
    occlusionRoughnessMetallic: occlusionRoughnessMetallic5,
  },
  set6: {
    diffuse: diffuseTextureSource6,
    normal: normalTextureSource6,
    occlusionRoughnessMetallic: occlusionRoughnessMetallic6,
  },
}

export const defaultTextues = textureSets.set5

export const parameterValues = [
  {
    parts: ['shaft', 'tongue', 'tip', 'strap', 'heel'],
    values: {
      brownLeather: {
        screenName: 'brown leather',
        color: '#332415',
        textureSet: 'set5',
      },
      lightBrownLeather: {
        screenName: 'light brown leather',
        color: '#66553c',
        textureSet: 'set6',
      },
      blackLeather: {
        screenName: 'black leather',
        color: '#1c1c1b',
        textureSet: 'set1',
      },
      nubuck: {
        screenName: 'nubuck',
        color: '#a38339',
        textureSet: 'set2',
      },
      whiteleather: {
        screenName: 'white leather',
        color: '#d4d4d4',
        textureSet: 'set3',
      },
      redLeather: {
        screenName: 'red leather',
        color: '#9e1c1c',
        textureSet: 'set4',
      },
    },
  },
  {
    parts: ['sole'],
    values: {
      tpu: {
        screenName: 'Poleurethane',
        color: '#8f5d11',
        textureSet: 'set5',
      },
      black: {
        screenName: 'dark sole',
        color: '#1c1c1b',
        textureSet: 'set1',
      },
      white: {
        screenName: 'light sole',
        color: '#c7c3bb',
        textureSet: 'set2',
      },
      bnw: {
        screenName: 'black and white sole',
        color: '#d4d2d2',
        textureSet: 'set3',
      },
    },
  },
  {
    parts: ['laces'],
    values: {
      dark: {
        screenName: 'dark',
        color: '#1c1915',
        textureSet: 'set5',
      },
      black: {
        screenName: 'blue',
        color: '#1385ba',
        textureSet: 'set1',
      },
      white: {
        screenName: 'yellow',
        color: '#ba8213',
        textureSet: 'set2',
      },
      blackAndWhite: {
        screenName: 'black and white',
        color: '#d4d2d2',
        textureSet: 'set3',
      },
      red: {
        screenName: 'red',
        color: '#9e1c1c',
        textureSet: 'set4',
      },
    },
  },
]

export const getBootMenuItems = () => {
  var result: any[] = []
  parameterValues.forEach((parameterValue) => {
    parameterValue.parts.forEach((part) => {
      result.push(part)
    })
  })
  return result
}

export const getParameterValueItem = (part) => {
  return parameterValues.find((parameterValue) =>
    parameterValue.parts.includes(part)
  )
}

export const getSelectedValue = (part, selected) => {
  const parameterValueItem = getParameterValueItem(part)
  parameterValueItem.value
}

export const getValueByid = (part, valueKey) => {
  const parameterValueItem = getParameterValueItem(part)
  return parameterValueItem.values[valueKey]
}

export const getDefaultConfig = () => {
  const result = {}
  parameterValues.forEach((el) => {
    el.parts.forEach((p) => {
      result[p] = Object.keys(el.values)[0]
    })
  })
  return result
}
