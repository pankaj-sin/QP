import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import NotFoundImg from "../assets/img/pageNotFound.png"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function NotFoundPage() {

    const regsitrationVerified = JSON.parse(localStorage.getItem("ps_regsitration_verified"))

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', height: '100vh' }}>
            <Typography variant='h4' color='primary' sx={{ fontSize: '10rem' }}>404</Typography>
            <Stack spacing={1} alignItems='center' sx={{ mt: 2 }}>
                <Typography color='primary' variant='h4'>What on earth are you doing here!</Typography>
                <Typography variant='subtitle2'>Well, this is awkward, the page you were trying to view does not exist.</Typography>
                <Link style={{ textDecoration: 'none' }} to={regsitrationVerified ? "/" : '/'}><Button startIcon={<KeyboardBackspaceIcon />}>Back to home</Button></Link>
            </Stack>
        </Box >
    )
}
