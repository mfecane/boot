import React, { useState } from 'react'
import styles from 'js/components/tooltip.module.scss'

const Tooltip = (props) => {
  let timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, props.delay || 200)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <div
      className={styles['Tooltip-Wrapper']}
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div
          className={`${styles['Tooltip-Tip']} ${
            styles[props.direction || 'top']
          }`}
        >
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  )
}

export default Tooltip
