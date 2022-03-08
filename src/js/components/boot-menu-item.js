import React from 'react'

import styles from 'js/components/boot-menu-item.module.scss'
import {parameterValues} from 'js/data/parameters'

const BootItemValue=  (props) => {
  const {screenName} = props;
  return (<li>
    <div className={styles.smallThumb}></div>
  </li>)
}

const BootMenuItem = (props) => {
  const {part} = props;

  const values = parameterValues.filter(el=>
    el.parts.includes(part)
  );

  const valuesArray = Object.keys(values).map(key => {
    return {
      id: key,
      ...values[key]
    }
  })

  const valuesJSX = valuesArray.map(el=>(
    <BootItemValue {...el} />
  ))

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.thumbnail}></div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{value}</div>
      </div>
      <div>
        <ul>
          {valuesJSX}
        </ul>
      </div>
    </section>
  )
}

export default BootMenuItem
