import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Card,
  FormHelperText,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { ChromePicker } from "react-color";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import { SketchPicker } from "react-color";
import SnackBarUI from "../../common/SnackUI";
// import { getSubCategoryAction } from '../../../redux/toolkit/sub-category/getSubCategory';
// import { createMissionAction } from '../../../redux/toolkit/mission/createMission';
// import { getMissionAction } from '../../../redux/toolkit/mission/getMission';
import PropTypes from "prop-types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
// import LoadingUI from '../../../comman/LoadingUI';
// import NoDataFound from '../../../comman/NoDataFound';
// import Appbar from '../../../components/Appbar';
// import DrawerUI from '../../../components/Drawer';
// import Body from '../../../layout/Body';
// import { getCategoryAction } from '../../../redux/toolkit/category/getCategory';
// import { getMissionQnsAction } from '../../../redux/toolkit/mission/getMissionQns';
// import { useStyles } from '../../../theme/theme';
import { uplodImageAction } from "../../redux/toolkit/image/uploadImage";
import { DevTool } from "@hookform/devtools";
import { appCategoryAction } from "../../redux/toolkit/apps/categories";
import { appEditAction } from "../../redux/toolkit/apps/edit";
import { appListAction } from "../../redux/toolkit/apps/list";
import AppbarUI from "../../common/AppbarUI";
import BodyWapperUI from "../../common/BodyWapperUI";
import DrawerUI from "../../common/DrawerUI";
import { appStoreAction } from "../../redux/toolkit/apps/store";
import { appDetailAction } from "../../redux/toolkit/apps/detail";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const app_schema = yup
  .object()
  .shape({
    // categories:yup.array().min(1).required('categories should not be empty'),
    platform: yup.string().required("Platform is required."),
    // app_color: yup.number().required('App Theme is required.'),
    app_name: yup.string().required("App Name is required."),
    app_logo: yup.string().required("App logo is required."),
    currency_name: yup.string().required("Currency Name is required."),
    currency_logo: yup.string().required("Currency Logo is required."),
    exchange_rate: yup.number().required("Exchange Rate is required."),
    postback_url: yup.string().required("Exchange Rate is required."),
  })
  .required();

