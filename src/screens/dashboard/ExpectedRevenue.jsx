import React, { useState,useEffect } from 'react'
import LoadingUI from '../../common/LoadingUI'
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';
import { useDispatch, useSelector } from 'react-redux';
import { expectedRevenueAction } from '../../redux/toolkit/dashboard/expectedRevenue';
import { myProfileAction } from '../../redux/toolkit/profile/my-profile';



export default function ExpectedRevenue () {

    const [expectedRevenues, setExpectedRevenues] = useState('')
    const dispatch = useDispatch();

    const dashboard = useSelector(state => state.expectedRevenue)
    const { message, data, status, loading } = dashboard
   
    const handleExpectedRevenueRefresh  = async () => {
        dispatch(expectedRevenueAction()) 
              
    }

    useEffect (() => {
        dispatch(expectedRevenueAction())        
    }, [dispatch])

    return (
        <>
            <Card sx={{ p: 2,height:"150px" }}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Typography variant='h6'>Expected Revenue</Typography>
                    <IconButton onClick={handleExpectedRevenueRefresh}><CachedIcon /></IconButton>
                </Stack>
                {loading
                    ? <LoadingUI justifyContent='flex-start' />
                    : <Typography color='#071D45' variant='h3'>{data?.no_of_mission_disqualified || "--"}</Typography>}

            </Card>
            {/* <Item>xs=4</Item> */}

        </>
    )
}


