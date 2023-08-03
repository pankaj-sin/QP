import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SnackBarUI from '../../common/SnackUI'
import { appRemoveRestoreAction } from '../../redux/toolkit/apps/remove-restore'
import { appListAction } from '../../redux/toolkit/apps/list'
import PropTypes from 'prop-types';
import { appActivateAction } from '../../redux/toolkit/apps/active';


export default function ActivateApp({ appId, state, setState }) {
    // state
    console.log("appId-->",appId)
    const dispatch = useDispatch()
    const delCat = useSelector(state => state.appRemoveRestore)
    const { status, message } = delCat

    const [snack, setSnack] = useState(false)

    // fn
    const handleClose = () => {
        setState(false)

    }

    const delCatHandle = async () => {
        console.log("appId",appId)
        await dispatch(appActivateAction({id:appId}))
        await dispatch(appListAction({ is_deleted: false }))
        setSnack(true)
        setState(false)
    }




    return (
        <>
            <Dialog open={state} onClose={handleClose}>
                <DialogTitle>Activate request !</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to Activate the selected item ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={delCatHandle} autoFocus> Agree</Button>
                    <Button onClick={handleClose}>Disagree</Button>
                </DialogActions>
            </Dialog>


            <SnackBarUI state={snack} setState={setSnack} status={status} message={message} />
        </>

    )
}


// DeleteSupport.propTypes = {
//     qns_id: PropTypes.string,
//     state: PropTypes.any,
//     setState: PropTypes.any
// };