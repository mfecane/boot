import React, { useContext } from 'react'

import styles from 'js/components/light-control.module.scss'
import SceneContext from 'js/scene-context'

const LightControl = () => {
  const { changeLightCallback } = useContext(SceneContext)

  let onSliderChange = (e) => {
    console.log(e.target.value)
    const value = e.target.value / 500
    changeLightCallback(value)
  }

  return (
    <div className={styles.container}>
      <div>Position of the light</div>
      <input
        className={styles.slider}
        type="range"
        min="0"
        max="500"
        onChange={onSliderChange}
      />
    </div>
  )
}

export default LightControl
