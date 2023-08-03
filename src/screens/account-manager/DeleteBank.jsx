import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SnackBarUI from '../../comman/SnackBarUI'
import { deleteSupportDataAction } from '../../redux/toolkit/support/deleteData'
import { supportDataAction } from '../../redux/toolkit/support/list';
import PropTypes from 'prop-types';

export default function DeleteBank({ cat_id, state, setState }) {
    // state
    const dispatch = useDispatch()
    const delCat = useSelector(state => state.deleteQuestionAnswer)
    const { status, message } = delCat

    const [snack, setSnack] = useState(false)

    // fn
    const handleClose = () => {
        setState(false)

    }

    const delCatHandle = async () => {
        console.log("cat_id",cat_id)
        await dispatch(deleteSupportDataAction({id:cat_id}))
        await dispatch(supportDataAction({ is_deleted: false }))
        setSnack(true)
        setState(false)
    }




    return (
        <>
            <Dialog open={state} onClose={handleClose}>
                <DialogTitle>Deleting request !</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the selected item ?
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


DeleteSupport.propTypes = {
    qns_id: PropTypes.string,
    state: PropTypes.any,
    setState: PropTypes.any
};