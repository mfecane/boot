import React, { useContext } from 'react'

import styles from 'js/components/light-control.module.scss'
import SceneContext from 'js/scene-context'

const LightControl = () => {
  const { changeLightCallback } = useContext(SceneContext)

  let onSliderChange = (e) => {
    const value = e.target.value / 500
    changeLightCallback(value)
  }

  return (
    <div className={styles.container}>
      <i className={styles.light}></i>
      <div className={styles.sliderContainer}>
        <input
          className={styles.slider}
          type="range"
          min="0"
          max="500"
          onChange={onSliderChange}
        />
      </div>
    </div>
  )
}

export default LightControl
