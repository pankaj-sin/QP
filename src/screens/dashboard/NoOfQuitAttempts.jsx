import React, { useState,useEffect } from 'react'
import LoadingUI from '../../common/LoadingUI'
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';
import { noOfQuitAttemptsAction } from '../../redux/toolkit/dashboard/noOfQuitAttempts';
import { useDispatch, useSelector } from 'react-redux';
import { myProfileAction } from '../../redux/toolkit/profile/my-profile';



export default function NoOfQuitAttempts () {
  
    const [quitAttempts, setQuitAttempts] = useState('')
    const dispatch = useDispatch();

    const dashbaord = useSelector(state => state.quitAttempts)
    const { message, data, status, loading } = dashbaord
   
    const handleQuitAttemptRefresh  = async () => {
        dispatch(noOfQuitAttemptsAction()) 
              
    }

    useEffect (() => {
        dispatch(noOfQuitAttemptsAction())        
    }, [dispatch])
    return (
        <>
            <Card sx={{ p: 2,height:"150px" }}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Typography variant='h6'>Quit Attempts</Typography>
                    <IconButton onClick={handleQuitAttemptRefresh}><CachedIcon /></IconButton>
                </Stack>
                {loading
                    ? <LoadingUI justifyContent='flex-start' />
                    : <Typography color='#071D45' variant='h3'>{data?.no_of_mission_quit || "--"}</Typography>}

            </Card>
            {/* <Item>xs=4</Item> */}

        </>
    )
}



 

