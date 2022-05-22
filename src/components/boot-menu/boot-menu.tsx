import React from 'react'

import { useStore } from 'src/hooks/use-store'

import BootMenuItem from 'components/boot-menu/boot-menu-item'
import Controls from 'components/boot-menu/controls'

import styles from 'components/boot-menu/boot-menu.module.scss'
import { PartsKey } from 'src/data/parameters'

const bootMenu = () => {
  const {
    state: { partsConfig },
    dispatch,
  } = useStore()

  const elementsJSX = Object.keys(partsConfig).map((part: PartsKey) => {
    return <BootMenuItem part={part} key={part} />
  })

  return (
    <div className={styles.container}>
      <div className={styles.elementsContainer}>{elementsJSX}</div>
      <Controls
        onReportShow={() => {
          dispatch({ type: 'showReport' })
        }}
      />
    </div>
  )
}

export default bootMenu
