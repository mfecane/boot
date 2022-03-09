import React from 'react'

import styles from 'js/components/boot-menu/controls.module.scss'

const controls = () => {
  return (
    <div class={styles.container}>
      <button className={`btn`}>Save</button>
      <button className={`btn`}>Reset</button>
    </div>
  )
}

export default controls
