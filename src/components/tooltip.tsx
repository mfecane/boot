import { useState } from 'react'
import styles from 'components/tooltip.module.scss'

interface ITooltipProps {
  direction: 'top' | 'bottom'
  content: string
  delay?: number
}

const Tooltip: React.FC<ITooltipProps> = (props) => {
  let timeout: number
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
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && (
        <div
          className={`${styles['Tooltip-Tip']} ${
            styles[props.direction || 'top']
          }`}
        >
          {props.content}
        </div>
      )}
    </div>
  )
}

export default Tooltip
