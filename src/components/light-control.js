import React, { useContext, useEffect, useRef } from 'react'

import styles from 'js/components/light-control.module.scss'
import StateContext from 'js/state-context'

const LightControl = () => {
  const [{ lightPosition }, dispatch] = useContext(StateContext)
  const refInput = useRef(null)

  useEffect(() => {
    refInput.current.value = lightPosition
  })

  let onSliderChange = (e) => {
    dispatch({ type: 'setLightPosition', payload: e.target.value })
  }

  return (
    <div className={styles.container}>
      <i className={styles.light}></i>
      <div className={styles.sliderContainer}>
        <input
          ref={refInput}
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
