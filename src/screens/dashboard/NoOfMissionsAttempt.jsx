import React, { useEffect, useState } from 'react'
import LoadingUI from '../../common/LoadingUI'
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';
import { useDispatch, useSelector } from 'react-redux';
import { noOfAttemptMissionAction } from '../../redux/toolkit/dashboard/noOfAttemptMissions'
import { myProfileAction } from '../../redux/toolkit/profile/my-profile';



export default function NoOfMissionAttempt() {
    const [missionAttempts, setMissionAttempts] = useState('')
    const dispatch = useDispatch();

    const dashboard = useSelector(state => state.attemptMission)
    const { message, data, status, loading } = dashboard
   
    
   
    const handleMissionAttemptRefresh  = async () => {
         dispatch(noOfAttemptMissionAction()) 
              
    }
    
    // useEffect
    useEffect (() => {
        dispatch(noOfAttemptMissionAction())        
    }, [dispatch])
    
    


    return (
        <>
        {console.log("missionAttempts-->",missionAttempts)}
            <Card sx={{ p: 2,height:"150px" }}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Typography variant='h6'>Missions Attempts</Typography>
                    <IconButton onClick={handleMissionAttemptRefresh}><CachedIcon /></IconButton>
                </Stack>
                {loading
                    ? <LoadingUI justifyContent='flex-start' />
                    : <Typography color='#071D45' variant='h3'>{ data?.no_of_mission_attempted ? data?.no_of_mission_attempted : '--'}</Typography>}

            </Card>
        </>
    )
}

