import React from 'react'

import styles from 'js/components/boot-menu/controls.module.scss'

const Controls = () => {
  return (
    <div class={styles.container}>
      <button className={`btn btn_primary`}>Save</button>
      <button className={`btn btn_primary`}>Reset</button>
    </div>
  )
}

export default Controls
