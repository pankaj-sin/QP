import React from 'react'
import { Helmet } from 'react-helmet'
import AppbarUI from '../../common/AppbarUI'
import DrawerUI from '../../common/DrawerUI'

export default function Detail() {
  return (
    <>
    <Helmet><title> Live Missions Details </title></Helmet>
    <AppbarUI />
    <DrawerUI />
   </>
  )
}
