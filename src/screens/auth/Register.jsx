import { Button, Card, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useState } from 'react'
import Style from "../../styles/login.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import SnackUI from '../../common/SnackUI';
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from '../../redux/toolkit/auth/registerUser'

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [c_password, setCPassword] = useState("")
  const [snack, setSnack] = useState(false)


  const registerSelector = useSelector(state => state.registerUser)
  const { message, status, loading } = registerSelector


  // const navigate = useNavigate()

  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [c_password, setCPassword] = useState("")

  // const [snack, setSnack] = useState(false)
  // const [snackDetails, setSnackDetails] = useState({
  //   statusCode: null,
  //   message: ""
  // })
  

  // const handleRegister = async () => {
  //   try {
  //     const result = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/register`, {
  //       publisher_name: name,
  //       publisher_email: email,
  //       password: password,
  //       c_password:c_password
  //     })
  //     const data = result?.data
      
  //     setSnackDetails({
  //       statusCode: data?.status,
  //       message: data?.message,
  //     })
  //     setSnack(true)

  //     if (data?.status == 200) {
  //       navigate("/login")
  //       window.location.reload()
  //     }
     
  //   } catch (error) {
  //     setSnack(true)
  //     setSnackDetails({
  //       statusCode: error?.response?.data?.status,
  //       message: error?.response?.data?.message,
  //     })
  //     console.log("error---> handleRegister() ", error)
  //   }
  // }

  const handleRegister = async () => {
    const registerData = await dispatch(registerUserAction({ name,email, password,c_password }))
    console.log("registerData", registerData)
    if (registerData?.payload?.status == 200) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
      //message = "Your account has been created succussfully, Please login now at login screen"
    }
    setSnack(true)
  }


  return (
    <>
    <Box className={Style.login}>
      <Card className={Style.login_card} sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant='h6'  align='center'  color='primary'>Register</Typography>  
          <Typography variant='h4' align='center' >Quiz Wall Publisher Panel</Typography>
        </Stack>
        <Box sx={{mt:2}}> 
          <Stack spacing={2}>
            <TextField type='text' value={name} onChange={(e) => setName(e.target.value)} variant='outlined' placeholder='Name' label='Name' />
            <TextField type='email' value={email} onChange={(e) => setEmail(e.target.value)} variant='outlined' placeholder='Email' label='Email' />
            <TextField type='password' value={password} onChange={(e) => setPassword(e.target.value)} variant='outlined' placeholder='Password' label='Password' />
            <TextField type='password' value={c_password} onChange={(e) => setCPassword(e.target.value)} variant='outlined' placeholder='Confirm Password' label='Confirm Password' />
            <Link to='/login' ><Typography variant='subtitle2' align='center' >{`Already have an account`}</Typography></Link>
            <Button onClick={handleRegister}  variant='contained'>Register</Button>
          </Stack>
        </Box>
      </Card>
    </Box>
    {snack && <SnackUI state={snack} setState={setSnack} status={status} message={message} />}
    </>
    )
}
