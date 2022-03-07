import React from 'react'
import BootMenuItem from 'js/components/boot-menu-item'

import styles from 'js/components/boot-menu.module.scss'


const bootMenu = () => {
  return (
    <div className={styles.container}>
      <BootMenuItem />
      <BootMenuItem />
      <BootMenuItem />
      <BootMenuItem />
    </div>
  )
}

export default bootMenu
