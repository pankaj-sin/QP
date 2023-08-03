import React, { useState,useEffect } from 'react'
import LoadingUI from '../../common/LoadingUI'
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';
import { noOfParticipantAttemptsAction } from '../../redux/toolkit/dashboard/noOfParticipantAttempts'
import { useDispatch, useSelector } from 'react-redux';
import { myProfileAction } from '../../redux/toolkit/profile/my-profile';



export default function NoOfParticipant () {
    const participantAttemptLoding = false;
    const [participantAttempt, setParticipantAttempt] = useState('')
    const dispatch = useDispatch();

    const dashboard = useSelector(state => state.participantAttempts)
    const { message, data, status, loading } = dashboard
   
    const handleParticipantRefresh  = async () => {
         dispatch(noOfParticipantAttemptsAction()) 
             
    }
    

    useEffect (() => {
        dispatch(noOfParticipantAttemptsAction())        
    }, [dispatch])

    return (
        <>
            <Card sx={{ p: 2,height:"150px" }}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Typography variant='h6'>Participants Attempts</Typography>
                    <IconButton onClick={handleParticipantRefresh}><CachedIcon /></IconButton>
                </Stack>  
                {loading
                    ? <LoadingUI justifyContent='flex-start' />
                    : <Typography color='#071D45' variant='h3'>{data?.no_of_mission_participent || "--"}</Typography>}

            </Card>
        </>
    )
}

