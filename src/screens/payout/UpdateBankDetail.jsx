import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Breadcrumbs, Button, Card, FormHelperText, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, Link, Paper, Radio, RadioGroup, Slider, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ChromePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import Avatar from '@mui/material/Avatar'
import { SketchPicker } from 'react-color';
import SnackBarUI from '../../common/SnackUI';
// import { getSubCategoryAction } from '../../../redux/toolkit/sub-category/getSubCategory';
// import { createMissionAction } from '../../../redux/toolkit/mission/createMission';
// import { getMissionAction } from '../../../redux/toolkit/mission/getMission';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import LoadingUI from '../../../comman/LoadingUI';
// import NoDataFound from '../../../comman/NoDataFound';
// import Appbar from '../../../components/Appbar';
// import DrawerUI from '../../../components/Drawer';
// import Body from '../../../layout/Body';
// import { getCategoryAction } from '../../../redux/toolkit/category/getCategory';
// import { getMissionQnsAction } from '../../../redux/toolkit/mission/getMissionQns';
// import { useStyles } from '../../../theme/theme';
import { uplodImageAction } from '../../redux/toolkit/image/uploadImage';
import { DevTool } from '@hookform/devtools';
import { appCategoryAction } from '../../redux/toolkit/apps/categories';
import { appEditAction } from '../../redux/toolkit/apps/edit';
import { appListAction } from '../../redux/toolkit/apps/list';
import AppbarUI from '../../common/AppbarUI'
import BodyWapperUI from '../../common/BodyWapperUI'
import DrawerUI from '../../common/DrawerUI'
import { addBankAction } from '../../redux/toolkit/accountDetail.jsx/addbank';
import { singleBankAction } from '../../redux/toolkit/accountDetail.jsx/singlebank';
import { editBankAction } from '../../redux/toolkit/accountDetail.jsx/editbank';

const app_schema = yup.object().shape({
  holder_name: yup.string().required('Holder Name is required.'),
  account_no: yup.number().typeError('Account Number must be a number').required('Account Number is required.').nullable(),
  account_type: yup.string().required('Account type is required'),
  bussiness_name: yup.string().required('Business Name is Required'),
  country: yup.string().required('Country is Required'),
  address: yup.string().required('address is Required'),
  address2: yup.string().required('address2 is Required'),
  city: yup.string().required('city is Required'),
  region: yup.string().required('Region is Required'),
  postal_code:yup.number().typeError('Postal code must be a number').required('Postal code is Required').nullable(),
  branch: yup.string().required('Branch is Required'),
  ifcs_code: yup.string().required('IFSC Code is Required'),
}).required();

