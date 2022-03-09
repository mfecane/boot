import React, { useState, useContext, useEffect } from 'react'

import styles from 'js/components/boot-menu-item.module.scss'
import { parameterValues, partsConfig, getValueByid } from 'js/data/parameters'
import sceneContext from 'js/scene-context'

import Tooltip from 'js/components/tooltip'

const BootItemValue = (props) => {
  const { screenName, color, selected, setSelected, part, id } = props
  const { changeBootMaterialCallback } = useContext(sceneContext)

  const onClick = () => {
    changeBootMaterialCallback(part, id)
    setSelected()
  }

  // TODO ::: add image thumbnail

  return (
    <li>
      <Tooltip content={screenName} direction="bottom">
        <div
          onClick={onClick}
          className={`${styles.smallThumb} ${
            selected ? styles.smallThumbSelected : ''
          }`}
          style={{ backgroundColor: color }}
        ></div>
      </Tooltip>
    </li>
  )
}

const BootMenuItem = (props) => {
  const { getConfigItem, setConfigItem } = useContext(sceneContext)
  const { part, onMenuItemClick, isActive } = props
  const title = partsConfig[part]?.screenName

  const values = parameterValues.find((el) => el.parts.includes(part)).values
  const value = getConfigItem(part)

  const valuesArray = Object.keys(values).map((key) => {
    return {
      id: key,
      ...values[key],
    }
  })

  const setSelectedItem = (part, value) => {
    setConfigItem(part, value)
  }

  const valuesJSX = valuesArray.map((el, index) => {
    const isSelected = value === el.id

    const setSelectedBound = setSelectedItem.bind(null, part, el.id)

    return (
      <BootItemValue
        {...el}
        setSelected={setSelectedBound}
        selected={isSelected}
        part={part}
        key={index}
      />
    )
  })

  let selectedValue = null
  if (value) {
    selectedValue = getValueByid(part, value)
  }

  return (
    <section className={styles.container}>
      <div className={styles.header} onClick={onMenuItemClick.bind(null, part)}>
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
