
import { Button, Card, CircularProgress, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/img/logo.png";
import SnackUI from '../../common/SnackUI';
import { loginUserAction } from '../../redux/toolkit/auth/loginUser';
import Style from "../../styles/login.module.scss";
import LoadingUI from '../../common/LoadingUI';

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [snack, setSnack] = useState(false)


  const loginSelector = useSelector(state => state.loginUser)
  const { message, status, loading } = loginSelector


  // const [snack, setSnack] = useState(false)
  // const [snackDetails, setSnackDetails] = useState({
  //   statusCode: null,
  //   message: ""
  // })

  // const handleSubmitLogin = async () => {
  //   try {
  //     const result = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, {
  //       publisher_email: email,
  //       password: password
  //     })

  //     const data = result?.data
  //     setSnackDetails({
  //       statusCode: data?.status,
  //       message: data?.message,
  //     })
  //     setSnack(true)

  //     if (data?.status == 200) {
  //       localStorage.setItem("auth_token", data?.token)
  //       navigate("/")
  //       window.location.reload()
  //     }


  //   } catch (error) {
  //     setSnack(true)
  //     setSnackDetails({
  //       statusCode: error?.response?.data?.status,
  //       message: error?.response?.data?.message,
  //     })

  //   }
  // }

  const showPassword = (e) => {
    //setCredentials({ [e.target.name]: e.target.value })
  }


  const handleSubmitLogin = async () => {
    const loginData = await dispatch(loginUserAction({ email, password }))
    console.log("loginData", loginData)
    if (loginData?.payload?.status == 200) {
      localStorage.setItem("auth_token", loginData?.payload.token)
      navigate("/")
      window.location.reload()

    }
    setSnack(true)
  }

  return (
    <>
      <Box className={Style.login}>
        <Card className={Style.login_card} sx={{ p: 3 }}>
          <Box className={Style.brand}>
            {/* <img style={{ minWidth: "1px" }} src={Logo} alt='logo' /> */}
          </Box>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant='h6' align='center' color='primary'>Welcome back!</Typography>
            <Typography variant='h4' align='center'>Quiz Wall Publisher Panel</Typography>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <TextField type='email' value={email} onChange={(e) => setEmail(e.target.value)} variant='outlined' placeholder='Email' label='Email' />
              <TextField type='password' value={password} onChange={(e) => setPassword(e.target.value)} variant='outlined' placeholder='Password' label='Password' />
              
              <Link to='/register' ><Typography variant='subtitle2' align='center'>{`Don't have an account`}</Typography></Link>
              <Button disabled={loading} onClick={handleSubmitLogin} variant='contained'>{loading ? <CircularProgress /> : 'Login'}</Button>
            </Stack>
          </Box>
        </Card>
      </Box>

      {snack && <SnackUI state={snack} setState={setSnack} status={status} message={message} />}
    </>
  )
}
