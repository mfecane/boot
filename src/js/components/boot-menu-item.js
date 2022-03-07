import React from 'react'

import styles from 'js/components/boot-menu-item.module.scss'

const BootMenuItem = () => {
  return (
    <section>
      <div className={styles.thumbnail}></div>
      <div>Подошва</div>
      <div>
        <ul>
          <li>
            <div className={styles.smallThumb}></div>
          </li>
          <li>
            <div className={styles.smallThumb}></div>
          </li>
          <li>
            <div className={styles.smallThumb}></div>
          </li>
          <li>
            <div className={styles.smallThumb}></div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default BootMenuItem
