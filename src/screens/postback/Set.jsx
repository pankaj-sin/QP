import React, { useEffect, useState } from 'react'
import AppbarUI from '../../common/AppbarUI'
import { Helmet } from 'react-helmet'
import BodyWapperUI from '../../common/BodyWapperUI'
import DrawerUI from '../../common/DrawerUI'
import { postbackLogAction } from '../../redux/toolkit/postback/postbackLog';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'


// submit schema
const setPostback = yup.object({
  postback_url: yup.string().required(),
}).required();

console.log("setPostback", setPostback);


export default function SetPostback() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [postback_url, setPostbackUrl] = useState("")
  const [snack, setSnack] = useState(false)

  const { register, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(setPostback), defaultValues: {} });


  const setPostbackSelector = useSelector(state => state.postbackLog)
  const { status, message, loading } = setPostbackSelector

  const myProfileSelector = useSelector(state => state.myProfile)
  const { data:profileData} = myProfileSelector
 
  console.log("profileData", profileData)
 

  const handlesetPostbackSubmit = async (data) => {
    console.log("data-->",data)
    const postbackData = await dispatch(postbackLogAction(data))
    console.log("postbackData", postbackData)
    if (postbackData?.payload?.status == 200) {
      navigate("")
    }
    setSnack(true)
  }

  // useEffect(() => {
  //   let defaultValues = {}
  //   defaultValues.postback_url = profileData?.postback_url
  //   reset(defaultValues)
  // }, [profileData])


  return (
    <>

        <Helmet><title> Quiz Wall | Postback </title></Helmet>
        <AppbarUI />
        <DrawerUI/>
        <BodyWapperUI>    
              <form onSubmit={handleSubmit(handlesetPostbackSubmit)}>
                <Stack spacing={1}>
                    <Typography variant='h6'>Add Postback here</Typography>
                    {/* <Stack direction={'row'} alignItems={'center'}>
                        <Typography variant='subtitle2'>You can add postback from here, if you are facing any difficulty to generate a postback, please go to document section and do necessary steps.</Typography>
                    </Stack> */}
                    <Box>
                        {/* <TextField fullWidth sx={{ flexGrow: 1 }} defaultValue={profileData?.postback_url} variant="outlined"  {...register('postback_url')} helperText={errors?.postback_url?.message} error={errors?.postback_url?.message} /> */}
                        <Button onClick={()=>{navigate("/apps")}} sx={{ my: 2 }} disabled={loading} variant='contained' type='submit'>{loading ? <CircularProgress /> : 'Add Postback'}</Button>
                    </Box>
                </Stack>
              </form>   
        </BodyWapperUI>        

    </>
  )
}
