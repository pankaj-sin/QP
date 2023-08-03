import { Grid,Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import AppbarUI from '../../common/AppbarUI'
import BodyWapperUI from '../../common/BodyWapperUI'
import DrawerUI from '../../common/DrawerUI'
import ConversionRate from './ConversionRate'
import ExpectedRevenue from './ExpectedRevenue'
import NoOfDropAttempts from './NoOfDropAttempts'
import NoOfExpectedImpressionsGenerated from './NoOfExpectedImpressionsGenerated'
import NoOfParticipant from './NoOfParticipant'
import NoOfQualifiedAttempts from './NoOfQualifiedAttempts'
import NoOfQuitAttempts from './NoOfQuitAttempts'
import NoOfDisqualifiedAttempts from './NoOfDisqualifiedAttempts'
import NoOfMissionAttempt from './NoOfMissionsAttempt'





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  const totalRevenueLoading = false;
  const totalRevenueData = 100
  
  const handleRefresh = () => {
    
  }
  
  


  return (

    <>
    
      <Helmet><title> Quiz Wall | Dashboard </title></Helmet>
      <AppbarUI />
      <DrawerUI/>
      <Stack sx={{marginTop:2}}>
      <BodyWapperUI>

      <Grid container columnSpacing={1} rowSpacing={1}>
        <Grid item xs={4}> <NoOfMissionAttempt/></Grid>
        <Grid item xs={4}><NoOfQualifiedAttempts/></Grid>
        <Grid item xs={4}><NoOfDisqualifiedAttempts/></Grid>
        <Grid item xs={4}><NoOfParticipant/></Grid>
        <Grid item xs={4}><NoOfQuitAttempts/></Grid>
        <Grid item xs={4}><NoOfDropAttempts/></Grid>
        <Grid item xs={4}><NoOfExpectedImpressionsGenerated/></Grid>
        <Grid item xs={4}><ExpectedRevenue/></Grid>
        <Grid item xs={4}><ConversionRate/></Grid>
      </Grid>      
  
      </BodyWapperUI>
      </Stack>
    </>
  )
}


