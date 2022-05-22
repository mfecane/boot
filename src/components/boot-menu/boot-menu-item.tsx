import React from 'react'

import { useStore } from 'src/hooks/use-store'

import styles from 'components/boot-menu/boot-menu-item.module.scss'
import {
  parameterValues,
  partsConfig as realPartsConfig,
  getValueByid,
  PartsKey,
} from 'src/data/parameters'

import Tooltip from 'components/tooltip'

interface IBootItemValue {
  screenName: string
  color: string
  part: string
  id: string
}

const BootItemValue: React.FC<IBootItemValue> = ({
  screenName,
  color,
  part,
  id,
}) => {
  const {
    state: { partsConfig },
    dispatch,
  } = useStore()
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

interface IBootMenuItemProps {
  part: PartsKey
}

const BootMenuItem: React.FC<IBootMenuItemProps> = ({ part }) => {
  const {
    state: { partsConfig, selectedPart },
    dispatch,
  } = useStore()
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
    return <BootItemValue {...el} part={part} key={index} />
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
