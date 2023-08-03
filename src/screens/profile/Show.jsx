import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Autocomplete, Box, Breadcrumbs, Button, Card, FormHelperText, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, Link, Paper, Radio, RadioGroup, Slider, TextField, Typography } from '@mui/material';
import BodyWapperUI from '../../common/BodyWapperUI'
import AppbarUI from '../../common/AppbarUI'
import DrawerUI from '../../common/DrawerUI'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { uplodImageAction } from '../../redux/toolkit/image/uploadImage';
import Avatar from '@mui/material/Avatar'
import { Stack } from '@mui/system';
import { myProfileAction } from '../../redux/toolkit/profile/my-profile';
import { editProfileAction } from '../../redux/toolkit/profile/edit';
import SnackUI from '../../common/SnackUI';





const profile_schema = yup.object().shape({
  name:yup.string().required('Name is Required'),
  profile_img: yup.string().required('Profile Image is Required.'),
  tax_id: yup.string().required('Tax Id is Required'),
  bio: yup.string().required('Bio is Required'),
  street_name: yup.string().required('Street Name is Required'),
  street_no: yup.string().required('Street No is Required'),
  city: yup.string().required('City is Required'),
  country: yup.string().required('Country is Required'),
  
}).required();

export default function Show() {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const [profileImg,setProfileImg]=useState()

  const myProfileSelector = useSelector(state => state.myProfile)
  const { data:profileData} = myProfileSelector
  const [showPopup,setShowPopup]=useState(false)

  const editProfile = useSelector(state => state.editProfile)
  const { data,status,message} = editProfile

  const { register,control,setError, watch, handleSubmit, formState: { errors }, reset, getValues, setValue } = useForm({
    resolver: yupResolver(profile_schema), defaultValues: {}
});

useEffect(()=>{
  let defaultValues = {};
  defaultValues.name =profileData.name;
  defaultValues.tax_id =profileData.tax_id;
  defaultValues.bio =profileData.bio;
  defaultValues.address =profileData.address;
  defaultValues.street_name =profileData.street_name;
  defaultValues.street_no =profileData.street_no;
  defaultValues.country =profileData.country;
  defaultValues.city =profileData.city;
  defaultValues.profile_img =profileData.profile_img;
  // setPlatformVal(appData.platform)
      setProfileImg(profileData.profile_img)
      reset({ ...defaultValues });
},[profileData,dispatch])

const handleIconUpload = async (e) => {
  const formData = new FormData();

  formData.set("file", e.target.files[0]);

  let uploadedImg = await dispatch(uplodImageAction(formData))
  const imgStr = uploadedImg?.payload?.data?.url;
  console.log("imgStr-->", imgStr)
  setProfileImg(imgStr)
  setValue('profile_img', imgStr, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,

  })
}

const handleAppSubmit=async(data)=>{
  console.log("hello world")
  console.log("data--->",data)
const appStore=await dispatch(editProfileAction({profile_img:profileImg,...data}))
setShowPopup(true)
dispatch(myProfileAction())
navigate('/profile')



}

  return (
    <>
    <Helmet><title> Quiz Wall | Postback </title></Helmet>
    <AppbarUI />
    <DrawerUI/>
    <BodyWapperUI>
    <Card sx={{ p: 5 }}>
        <Box> 
          {/* <Stack>
            <TextField type='text' value={profileData?.name}  variant='outlined' placeholder='Name' label='Name' />
            <TextField type='text' value={profileData?.name}  variant='outlined' placeholder='Email' label='Email' />
            <TextField type='text' value={profileData?.name} Variant='outlined' placeholder='Password' label='Password' />
            <Button onClick={ () => navigate("/profile/edit")} variant='contained'>Edit Profile</Button>
          </Stack> */}

<Typography variant='h5' sx={{ mb: 5 }}>Customize Profile</Typography>
        <form onSubmit={handleSubmit(handleAppSubmit)}>

        <Stack spacing={3}>


           <Stack direction="row" spacing={10} justifyContent="center" alignItems="center"> 


           <TextField label="Name"  InputLabelProps={{ shrink: true }}  {...register('name')} error={errors?.name?.message} helperText={errors?.name?.message} style={{ width: "450px" }} />

           <TextField InputLabelProps={{ shrink: true }} label="Profile img"  type="file" id='profile_img' onChange={handleIconUpload} error={errors?.profile_img?.message} helperText={errors?.profile_img?.message} style={{ width: "250px" }} />
              <Avatar alt="Dp" src={profileImg}/>             
                           
               <TextField label="bio"  InputLabelProps={{ shrink: true }}  {...register('bio')} error={errors?.bio?.message} helperText={errors?.bio?.message} style={{ width: "450px" }} />

            </Stack> 

            <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">
               <TextField label="Tax id"  InputLabelProps={{ shrink: true }} {...register('tax_id')} error={errors?.tax_id?.message} helperText={errors?.tax_id?.message} style={{ width: "450px" }} />



              {/* <TextField label="Address" {...register('address')} style={{ width: "450px" }} /> */}
              <TextField label="Street name"  InputLabelProps={{ shrink: true }} {...register('street_name')} error={errors?.street_name?.message} helperText={errors?.street_name?.message} style={{ width: "450px" }} />
                           
               <TextField label="Street no"  InputLabelProps={{ shrink: true }} {...register('street_no')} error={errors?.street_no?.message} helperText={errors?.street_no?.message} style={{ width: "450px" }} />

            </Stack> 

             <Stack direction="row" spacing={10}>



              <TextField  {...register('city')}  InputLabelProps={{ shrink: true }} label="City" error={errors?.city?.message} helperText={errors?.city?.message} style={{ width: "275px" }} />
              <TextField  {...register('country')}  InputLabelProps={{ shrink: true }} label="Country" error={errors?.country?.message} helperText={errors?.country?.message} style={{ width: "275px" }} />
                           

            </Stack> 

            <Stack direction='row' spacing={2}>
              <Button variant='contained' type='submit'>Update profile</Button> 
               {/* <Button variant='contained' color='error' onClick={handleClose}>Back</Button> */}
            </Stack>
        </Stack> 
            </form>
        </Box>
      </Card>

          <SnackUI state={showPopup} setState={setShowPopup} status={status} message={message}/>
    </BodyWapperUI>
    </>
  )
}
