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
// import SnackBarUI from '../../../comman/SnackBarUI';
// import { getSubCategoryAction } from '../../../redux/toolkit/sub-category/getSubCategory';
// import { createMissionAction } from '../../../redux/toolkit/mission/createMission';
// import { getMissionAction } from '../../../redux/toolkit/mission/getMission';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
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

const app_schema = yup.object().shape({
  // app_b_color: yup.string().required('App background color is required.'),s
  // app_name: yup.string().required('App Name is required.'),
  // mission_type: yup.string().nullable().required('mission type is required'),
  // noofquestion: yup.number().positive().nullable().required('No of Question is Required'),
  // time: yup.number().nullable().positive().required('Time is Required'),
  // icon: yup.string().required('Icon is Required'),
  // rewards:yup.number().positive().required('Time is Required'),
  // title: yup.string().required('title is Required'),
  // description: yup.string().required('description is Required'),
}).required();

export default function CreateBankDetail() {


  const { register,control,setError, watch, handleSubmit, formState: { errors }, reset, getValues, setValue } = useForm({
    resolver: yupResolver(app_schema), defaultValues: {}
});

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [category, setCategory] = useState([])
  const [accountType, setAccountType] = useState()
  const [appLogo,setAppLogo]=useState()
  const [currLogo,setCurrLogo]=useState()
  const appCategory = useSelector(state => state.appCategory)
    const { status,data,message,loading } = appCategory

    const appLists = useSelector(state => state.appLists)
    const { status:appStatus,data:appData,message:appMsg,loading:appLoad } = appLists

    console.log("appData------->",appData)
    const accTypeArr=['Individual', 'Business']
    

  useEffect(()=>{
    // dispatch(appListAction())
    dispatch(appCategoryAction())
  },[dispatch])

  
  console.log("data-->",data)
  // const categoryArr = data.data.map(({ cat_name }) => cat_name)
  const categoryArr = data

  console.log("categoryArr-->",categoryArr)
  
  // const categoryArr=[
  //   "hello",
  //   "world"
  // ]

  const platformArr=["Android","IOS","Web"]

  const handleAppSubmit=async(data)=>{
    console.log("hello world")
    console.log("data--->",data)
    console.log("data--->",category)
  const appStore=await dispatch(addBankAction({...data,account_type:accountType}))
  
    navigate('/account-manager')
  


  }

  const handleIconUpload = async (e) => {
        const formData = new FormData();

        formData.set("file", e.target.files[0]);

        let uploadedImg = await dispatch(uplodImageAction(formData))
        const imgStr = uploadedImg?.payload?.data?.url;
        console.log("imgStr-->", imgStr)
        setAppLogo(imgStr)
        setValue('app_logo', imgStr, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,

        })
      }

      const handleIconUpload2 = async (e) => {
        const formData = new FormData();

        formData.set("file", e.target.files[0]);

        let uploadedImg = await dispatch(uplodImageAction(formData))
        const imgStr = uploadedImg?.payload?.data?.url;
        console.log("imgStr-->", imgStr)
        setCurrLogo(imgStr)
        setValue('curr_logo', imgStr, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,

        })
      }

  return (
    <>
     <AppbarUI />
      <DrawerUI/>
      <BodyWapperUI>
      <Card sx={{ p: 5 }}>
        <Typography variant='h5' sx={{ mb: 5 }}>Create & Customize</Typography>
        <form onSubmit={handleSubmit(handleAppSubmit)}>

          <Stack spacing={3}>


            <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">

              
            <Autocomplete
                disablePortal
                options={accTypeArr}
                onChange={(event, value) => setAccountType(value)}
                sx={{ width: 450 }}
                renderInput={(params) => <TextField {...params} label="select Platform" />}
              /> 
              
          <TextField label="Holder Name" type='text' {...register('holder_name')} error={errors?.app_b_color?.message} helperText={errors?.app_b_color?.message} style={{ width: "450px" }} />

          <TextField label="Account Number" type='text' {...register('account_no')} error={errors?.app_name?.message} helperText={errors?.app_name?.message} style={{ width: "450px" }} />

              
          


            </Stack>

            <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">
              
            <TextField label="Business Name" {...register('bussiness_name')} style={{ width: "450px" }} />
            <TextField label="Country" {...register('country')} style={{ width: "450px" }} />


              



            </Stack>

            <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">



              <TextField label="Address" {...register('address')} style={{ width: "450px" }} />
                          
               <TextField label="Address 2" {...register('address2')} style={{ width: "450px" }} />
               <TextField label="city" {...register('city')} style={{ width: "450px" }} />

            </Stack>

        
             <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">



              <TextField label="Region" {...register('region')} style={{ width: "450px" }} />
              <TextField label="Postal code" {...register('postal_code')} style={{ width: "450px" }} />
                           
               <TextField label="Branch" {...register('branch')} style={{ width: "450px" }} />

            </Stack> 

             <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">



              <TextField label="IFSC code" {...register('ifcs_code')} style={{ width: "450px" }} />
              {/* <TextField label="Postal Code" {...register('postal_code')} style={{ width: "450px" }} /> */}
                           
               {/* <TextField label="City" {...register('city')} style={{ width: "450px" }} /> */}

            </Stack> 

            {/* <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">



              <TextField minRows={2} multiline={true} {...register('address')} label="Address" style={{ width: "450px" }} />
              <TextField minRows={2} multiline={true} {...register('address2')} label="Address2" style={{ width: "450px" }} />
                           

            </Stack> */}

            




            <Stack direction='row' spacing={2}>
              <Button variant='contained' type='submit'>Create App</Button> 
               {/* <Button variant='contained' color='error' onClick={handleClose}>Back</Button> */}
            </Stack>
          </Stack>
        </form>
      </Card>
      </BodyWapperUI>
      <DevTool control={control} />
    </>
  )
}
