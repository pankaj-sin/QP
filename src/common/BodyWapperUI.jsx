import { Box } from '@mui/system'
import React, { useContext } from 'react'
import Style from "../styles/bodywapper.module.scss"
import { ThemeContext } from '../context/ThemeProvider'

export default function BodyWapperUI({children}) {
  const { drawerSilde } = useContext(ThemeContext)
  return (
    <Box className={drawerSilde ? Style.body_open :Style.body_close}>{children}</Box>
  )
}
