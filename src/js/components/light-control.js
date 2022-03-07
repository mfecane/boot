import React from 'react'

import styles from 'js/components/light-control.module.scss'

const LightControl = () => {
  return (
    <div className={styles.container}>
      <div>Position of the light</div>
      <input class={styles.slider} type="range" min="0" max="500" />
    </div>
  )
}

export default LightControl
