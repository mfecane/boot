import React from 'react'

import styles  from 'js/components/overlay.module.scss'

const overlay = ({ display }) => {
  if (display) {
    <div className={styles.overlay}>overlay</div>
  }
  return null;
}

export default overlay
