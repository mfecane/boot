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
  tip: {modelName: 'tip_low', screenName: 'Tip' },
  tongue: { modelName: 'tongue_low', screenName: 'Tongue' },
  heel: { modelName: 'heel_low', screenName: 'Heel' },
  strap: { modelName: 'strap_low', screenName: 'Strap' },
  shaft: { modelName: 'shaft_low', screenName: 'Shaft' },
  sole: { modelName: 'sole_low', screenName: 'Sole' },
  laces: {modelName: 'laces_low', screenName: 'Laces' },
}

export const textureSets = {
  set1: {
    diffuse: diffuseTextureSource,
  },
  set2: {
    diffuse: diffuseTextureSource2,
  },
  set3: {
    diffuse: diffuseTextureSource2,
  },
}

export const parameterValues = [
  {
    parts: ['shaft', 'tongue', 'tip', 'strap', 'heel'],
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
      yleather: {
        screenName: 'yellow leather',
        color: '#c04c4c',
        textureSet: 'set3',
      },
      crocleather: {
        screenName: 'crocodile leather',
        color: '#c04c4c',
        textureSet: 'set4',
      },
      crocleather2: {
        screenName: 'crocodile leather',
        color: '#c04c4c',
        textureSet: 'set4',
      },
      crocleather3: {
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
  {
    parts: ['laces'],
    values: {
      black: {
        screenName: 'blue',
        color: '#bbbbbb',
        textureSet: 'set1',
      },
      white: {
        screenName: 'yellow',
        color: '#4d4d4d',
        textureSet: 'set2',
      },
    },
  },
]

export const getBootMenuItems = ()=>{
  var result = []
  parameterValues.forEach((parameterValue) => {
    parameterValue.parts.forEach((part) => {
      result.push(part);
    })
  });
  return result;
}

export const getPart = (part)=>{
  const foundValueItem = parameterValues.find((parameterValue)=>
    parameterValue.parts.includes(part))

}

export const getParameterValueItem = (part) => {
  return parameterValues.find((parameterValue)=>
    parameterValue.parts.includes(part))
}

export const getSelectedValue = (part, selected) => {
  const parameterValueItem = getParameterValueItem(part);
  parameterValueItem.value
}

export const getValueByid = (part, valueKey) => {
  const parameterValueItem = getParameterValueItem(part);
  return parameterValueItem.values[valueKey]
}
