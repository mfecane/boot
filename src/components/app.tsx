import { useEffect } from 'react'

import { createScene, setSceneLoadedCallback } from 'src/scene/scene'
import { useStore } from 'src/hooks/use-store'

import LightControl from 'components/light-control'
import BootMenu from 'components/boot-menu/boot-menu'
import Logo from 'components/logo'
import Report from 'components/boot-menu/report'
import Overlay from 'components/overlay'

import 'css/null.scss'
import 'css/global.scss'
import 'css/styles.scss'

export default () => {
	const { state, dispatch } = useStore()

	useEffect(function () {
		createScene()
	}, [])

	useEffect(
		function () {
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
		},
		[state.sceneLoaded]
	)

	return (
		<>
			<Overlay display={!state.sceneLoaded} />
			<Logo />
			<LightControl />
			<BootMenu />
			<Report />
		</>
	)
}
