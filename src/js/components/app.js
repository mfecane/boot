import React, { useState } from 'react'
import LightControl from 'js/components/light-control'
import BootMenu from 'js/components/boot-menu/boot-menu'
import Logo from 'js/components/logo'
import Report from 'js/components/boot-menu/report'

const app = () => {
  const [showReport, setShowReport] = useState(false)

  const onReportShow = () => {
    setShowReport(true)
  }

  const onReportClose = () => {
    setShowReport(false)
  }

  return (
    <React.Fragment>
      <Logo />
      <LightControl />
      <BootMenu onReportShow={onReportShow} />
      <Report show={showReport} onReportClose={onReportClose} />
    </React.Fragment>
  )
}

export default app
