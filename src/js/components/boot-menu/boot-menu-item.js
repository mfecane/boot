import React, { useContext } from 'react'

import styles from 'js/components/boot-menu/boot-menu-item.module.scss'
import { parameterValues, partsConfig as realPartsConfig, getValueByid } from 'js/data/parameters'
import StateContext from 'js/state-context'

import Tooltip from 'js/components/tooltip'

const BootItemValue = ({ screenName, color, part, id }) => {
  const [{ partsConfig }, dispatch] = useContext(StateContext)
  const selected = partsConfig[part] === id

  // TODO ::: add image thumbnail

  return (
    <li>
      <Tooltip content={screenName} direction="bottom">
        <div
          onClick={() => {
            dispatch({ type: 'setMaterial', payload: id })
          }}
          className={`${styles.smallThumb} ${
            selected ? styles.smallThumbSelected : ''
          }`}
          style={{ backgroundColor: color }}
        ></div>
      </Tooltip>
    </li>
  )
}

const BootMenuItem = ({ part }) => {
  const [{ partsConfig, selectedPart }, dispatch] = useContext(StateContext)
  const title = realPartsConfig[part]?.screenName
  const isActive = selectedPart === part

  const values = parameterValues.find((el) => el.parts.includes(part)).values
  const value = partsConfig[part]

  let selectedValue = null
  if (value) {
    selectedValue = getValueByid(part, value)
  }

  const valuesArray = Object.keys(values).map((key) => {
    return {
      id: key,
      ...values[key],
    }
  })

  const valuesJSX = valuesArray.map((el, index) => {
    return (
      <BootItemValue {...el} part={part} key={index} />
    )
  })

  return (
    <section className={styles.container}>
      <div
        className={styles.header}
        onClick={() => dispatch({ type: 'setSelectedPart', payload: part })}
      >
        <div
          className={styles.thumbnail}
          style={{ backgroundColor: selectedValue?.color }}
        ></div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{selectedValue?.screenName}</div>
      </div>
      <div
        className={`${styles.values} ${isActive ? styles.valuesActive : ''}`}
      >
        <ul className={styles.valuesContainer}>{valuesJSX}</ul>
      </div>
    </section>
  )
}

export default BootMenuItem