export default function UpdateApp() {
  const {
    register,
    control,
    setError,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(app_schema),
    defaultValues: {},
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const app_id = searchParams.get("app_id");
  console.log("app_id-->", app_id);
  const [category, setCategory] = useState([]);
  const [platform, setPlatform] = useState();
  const [appLogo, setAppLogo] = useState();
  const [currLogo, setCurrLogo] = useState();
  const [snakbar, setSnakbar] = useState(false);
  const [theme, setTheme] = useState(null);

  //   const [platformVal,setPlatformVal]=useState()
  const appCategory = useSelector((state) => state.appCategory);
  const { status, data, message, loading } = appCategory;

  const appDetail = useSelector((state) => state.appDetail);
  const {
    status: appDetailStatus,
    data: appData,
    message: appMsg,
    loading: appLoad,
  } = appDetail;

  const appEdit = useSelector((state) => state.appEdit);
  const { status: Status, data: Data, message: Msg, loading: Load } = appEdit;

  console.log("appData------->", appData);
  console.log("categorydata------->", data);

  let categoriesId = appData.categories;

  console.log("CategoriesId", categoriesId);

  const newArray = appCategory.data
    .filter((obj) => categoriesId?.includes(obj?._id))
    .map((obj) => obj.cat_name);

  console.log(newArray);

  useEffect(() => {
    dispatch(appCategoryAction());
    dispatch(appDetailAction(app_id));
    console.log("appData", appData);
  }, [dispatch]);

  useEffect(() => {
    let defaultValues = {};
    defaultValues.app_name = appData.app_name;
    defaultValues.currency_name = appData.currency_name;
    defaultValues.exchange_rate = appData.exchange_rate;
    defaultValues.postback_url = appData.postback_url;
    // defaultValues.app_color =appData.app_b_color;
    defaultValues.platform = appData.platform;
    // setPlatformVal(appData.platform)

    setAppLogo(appData.app_logo);
    setValue("app_logo", appData.app_logo, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setTheme((prevTheme) => appData.app_color);
    setValue("app_color", appData.app_color, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setCurrLogo(appData.currency_logo);
    setValue("currency_logo", appData.currency_logo, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    reset({ ...defaultValues });
  }, [appData]);

  console.log("data-->112", data);
  // const categoryArr = data.data.map(({ cat_name }) => cat_name)
  const catNamesArray = data.map((obj) => obj.cat_name);

  console.log(catNamesArray);
  const categoryArr = catNamesArray;

  console.log("categoryArr-->", categoryArr);

  // const categoryArr=[
  //   "hello",
  //   "world"
  // ]

  const platformArr = ["Android", "IOS", "Web"];

  const handleAppSubmit = async (data) => {
    console.log("hello world");
    console.log("data--->", data);
    console.log("data--->", category);

    const submitnewArray = await appCategory.data
      .filter((obj) => category?.includes(obj.cat_name))
      .map((obj) => obj._id);

    console.log("submitnewArray-->", submitnewArray);
    if (submitnewArray.length === 0) {
      console.log("appData.categories", categoriesId);
      data.categories = categoriesId;
      console.log("empty");
    } else {
      data.categories = submitnewArray;
      console.log("else");
    }

    console.log("data-->", data);
    const appStore = await dispatch(
      appEditAction({
        app_id: app_id,
        ...data,
        app_logo: appLogo,
        currency_logo: currLogo,
        platform: platform,
        app_color: theme,
      })
    );
    setSnakbar(true);
    setTimeout(() => {
      navigate("/apps");
    }, 1500);
  };

  const handleIconUpload = async (e) => {
    const formData = new FormData();

    formData.set("file", e.target.files[0]);

    let uploadedImg = await dispatch(uplodImageAction(formData));
    const imgStr = uploadedImg?.payload?.data?.url;
    console.log("imgStr-->", imgStr);
    setAppLogo(imgStr);
    setValue("app_logo", imgStr, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleIconUpload2 = async (e) => {
    const formData = new FormData();

    formData.set("file", e.target.files[0]);

    let uploadedImg = await dispatch(uplodImageAction(formData));
    const imgStr = uploadedImg?.payload?.data?.url;
    console.log("imgStr-->", imgStr);
    setCurrLogo(imgStr);
    setValue("currency_logo", imgStr, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const handleChange = async (e) => {
    setTheme(e.target.value);
    setValue("app_color", e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  let matchedObjects;
  useEffect(() => {
    matchedObjects = categoryArr.filter((obj) =>
      appData.categories?.includes(obj._id)
    );
    console.log("matched", typeof matchedObjects);
    console.log("matched", matchedObjects);
  }, [appData]);

  return (
    <>
      <AppbarUI />
      <DrawerUI />
      <BodyWapperUI>
        {appLoad ? (
          "loading.."
        ) : (
          <Card sx={{ p: 5 }}>
            <Typography variant="h5" sx={{ mb: 5 }}>
              Create & Customize
            </Typography>
            <form onSubmit={handleSubmit(handleAppSubmit)}>
              <Stack spacing={3}>
                {newArray && theme && (
                  <Autocomplete
                    disablePortal
                    multiple
                    aria-multiline
                    options={categoryArr}
                    defaultValue={newArray}
                    // getOptionLabel={(option) =>option?.cat_name}
                    onChange={(event, value) => {
                      console.log("value", value);
                      setCategory(value);
                      setValue("categories", value, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        value={category}
                        {...params}
                        label="select Categories"
                        error={errors?.categories?.message}
                        helperText={errors?.categories?.message}
                      />
                    )}
                  />
                )}

                <Stack
                  direction="row"
                  spacing={10}
                  justifyContent="center"
                  alignItems="center"
                >
                  <TextField
                    label="App Name"
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    {...register("app_name")}
                    error={errors?.app_name?.message}
                    helperText={errors?.app_name?.message}
                    style={{ width: '50%' }}
                  />
                  {/* defaultValue={data?.permission} */}
                  {console.log("heeloo", appData?.categories)}
                  {/* {newArray && theme && (
                    <Autocomplete
                      disablePortal
                      multiple
                      aria-multiline
                      options={categoryArr}
                      defaultValue={newArray}
                      // getOptionLabel={(option) =>option?.cat_name}
                      onChange={(event, value) => {
                        console.log("value", value);
                        setCategory(value);
                        setValue("categories", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }}
                      sx={{ width: 450 }}
                      renderInput={(params) => (
                        <TextField
                          value={category}
                          {...params}
                          label="select Categories"
                          error={errors?.categories?.message}
                          helperText={errors?.categories?.message}
                        />
                      )}
                    />
                  )} */}

                  {/* <TextField label="select color" type='color' defaultValue={appData.app_color} {...register('app_color')} error={errors?.app_b_color?.message} helperText={errors?.app_b_color?.message} style={{ width: "'50%'" }} /> */}

                  {theme && (
                    <FormControl style={{ width: '50%' }}>
                      {/* <InputLabel id="demo-simple-select-label" InputLabelProps={{ shrink: true }}>Color Theme</InputLabel> */}
                      {console.log("theme", theme)}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={theme}
                        label="Color Theme"
                        onChange={handleChange}
                      >
                        <MenuItem style={{ background: "#22819B" }} value={1}>
                          Theme 1
                        </MenuItem>
                        <MenuItem style={{ background: "#FFCB9B" }} value={2}>
                          Theme 2
                        </MenuItem>
                        <MenuItem style={{ background: "#BEDEBE" }} value={3}>
                          Theme 3
                        </MenuItem>
                      </Select>
                      {errors?.app_color && (
                        <FormHelperText style={{ color: "#d33534" }}>
                          {errors.app_color.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Stack>

                <Stack
                  direction="row"
                  spacing={10}
                  justifyContent="center"
                  alignItems="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="App logo"
                    type="file"
                    id="app_logo"
                    {...register("app_logo")}
                    onChange={handleIconUpload}
                    error={errors?.app_logo?.message}
                    helperText={errors?.app_logo?.message}
                    style={{ width: "50%" }}
                  />
                  <Avatar alt="App logo" src={appLogo} />
                 

                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Currency Logo"
                    type="file"
                    id="curr_logo"
                    {...register("currency_logo")}
                    error={errors?.currency_logo?.message}
                    helperText={errors?.currency_logo?.message}
                    onChange={handleIconUpload2}
                    style={{ width: "50%" }}
                  />
                  <Avatar alt="App logo" src={currLogo} />
                </Stack>

                <Stack
                  direction="row"
                  spacing={10}
                  justifyContent="center"
                  alignItems="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Exchange Rate"
                    {...register("exchange_rate")}
                    error={errors?.exchange_rate?.message}
                    helperText={errors?.exchange_rate?.message}
                    style={{ width: '50%' }}
                  />
                  <Autocomplete
                    disablePortal
                    defaultValue={appData.platform}
                    options={platformArr}
                    onChange={(event, value) => {
                      setPlatform(value);
                      setValue("platform", value, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                    sx={{ width: '50%' }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register("platform")}
                        label="select Platform"
                        error={errors?.platform?.message}
                        helperText={errors?.platform?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />

                 
                </Stack>

                <Stack
                  direction="row"
                  spacing={10}
                  justifyContent="center"
                  alignItems="center"
                >
                   <TextField
                    label="Currency Name"
                    InputLabelProps={{ shrink: true }}
                    {...register("currency_name")}
                    error={errors?.currency_name?.message}
                    helperText={errors?.currency_name?.message}
                    style={{ width: '50%' }}
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    {...register("postback_url")}
                    error={errors?.postback_url?.message}
                    helperText={errors?.postback_url?.message}
                    label="Post Back Url"
                    style={{ width:'50%' }}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Button variant="contained" type="submit">
                    Update App
                  </Button>
                  {/* <Button variant='contained' color='error' onClick={handleClose}>Back</Button> */}
                </Stack>
              </Stack>
            </form>
          </Card>
        )}
      </BodyWapperUI>
      {snakbar && (
        <SnackBarUI
          state={snakbar}
          setState={setSnakbar}
          status={Status}
          message={Msg}
        />
      )}

      <DevTool control={control} />
    </>
  );
}
