import React from 'react'
import { Helmet } from 'react-helmet'
import DrawerUI from '../../common/DrawerUI'
import AppbarUI from '../../common/AppbarUI'
import BodyWapperUI from '../../common/BodyWapperUI'
import List from './List'


export default function Index() {
  return (
   <>
    <Helmet><title> Live Missions </title></Helmet>
    <AppbarUI />
    <DrawerUI />
    <BodyWapperUI>

      <List/>

    </BodyWapperUI>


   </>
  )
}
