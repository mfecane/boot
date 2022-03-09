import React, { useState, useEffect } from 'react'

import styles from 'js/components/boot-menu-item.module.scss'
import { parameterValues, partsConfig, getValueByid } from 'js/data/parameters'

const BootItemValue = (props) => {
  const { screenName, color, selected, setSelected } = props
  console.log('BootItemValue props', props)
  return (
    <li>
      <div
        onClick={setSelected}
        className={`${styles.smallThumb} ${selected ? styles.smallThumbSelected : ''}`}
        style={{ backgroundColor: color }}
      ></div>
    </li>
  )
}

const BootMenuItem = (props) => {
  const { part, onMenuItemClick, isActive } = props
  const title = partsConfig[part]?.screenName
  const [selected, setSelected] = useState(null)

  const values = parameterValues.find((el) => el.parts.includes(part)).values

  useEffect(() => {
    setSelected(Object.keys(values)[0])
  }, [])

  const valuesArray = Object.keys(values).map((key) => {
    return {
      id: key,
      ...values[key],
    }
  })

  const valuesJSX = valuesArray.map((el, index) => {
    const isSelected = selected === el.id

    const setSelectedBound = setSelected.bind(null, el.id)

    return (
      <BootItemValue
        {...el}
        setSelected={setSelectedBound}
        selected={isSelected}
        key={index}
      />
    )
  })

  let selectedValue = null
  if (selected) {
    selectedValue = getValueByid(part, selected)
  }

  return (
    <section
      className={styles.container}
      onClick={onMenuItemClick.bind(null, part)}
    >
      <div className={styles.header}>
        <div className={styles.thumbnail} style={{ backgroundColor: selectedValue?.color }}></div>
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
