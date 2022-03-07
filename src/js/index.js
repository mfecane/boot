import React from 'react'
import ReactDOM from 'react-dom'
import 'css/null.scss'
import 'css/global.scss'
import 'css/styles.scss'

import App from 'js/components/app'
import { createScene, changeLightCallback } from 'js/components/scene'
import SceneContext from 'js/scene-context'

createScene()
changeLightCallback(3)
var sceneContextData = { changeLightCallback: changeLightCallback }

ReactDOM.render(
  <SceneContext.Provider value={sceneContextData}>
    <App />
  </SceneContext.Provider>,
  document.querySelector('#app')
)
