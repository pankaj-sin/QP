import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
// import EditIcon from '@mui/icons-material/Edit';
import {Autocomplete,Button, Card, CircularProgress, Modal, TextField, Typography,Avatar,Badge } from '@mui/material';
import { Box, Stack} from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import SnackBarUI from '../../common/SnackUI';
import { addPaymentRequestAction } from '../../redux/toolkit/payments/add-payment-request';
import { paymentRequestListAction } from '../../redux/toolkit/payments/payment-request-lists';
import { bankListAction } from "../../redux/toolkit/accountDetail.jsx/banklist";





// schema
const catSchema = yup.object().shape({
    
    amount: yup.number().positive().nullable().required('Amount is required.').typeError('Amount must be a positive value'),
    bank_id:yup.string().required("Bank is Required")
    
}).required();

export default function CreateCategory({ state, setState }) {
    console.log("state-->",state)
    // state
    const { register,setValue,control, handleSubmit, formState: { errors }, reset,setError } = useForm({ resolver: yupResolver(catSchema) });

    const dispatch = useDispatch()
    const createCat = useSelector(state => state.addPayment)
    const { status, message, loading } = createCat

    const [snack, setSnack] = useState(false)
    const [bankId,setBankId]=useState()

    const bankList = useSelector((state) => state.listBank);
    const { status: bankStatus, data: bankData, loading: bankLoading } = bankList;

    console.log("bankData-->",bankData)

    const filteredObjects = bankData.filter(obj => obj?.is_verified !== 0)
    

    // fn

    useEffect(() => {
        dispatch(bankListAction());
      }, [dispatch]);


    const handleCategory = async (data) => {
        data.bank_id=bankId
        console.log("data-->",data)
        const createCategoryData = await dispatch(addPaymentRequestAction(data))
        if (createCategoryData?.payload?.status == 200) {
            await dispatch(paymentRequestListAction({ is_deleted: '' }))
        }
        setSnack(true)
        setState(false)
        reset()
    }

    const handleClose = function () {
        setState(false)
    }


    return (
        <>
            <Modal style={{display:"flex",alignItems:"center",justifyContent:"center"}} sx={{ overflow: 'scroll' }} open={state} onClose={handleClose}>
                <Box className='modal_box'>
                    <Card sx={{ width: 400, p: 5 }}>
                        <Typography variant='h5' sx={{ mb: 5 }} align='center'>Create Payment Request</Typography>
                        <form onSubmit={handleSubmit(handleCategory)}>
                            <Stack spacing={3}>
                                <TextField type='text' label="Amount" variant="outlined" placeholder='Amount' {...register('amount')} error={errors?.amount?.message} helperText={errors?.amount?.message} />
                                <Autocomplete
                  disablePortal
                //   multiple
                //   aria-multiline
                  options={filteredObjects}
                  getOptionLabel={(option) => option?.branch} // Specify the property to display as the option label
                  onChange={(event, value) => {
                    console.log("value in on change-->", value)
                    setBankId(value?._id)
                    setValue('bank_id', value?._id, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,

                    }
                    )
                  }}
                //   sx={{ width: 450 }}
                  renderInput={(params) => <TextField {...params} error={errors?.bank_id?.message} helperText={errors?.bank_id?.message} label="select Bank" />}
                />
                                
                                
                                <Stack direction='row' spacing={2}>
                                    <Button variant='contained' type='submit' disabled={loading}>{loading ? <CircularProgress /> : 'Add Request'}</Button>
                                    <Button variant='contained' color='error' onClick={handleClose}>Close</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Card>
                </Box>
            </Modal>
            <SnackBarUI state={snack} setState={setSnack} status={status} message={message} />
            <DevTool control={control} />
        </>
    )
}



CreateCategory.propTypes = {
    state: PropTypes.any,
    setState: PropTypes.any
};