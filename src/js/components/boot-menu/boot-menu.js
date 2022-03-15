import React, { useContext } from 'react'
import StateContext from 'js/state-context'

import BootMenuItem from 'js/components/boot-menu/boot-menu-item'
import Controls from 'js/components/boot-menu/controls'

import styles from 'js/components/boot-menu/boot-menu.module.scss'

const bootMenu = () => {
  const [{ partsConfig }, dispatch] = useContext(StateContext)

  const elementsJSX = Object.keys(partsConfig).map((part) => {
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
