import React, { useState,useEffect } from 'react'
import LoadingUI from '../../common/LoadingUI'
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';
import { noOfQualifiedAttemptsAction } from '../../redux/toolkit/dashboard/noOfQualifiedAttempts';
import { useDispatch, useSelector } from 'react-redux';
import { myProfileAction } from '../../redux/toolkit/profile/my-profile';



export default function NoOfQualifiedAttempts () {
   
    const [qualifiedAttempts, setQualifiedAttempts] = useState('')
    const dispatch = useDispatch();

    const dashboard = useSelector(state => state.qualifiedAttempts)
    const { message, data, status, loading } = dashboard
   
    const handleQualifiedRefresh  = async () => {
         dispatch(noOfQualifiedAttemptsAction()) 
              
    }
    useEffect (() => {
        dispatch(noOfQualifiedAttemptsAction())        
    }, [dispatch])
    return (
        <>
            <Card sx={{ p: 2,height:"150px" }}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Typography variant='h6'>Qualified Attempts</Typography>
                    <IconButton onClick={handleQualifiedRefresh}><CachedIcon /></IconButton>
                </Stack>
                {loading
                    ? <LoadingUI justifyContent='flex-start' />
                    : <Typography color='#071D45' variant='h3'>{data?.no_of_mission_qualified || "--"}</Typography>}

            </Card>
            {/* <Item>xs=4</Item> */}

        </>
    )
}


