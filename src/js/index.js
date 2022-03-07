import React from 'react'
import ReactDOM from 'react-dom'
import 'css/null.scss'
import 'css/global.scss'
import 'css/styles.scss'

import App from 'js/components/app'
import Scene from 'js/components/scene'

var scene = new Scene()
const SceneContext = React.createContext(null)

ReactDOM.render(<App />, document.querySelector('#app'))
