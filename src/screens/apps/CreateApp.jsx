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
import { appStoreAction } from '../../redux/toolkit/apps/store';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const app_schema = yup.object().shape({
  categories: yup.array().min(1).required('categories should not be empty'),
  platform: yup.string().required('Platform is required.'),
  app_color: yup.number().required('App Theme is required.'),
  app_name: yup.string().required('App Name is required.'),
  app_logo: yup.string().required('App logo is required.'),
  currency_name: yup.string().required('Currency Name is required.'),
  currency_logo: yup.string().required('Currency Logo is required.'),
  exchange_rate: yup.number().required('Exchange Rate is required.'),
  postback_url: yup.string().required('Exchange Rate is required.'),

}).required();

export default function CreateApp() {


  const { register, control, setError, watch, handleSubmit, formState: { errors }, reset, getValues, setValue } = useForm({
    resolver: yupResolver(app_schema), defaultValues: {}
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [category, setCategory] = useState([])
  const [platform, setPlatform] = useState()
  const [appLogo, setAppLogo] = useState()
  const [currLogo, setCurrLogo] = useState()
  const [theme, setTheme] = useState()
  const [snakbar, setSnakbar] = useState(false)
  const appCategory = useSelector(state => state.appCategory)
  const { status, data: appCategoryData, message, loading } = appCategory

  const appLists = useSelector(state => state.appLists)
  const { status: appStatus, data: appData, message: appMsg, loading: appLoad } = appLists

  const appStore = useSelector(state => state.appStore)
  const { status: Status, data: Data, message: Msg, loading: Load } = appStore

  console.log("appData------->", appData)



  useEffect(() => {
    // dispatch(appListAction())
    dispatch(appCategoryAction())
  }, [dispatch])


  // console.log("data-->",data)
  // const categoryArr = data.data.map(({ cat_name }) => cat_name)
  const categoryArr = appCategoryData

  console.log("categoryArr-->", categoryArr)

  // const categoryArr=[
  //   "hello",
  //   "world"
  // ]

  const platformArr = ["Android", "IOS", "Web"]

  const handleAppSubmit = async (data) => {
    console.log("hello world")
    console.log("data--->", data)
    console.log("category--->", category)
    console.log("theme--->", theme)
    const appStore = await dispatch(appStoreAction({ ...data, categories: category, app_logo: appLogo, currency_logo: currLogo, platform: platform, app_color: theme }))

    setSnakbar(true)

    setTimeout(() => {

      navigate('/apps')
    }, 2000)




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
    setValue('currency_logo', imgStr, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,

    })
  }

  const handleChange = async (e) => {
    setTheme(e.target.value);
    setValue('app_color', e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,

    })
  }

  return (
    <>
      <AppbarUI />
      <DrawerUI />
      <BodyWapperUI>
        <Card sx={{ p: 5 }}>
          <Typography variant='h5' sx={{ mb: 5 }}>Create App</Typography>
          <form onSubmit={handleSubmit(handleAppSubmit)}>

            <Stack spacing={3}>

            <Autocomplete
                  disablePortal
                  multiple
                  aria-multiline
                  options={categoryArr}
                  getOptionLabel={(option) => option.cat_name} // Specify the property to display as the option label
                  onChange={(event, value) => {
                    console.log("value in on change-->", value)
                    setCategory(value.map(item => item))
                    setValue('categories', value.map(item => item), {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,

                    })
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} error={errors?.categories?.message} helperText={errors?.categories?.message} label="select Categories" />}
                />

              <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">

                <TextField label="App Name" type='text' {...register('app_name')} error={errors?.app_name?.message} helperText={errors?.app_name?.message} style={{ width: "50%" }} />



                {/* <TextField label="Color Theme" type='color' {...register('app_color')} error={errors?.app_b_color?.message} helperText={errors?.app_b_color?.message} style={{ width: "450px" }} /> */}

                <FormControl style={{ width: "50%" }} error={!!errors?.app_color}>
                  <InputLabel id="demo-simple-select-label" >Color Theme</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={theme}
                    label="App Theme"
                    onChange={handleChange}
                    error={errors?.app_color?.message} helperText={errors?.app_color?.message}

                  >
                    <MenuItem style={{ background: "#22819B" }} value={1}>Theme 1</MenuItem>
                    <MenuItem style={{ background: "#FFCB9B" }} value={2}>Theme 2</MenuItem>
                    <MenuItem style={{ background: "#BEDEBE" }} value={3}>Theme 3</MenuItem>
                  </Select>
                  {errors?.app_color && <FormHelperText>{errors.app_color.message}</FormHelperText>}
                </FormControl>





              </Stack>

              <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">
                <TextField InputLabelProps={{ shrink: true }} label="App logo" type="file" id='app_logo' onChange={handleIconUpload} error={errors?.app_logo?.message} helperText={errors?.app_logo?.message} style={{ width: "50%" }} />
                <Avatar alt="App logo" src={appLogo} />
                {/* <TextField label="Currency Name" {...register('currency_name')} error={errors?.currency_name?.message} helperText={errors?.currency_name?.message} style={{ width: "450px" }} /> */}


                <TextField InputLabelProps={{ shrink: true }} error={errors?.currency_logo?.message} helperText={errors?.currency_logo?.message} label="Currency Logo" type="file" id='curr_logo' onChange={handleIconUpload2} style={{ width: "50%" }} />
                <Avatar alt="App logo" src={currLogo} />



              </Stack>

              <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">



                <TextField label="1Rs=" {...register('exchange_rate')} error={errors?.exchange_rate?.message} helperText={errors?.exchange_rate?.message} style={{ width: "50%" }} />
                <Autocomplete
                  disablePortal
                  options={platformArr}
                  onChange={(event, value) => {
                    setPlatform(value)
                    setValue('platform', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,

                    })
                  }}

                  sx={{ width: '50%' }}

                  renderInput={(params) => <TextField {...params} error={errors?.platform?.message} helperText={errors?.platform?.message}
                    label="select Platform" />}
                />
                {/* <TextField label="Reward" style={{ width: "450px" }} /> */}
                {/* <TextField {...register('postback_url')} error={errors?.postback_url?.message} helperText={errors?.postback_url?.message} label="Post Back Url" style={{ width: "450px" }} /> */}

              </Stack>

              <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">


              <TextField label="Currency Name" {...register('currency_name')} error={errors?.currency_name?.message} helperText={errors?.currency_name?.message} style={{ width: "50%" }} />



{/* <TextField label="Reward" style={{ width: "450px" }} /> */}
<TextField {...register('postback_url')} error={errors?.postback_url?.message} helperText={errors?.postback_url?.message} label="Post Back Url" style={{ width: "50%" }} />

</Stack>


              {/* <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">



              <TextField label="Business Name" {...register('bussiness_name')} style={{ width: "450px" }} />
              <TextField label="Country" {...register('country')} style={{ width: "450px" }} />
                           
               <TextField label="City" {...register('city')} style={{ width: "450px" }} />

              </Stack> */}

              {/* <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">



              <TextField label="Region" {...register('region')} style={{ width: "450px" }} />
              <TextField label="Postal Code" {...register('postal_code')} style={{ width: "450px" }} />
                           
               <TextField label="City" {...register('city')} style={{ width: "450px" }} />

            </Stack> */}

              {/* <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">



              <TextField minRows={2} multiline={true} {...register('address')} label="Address" style={{ width: "450px" }} />
              <TextField minRows={2} multiline={true} {...register('address2')} label="Address2" style={{ width: "450px" }} />
                           

            </Stack> */}

              {/* <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">




            </Stack> */}




              <Stack direction='row' spacing={2}>
                <Button variant='contained' type='submit'>Create App</Button>
                {/* <Button variant='contained' color='error' onClick={handleClose}>Back</Button> */}
              </Stack>
            </Stack>
          </form>
        </Card>
      </BodyWapperUI>
      {snakbar && <SnackBarUI state={snakbar} setState={setSnakbar} status={Status} message={Msg} />}
      <DevTool control={control} />
    </>
  )
}
