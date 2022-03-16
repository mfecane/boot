import React, { useEffect } from 'react'

import StateContext from 'state-context'
import reducer, { initialState } from 'reducers/reducer'

import { createScene, setSceneLoadedCallback } from 'scene/scene'

import LightControl from 'components/light-control'
import BootMenu from 'components/boot-menu/boot-menu'
import Logo from 'components/logo'
import Report from 'components/boot-menu/report'
import Overlay from 'components/overlay'

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
