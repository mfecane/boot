import React, { useContext, useEffect, useState } from 'react'

import sceneContext from 'js/scene-context'

import styles from 'js/components/boot-menu/report.module.scss'

import { parameterValues } from 'js/data/parameters'

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

const Report = ({ show, onReportClose }) => {
  const { getConfig } = useContext(sceneContext)
  const [value, setValue] = useState(false)

  useEffect(() => {
    setValue(getConfig())
  }, [show])

  if (!show) {
    return null
  }

  const elmentsJSX = Object.keys(value).map((key) => {
    return <ReportItem keyName={key} value={value[key]} key={key} />
  })

  return (
    <React.Fragment>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <h1 className={styles.header}>You have selected following items:</h1>
        {elmentsJSX}
        <button
          onClick={onReportClose}
          className={`btn btn_primary ${styles.button}`}
        >
          close
        </button>
      </div>
    </React.Fragment>
  )
}

export default Report
