import React from 'react'
import { getDefaultConfig } from 'js/data/parameters'
import { setConfig } from 'js/data/data-model'

import styles from 'js/components/boot-menu/controls.module.scss'

const Controls = ({ onReportShow }) => {
  return (
    <div className={styles.container}>
      <button className={`btn btn_primary`} onClick={onReportShow}>
        Save
      </button>
      {/* <button
        className={`btn btn_primary`}
        onClick={() => setConfig(getDefaultConfig())}
      >
        Reset
      </button> */}
    </div>
  )
}

export default Controls
