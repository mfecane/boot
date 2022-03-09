import React from 'react'
import LightControl from 'js/components/light-control'
import BootMenu from 'js/components/boot-menu'
import Logo from 'js/components/logo'

const app = () => {
  return (
    <React.Fragment>
      <Logo />
      <LightControl />
      <BootMenu />
    </React.Fragment>
  )
}

export default app
