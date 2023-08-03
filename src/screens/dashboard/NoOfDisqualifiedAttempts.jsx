import React, { useState,useEffect } from 'react'
import LoadingUI from '../../common/LoadingUI'
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';
import { noOfDisqualifiedAttemptsAction } from '../../redux/toolkit/dashboard/noOfDisqualifiedAttempts';
import { useDispatch, useSelector } from 'react-redux';
import { myProfileAction } from '../../redux/toolkit/profile/my-profile';


export default function NoOfDisqualifiedAttempts () {
  
    const disqualifiedAttemptLoding = false;
    const [disqualifiedAttempts, setDisqualifiedAttempts] = useState('')
    const dispatch = useDispatch();

    const dashboard = useSelector(state => state.disqualifiedAttempts)
    const { message, data, status, loading } = dashboard

    console.log("-------------------------->",data)
   
    const handleDisqualifiedRefresh  = async () => {
     dispatch(noOfDisqualifiedAttemptsAction()) 
             
    }

    useEffect(()=>{
        dispatch(noOfDisqualifiedAttemptsAction())
    },[dispatch])
    
    return (
        <>
            <Card sx={{ p: 2,height:"150px" }}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Typography variant='h6'>Disqualified Attempts</Typography>
                    <IconButton onClick={handleDisqualifiedRefresh}><CachedIcon /></IconButton>
                </Stack>
                {loading
                    ? <LoadingUI justifyContent='flex-start' />
                    : <Typography color='#071D45' variant='h3'>{data?.no_of_mission_disqualified||"--"}</Typography>}

            </Card>
            {/* <Item>xs=4</Item> */}

        </>
    )
}


