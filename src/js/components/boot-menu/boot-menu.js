import React, { useState } from 'react'
import BootMenuItem from 'js/components/boot-menu/boot-menu-item'
import Controls from 'js/components/boot-menu/controls'
import Report from 'js/components/boot-menu/report'

import styles from 'js/components/boot-menu/boot-menu.module.scss'
import { getBootMenuItems } from 'js/data/parameters'

const bootMenu = ({ onReportShow }) => {
  const [active, setActive] = useState(false)

  const onMenuItemClick = (part) => {
    if (active === part) {
      return setActive(null)
    }
    setActive(part)
  }

  const items = getBootMenuItems()
  const elementsJSX = items.map((part) => {
    const isActive = active === part
    return (
      <BootMenuItem
        part={part}
        isActive={isActive}
        onMenuItemClick={onMenuItemClick}
        key={part}
      />
    )
  })

  return (
    <div className={styles.container}>
      <div className={styles.elementsContainer}>{elementsJSX}</div>
      <Controls onReportShow={onReportShow} />
    </div>
  )
}

export default bootMenu
