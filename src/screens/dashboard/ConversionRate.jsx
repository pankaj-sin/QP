import React, { useState,useEffect } from 'react'
import LoadingUI from '../../common/LoadingUI'
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';
import { useDispatch, useSelector } from 'react-redux';
import { conversionRateAction } from '../../redux/toolkit/dashboard/conversionRate';
import { myProfileAction } from '../../redux/toolkit/profile/my-profile';


export default function ConversionRate () {
   
    const [conversionRates, setConversionRates] = useState('')
    const dispatch = useDispatch();

    const dashboard = useSelector(state => state.conversionRate)
    const { message, data, status, loading } = dashboard
   
    const handleConversionRateRefresh  = async () => {
        const missionData = await dispatch(conversionRateAction()) 
        setConversionRates(data)       
    }
    useEffect (() => {
        dispatch(conversionRateAction())        
    }, [dispatch])


    return (
        <>
            <Card sx={{ p: 2,height:"150px" }}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Typography variant='h6'>Conversion Rate </Typography>
                    <IconButton onClick={handleConversionRateRefresh}><CachedIcon /></IconButton>
                </Stack>
                
                {loading
                    ? <LoadingUI justifyContent='flex-start' />
                    : <Typography color='#071D45' variant='h3'>{data?.no_of_mission_disqualified || "--"}</Typography>}

            </Card>
            {/* <Item>xs=4</Item> */}

        </>
    )
}


