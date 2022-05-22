import { useEffect, useState } from 'react'

import styles from 'components/overlay.module.scss'

const overlay = ({ display }) => {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!display) {
      setTimeout(() => {
        setHidden(true)
      }, 3000)
    }
  }, [display])

  if (hidden) {
    return null
  }

  return (
    <div
      className={`${styles.overlay} ${!display ? styles.transparent : ''}`}
    ></div>
  )
}

export default overlay
