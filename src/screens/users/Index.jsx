import React from 'react'
import DrawerUI from '../../common/DrawerUI'
import AppbarUI from '../../common/AppbarUI'
import { Helmet } from 'react-helmet-async'
import BodyWapperUI from '../../common/BodyWapperUI'
import List from './List'

export default function Index() {
  return (
    <>
      <Helmet><title> Quiz Wall | Users </title></Helmet>
      <AppbarUI />
      <DrawerUI />
      <BodyWapperUI>
        <List/>
      </BodyWapperUI>
    </>
  )
}
