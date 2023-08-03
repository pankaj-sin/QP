import React, { useState,useEffect } from 'react'
import LoadingUI from '../../common/LoadingUI'
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';
import { useDispatch, useSelector } from 'react-redux';
import { noOfDropAttemptsAction } from '../../redux/toolkit/dashboard/noOfDropAttempts';
import { myProfileAction } from '../../redux/toolkit/profile/my-profile';



export default function NoOfDropAttempts () {

    const dropAttemptLoding = false;
    const [dropAttempts, setDropAttempts] = useState('')
    const dispatch = useDispatch();

    const dashboard = useSelector(state => state.dropAttempts)
    const { message, data, status, loading } = dashboard
   
    const handleDropAttemptRefresh  = async () => {
         dispatch(noOfDropAttemptsAction()) 
               
    }

    useEffect(()=>{
        dispatch(noOfDropAttemptsAction())
    },[dispatch])
    return (
        <>
            <Card sx={{ p: 2,height:"150px" }}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Typography variant='h6'>Drop Attempts </Typography>
                    <IconButton onClick={handleDropAttemptRefresh}><CachedIcon /></IconButton>
                </Stack>
                {loading
                    ? <LoadingUI justifyContent='flex-start' />
                    : <Typography color='#071D45' variant='h3'>{data?.no_of_mission_dropped || "--"}</Typography>}

            </Card>
            {/* <Item>xs=4</Item> */}

        </>
    )
}



 

