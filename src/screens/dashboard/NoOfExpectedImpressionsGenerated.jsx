import React, { useState,useEffect } from 'react'
import LoadingUI from '../../common/LoadingUI'
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';
import { noOfExpectedImpressionsGeneratedAction } from '../../redux/toolkit/dashboard/noOfExpectedImpressionsGenerated';
import { useDispatch, useSelector } from 'react-redux';
import { myProfileAction } from '../../redux/toolkit/profile/my-profile';


export default function NoOfExpectedImpressionsGenerated () {
   
    const expectedImpressionLoding = false;
    const [expectedImpressions, setExpectedImpressions] = useState('')
    const dispatch = useDispatch();

    const dashboard = useSelector(state => state.myProfile)
    const { message, data, status, loading } = dashboard
   
    const handleExpectedImpressionsGeneratedRefresh  = async () => {
        dispatch(noOfExpectedImpressionsGeneratedAction()) 
              
    }
    useEffect(()=>{
        dispatch(noOfExpectedImpressionsGeneratedAction())
    },[dispatch])
    return (
        <>
            <Card sx={{ p: 2,height:"150px" }}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Typography variant='h6'>Expected Impressions </Typography>
                    <IconButton onClick={handleExpectedImpressionsGeneratedRefresh}><CachedIcon /></IconButton>  
                </Stack>
                {loading
                    ? <LoadingUI justifyContent='flex-start' />
                    : <Typography color='#071D45' variant='h3'>{data?.no_of_mission_dropped || "--"}</Typography>}

            </Card>
            {/* <Item>xs=4</Item> */}

        </>
    )
}



 

