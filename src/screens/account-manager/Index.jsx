import React from 'react'
import { Helmet } from 'react-helmet-async'
import AppbarUI from '../../common/AppbarUI'
import BodyWapperUI from '../../common/BodyWapperUI'
import DrawerUI from '../../common/DrawerUI'
import List from './List'
export default function Index() {
  return (
    <>
      <Helmet><title> Quiz Wall | Dashboard </title></Helmet>
      <AppbarUI />
      <DrawerUI/>
      <BodyWapperUI>
        <List/>
      </BodyWapperUI>
    </>
  )
}
