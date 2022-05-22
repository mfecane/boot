import React from 'react'

import styles from 'components/boot-menu/controls.module.scss'

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
