import React from 'react'
import BootMenuItem from 'js/components/boot-menu-item'

import styles from 'js/components/boot-menu.module.scss'
import {parameterValues} from 'js/data/parameters'


const bootMenu = () => {


  return (
    <div className={styles.container}>
      <BootMenuItem title={'подошва'} value={'нубук бадук бадабук'} />
      <BootMenuItem title={'подошва'} value={'нубук'} />
      <BootMenuItem title={'подошва'} value={'нубук'} />
      <BootMenuItem title={'подошва'} value={'нубук'} />
    </div>
  )
}

export default bootMenu
