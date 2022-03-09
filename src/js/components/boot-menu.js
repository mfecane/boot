import React, {useState} from 'react'
import BootMenuItem from 'js/components/boot-menu-item'

import styles from 'js/components/boot-menu.module.scss'
import { getBootMenuItems } from 'js/data/parameters'

const bootMenu = () => {
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

  return <div className={styles.container}>{elementsJSX}</div>
}

export default bootMenu
