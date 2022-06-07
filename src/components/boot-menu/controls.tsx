import { useStore } from 'src/hooks/use-store'

import styles from 'components/boot-menu/controls.module.scss'

const Controls = () => {
  const {
    state: { partsConfig },
    dispatch,
  } = useStore()

  return (
    <div className={styles.container}>
      <button className={`btn btn_primary`} onClick={() => {
          dispatch({ type: 'showReport' })
        }}>
        Save
      </button>
    </div>
  )
}

export default Controls