export default function UpdateBankDetail() {


  const { register,control,setError, watch, handleSubmit, formState: { errors }, reset, getValues, setValue } = useForm({
    resolver: yupResolver(app_schema), defaultValues: {}
});

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [searchParams] = useSearchParams()
  const bank_id = searchParams.get('bank_id')
  console.log("bank_id-->",bank_id)
  const [category, setCategory] = useState([])
  const [accountType, setAccountType] = useState()
  const [snakbar,setSnakeBar]=useState(false)
  
  const appCategory = useSelector(state => state.editBank)
    const { status,data,message,loading } = appCategory

    const singleBank = useSelector(state => state.singleBank)
    const { status:appStatus,data:appData,message:appMsg,loading:appLoad } = singleBank

    console.log("appData------->",appData)
    const accTypeArr=['Individual', 'Business']
    

    useEffect(()=>{
      dispatch(singleBankAction(bank_id))
      
    },[dispatch])

    useEffect(()=>{
        let defaultValues = {};
        defaultValues.account_no =appData.account_no;
        defaultValues.account_type=appData.account_type;
        defaultValues.address =appData.address;
        defaultValues.address2 =appData.address2;
        defaultValues.branch =appData.branch;
        defaultValues.city =appData.city;
        defaultValues.country =appData.country;
        defaultValues.holder_name =appData.holder_name;
        defaultValues.postal_code =appData.postal_code;
        defaultValues.region =appData.region;
        defaultValues.bussiness_name =appData.bussiness_name;
        defaultValues.ifcs_code =appData.ifcs_code;
        setAccountType(appData.account_type)
        // setPlatformVal(appData.platform)
            
            reset({ ...defaultValues });
      },[appData])

  
 

  


  const handleAppSubmit=async(data)=>{
    console.log("hello world")
    console.log("data--->",data)
    console.log("accountType--->",accountType)
  const appStore=await dispatch(editBankAction({bank_id:bank_id,...data,account_type:accountType}))

  setSnakeBar(true)
  setTimeout(()=>{

    navigate('/payouts')
  },1000)
  


  }

  

  return (
    <>
     <AppbarUI />
      <DrawerUI/>
      <BodyWapperUI>
      <Card sx={{ p: 5 }}>
        <Typography variant='h5' sx={{ mb: 5 }}>Update Bank Detail</Typography>
        <form onSubmit={handleSubmit(handleAppSubmit)}>

          <Stack spacing={3}>


            <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">

              
            <Autocomplete
                disablePortal
                options={accTypeArr}
                defaultValue={appData.account_type}
                onChange={(event,value) => {
                  console.log("event",event.target.value,value)

                  setAccountType(value);
                  setValue('account_type',value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
        
                })}
                
              }
              onInputChange={(event, newInputValue) => {
                setAccountType(newInputValue);
              }}
                sx={{ width: 450 }}
                InputLabelProps={{ shrink: true }}
                {...register('account_type')}
                renderInput={(params) => <TextField {...params} label="" error={errors?.account_type?.message} helperText={errors?.account_type?.message}/>}
              /> 
              
          <TextField label="Holder Name" InputLabelProps={{ shrink: true }} type='text' {...register('holder_name')} error={errors?.holder_name?.message} helperText={errors?.holder_name?.message} style={{ width: "450px" }} />

          <TextField label="Account Number" InputLabelProps={{ shrink: true }} type='text' {...register('account_no')} error={errors?.account_no?.message} helperText={errors?.account_no?.message} style={{ width: "450px" }} />

              
          


            </Stack>

            <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">
              
            <TextField label="IFSC code" InputLabelProps={{ shrink: true }} {...register('ifcs_code')} error={errors?.ifcs_code?.message} helperText={errors?.ifcs_code?.message} style={{ width: "450px" }} /> 


            <TextField label="Business Name" InputLabelProps={{ shrink: true }} {...register('bussiness_name')} error={errors?.bussiness_name?.message} helperText={errors?.bussiness_name?.message} style={{ width: "450px" }} />
            <TextField label="Country" InputLabelProps={{ shrink: true }} {...register('country')} error={errors?.country?.message} helperText={errors?.country?.message}  style={{ width: "450px" }} />


              



            </Stack>

            <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">



              <TextField label="Address" InputLabelProps={{ shrink: true }} {...register('address')} error={errors?.address?.message} helperText={errors?.address?.message} style={{ width: "450px" }} />
                          
               <TextField label="Address 2" InputLabelProps={{ shrink: true }} {...register('address2')} error={errors?.address2?.message} helperText={errors?.address2?.message} style={{ width: "450px" }} />
               <TextField label="city" InputLabelProps={{ shrink: true }} {...register('city')} error={errors?.city?.message} helperText={errors?.city?.message} style={{ width: "450px" }} />

            </Stack>

        
             <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">



              <TextField label="Region" InputLabelProps={{ shrink: true }} {...register('region')} error={errors?.region?.message} helperText={errors?.region?.message} style={{ width: "450px" }} />
              <TextField label="Postal code" InputLabelProps={{ shrink: true }}  {...register('postal_code')} error={errors?.postal_code?.message} helperText={errors?.postal_code?.message} style={{ width: "450px" }} />
                           
               <TextField label="Branch" InputLabelProps={{ shrink: true }} {...register('branch')}  error={errors?.branch?.message} helperText={errors?.branch?.message} style={{ width: "450px" }} />

            </Stack> 

             {/* <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">




            </Stack>  */}

            {/* <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">



              <TextField minRows={2} multiline={true} {...register('address')} label="Address" style={{ width: "450px" }} />
              <TextField minRows={2} multiline={true} {...register('address2')} label="Address2" style={{ width: "450px" }} />
                           

            </Stack> */}

            




            <Stack direction='row' spacing={2}>
              <Button variant='contained' type='submit'>Update Bank Detail</Button> 
               {/* <Button variant='contained' color='error' onClick={handleClose}>Back</Button> */}
            </Stack>
          </Stack>
        </form>
      </Card>
      </BodyWapperUI>
      {snakbar && <SnackBarUI state={snakbar} setState={setSnakeBar} status={status} message={message} />}
      <DevTool control={control} />
    </>
  )
}
