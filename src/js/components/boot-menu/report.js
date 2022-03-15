import React, { useContext } from 'react'
import StateContext from 'js/state-context'
import { parameterValues } from 'js/data/parameters'

import styles from 'js/components/boot-menu/report.module.scss'

const ReportItem = ({ keyName, value }) => {
  let valueName

  parameterValues.forEach((parameterValue) => {
    if (parameterValue.values[value]) {
      valueName = parameterValue.values[value].screenName
    }
  })

  if (!valueName) {
    throw new Error('Could not find value name for ' + value)
  }

  return (
    <div>
      <span className={styles.key}>{keyName}:</span> {valueName}
    </div>
  )
}

const Report = () => {
  const [{showReport, partsConfig}, dispatch] = useContext(StateContext)

  if (!showReport) {
    return null
  }

  const elmentsJSX = Object.keys(partsConfig).map((key) => {
    return <ReportItem keyName={key} value={partsConfig[key]} key={key} />
  })

  return (
    <React.Fragment>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <h1 className={styles.header}>You have selected following items:</h1>
        {elmentsJSX}
        <button
          onClick={() => dispatch({ type: 'hideReport' })}
          className={`btn btn_primary ${styles.button}`}
        >
          close
        </button>
      </div>
    </React.Fragment>
  )
}

export default Report
