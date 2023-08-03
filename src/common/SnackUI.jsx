import React from 'react'
import { Alert, Snackbar } from '@mui/material'

export default function SnackUI({ state, setState, status, message }) {
    console.log("state",state,status)

    const handleClose = () => {
        setState(false)
    }
    setTimeout(()=>{
        handleClose()
    },3000)
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={state}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={status ==200 ? "success" : "error"} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
