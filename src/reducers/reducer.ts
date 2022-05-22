import { getDefaultConfig, PartsKey } from 'src/data/parameters'
import {
  changeBootMaterialCallback,
  changeLightCallback,
} from 'src/scene/scene'

export type IStore = {
  sceneLoaded: boolean
  showReport: boolean
  selectedPart: PartsKey | null
  partsConfig: any
  lightPosition: number
}

export type IAction =
  | { type: 'setSelectedPart'; payload: any }
  | { type: 'setMaterial'; payload: any }
  | {
      type: 'sceneLoaded'
      payload: any
    }
  | {
      type: 'showReport'
      payload: any
    }
  | {
      type: 'hideReport'
      payload: any
    }
  | {
      type: 'setLightPosition'
      payload: any
    }

export const initialState: IStore = {
  sceneLoaded: false,
  showReport: false,
  selectedPart: null,
  partsConfig: getDefaultConfig(),
  lightPosition: 200,
}

export default (state: IStore, action: IAction): IStore => {
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
