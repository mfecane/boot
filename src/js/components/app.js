import React, { useEffect } from 'react'

import StateContext from 'js/state-context'
import reducer, { initialState } from 'js/reducers/reducer'

import { createScene, setSceneLoadedCallback } from 'js/scene/scene'

import LightControl from 'js/components/light-control'
import BootMenu from 'js/components/boot-menu/boot-menu'
import Logo from 'js/components/logo'
import Report from 'js/components/boot-menu/report'
import Overlay from 'js/components/overlay'

import 'css/null.scss'
import 'css/global.scss'
import 'css/styles.scss'

export default () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  useEffect(function () {
    createScene()

    setSceneLoadedCallback(() => {
      dispatch({
        type: 'sceneLoaded',
        payload: true,
      })

      dispatch({
        type: 'setLightPosition',
        payload: 200,
      })
    })
  })

  return (
    <StateContext.Provider value={[state, dispatch]}>
      <Overlay display={!state.sceneLoaded} />
      <Logo />
      <LightControl />
      <BootMenu />
      <Report />
    </StateContext.Provider>
  )
}
