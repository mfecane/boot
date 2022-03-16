import { getDefaultConfig } from 'data/parameters'
import { changeBootMaterialCallback, changeLightCallback } from 'scene/scene'

export const initialState = {
  sceneLoaded: false,
  showReport: false,
  selectedPart: null,
  partsConfig: getDefaultConfig(),
  lightPosition: 200,
}

export default (state, action) => {
  console.log('action: ', action)

  switch (action.type) {
    case 'setSelectedPart':
      if (state.selectedPart === action.payload) {
        return { ...state, selectedPart: null }
      }
      return { ...state, selectedPart: action.payload }

    case 'setMaterial':
      if (state.selectedPart) {
        const partsConfig = { ...state.partsConfig }
        partsConfig[state.selectedPart] = action.payload
        // side effect
        changeBootMaterialCallback(state.selectedPart, action.payload)
        return { ...state, partsConfig: partsConfig }
      }
      break

    case 'sceneLoaded':
      return { ...state, sceneLoaded: action.payload }

    case 'showReport':
      return { ...state, showReport: true }

    case 'hideReport':
      return { ...state, showReport: false }

    case 'setLightPosition':

      // side effect
      changeLightCallback(action.payload / 500)
      return { ...state, lightPosition: action.payload }

    default:
      return state
  }
}
