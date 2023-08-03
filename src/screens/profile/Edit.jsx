import React from 'react'
import BodyWapperUI from '../../common/BodyWapperUI'
import AppbarUI from '../../common/AppbarUI'
import DrawerUI from '../../common/DrawerUI'
import { Helmet } from 'react-helmet-async'

export default function Edit() {
  return (
    <>
      <Helmet><title> Quiz Wall | Users </title></Helmet>
      <AppbarUI />
      <DrawerUI />
      <BodyWapperUI>

      </BodyWapperUI>
    </>
  )
}
