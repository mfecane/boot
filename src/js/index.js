import React from 'react'
import ReactDOM from 'react-dom'
import 'css/null.scss'
import 'css/global.scss'
import 'css/styles.scss'

import App from 'js/components/app'
import {
  createScene,
  changeLightCallback,
  changeBootMaterialCallback,
} from 'js/components/scene/scene'
import SceneContext from 'js/scene-context'
import { setConfigItem, getConfigItem } from 'js/data/data-model'

createScene()
changeLightCallback(3)

var sceneContextData = {
  getConfigItem: getConfigItem,
  setConfigItem: setConfigItem,
  changeLightCallback: changeLightCallback,
  changeBootMaterialCallback: changeBootMaterialCallback,
}

ReactDOM.render(
  <SceneContext.Provider value={sceneContextData}>
    <App />
  </SceneContext.Provider>,
  document.querySelector('#app')
)
