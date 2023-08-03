import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Style from "../styles/appbar.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeContext } from "../context/ThemeProvider";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Person2Icon from "@mui/icons-material/Person2";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import Featured from "../assets/img/Featured.png";
import backgroundImage from "../assets/img/Bg PatternH.png";
import forwardArrow from "../assets/img/Arrow.svg";

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Arrow from '../assets/img/Arrow.png'

export default function AppbarUI() {
  const navigate = useNavigate();
  const { drawerSilde, setDrawerSilde } = useContext(ThemeContext);

  const [menuVisible, setMenuVisible] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState();

  const myProfile = useSelector((state) => state.myProfile);
  const { message, data, status, loading } = myProfile;

  // function
  const handleSidebarToggle = () => {
    setDrawerSilde(!drawerSilde);
  };

  const logOutFunc = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  const styles = {
    boxContainer: {
      // backgroundImage: `url(${backgroundImage})`,
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      pl: 2,
      display: "flex",
      alignItems: "center",
      width: "100%",
      // zIndex:'10'
      // border:'2px solid black'
      // Add any additional styling properties as needed
    },
  };
  useEffect(()=>{
      window.scrollTo(0,0)
  },[])

  return (
    <Stack
      direction={"row"}
      className={drawerSilde ? Style?.appbar_open : Style?.appbar_close}
      style={{position:'relative'}}
    >
      <img src={backgroundImage} style={{position:'absolute', width: '100%',
    height: '100%',
    objectFit: 'cover',}}/>

    

      <Box
        sx={
          styles.boxContainer
        }
      >
        {drawerSilde ? (
          <IconButton onClick={handleSidebarToggle}  sx={{marginTop:'60%',position:'absolute',left:'-35px',zIndex:'2' }}>
            {" "}
            {/* <MenuIcon sx={{ color: "#1D2524" }} /> */}
            <img src={Arrow} style={{ color: "#1D2524",zIndex:'2',position:"fixed",left:"20%"}} />
          </IconButton>
        ) : (
          <IconButton onClick={handleSidebarToggle} 
          
          sx={{marginTop:'50%',position:'absolute',left:'-35px',zIndex:'2' ,left:'0px'}}
          // {{marginTop:'50%',zIndex:'2',position:'absolute',left:'12px'}}
          
          >
           
            <img src={Arrow} style={{ color: "#1D2524",zIndex:'2',position:"fixed",left:"7%"}}
            
            // {{marginTop:'50%', color: "#1D2524",borderRadius:'40%' }} 
            
            />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ color: "#1D2524", flexGrow: 1 }}>
          Quiz Wall Publisher Panel
        </Typography>
        {/* <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} /> */}
      </Box>

      <Stack
        sx={{ pr: 2 }}
        direction={"row"}
        alignItems={"center"}
        style={{ background: "white" }}
      >
        <IconButton
          onClick={(event) => {
            setMenuVisible(true);
            setProfileAnchor(event.currentTarget);
          }}
        >
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <img src={Featured} width="100%" alt="dp" />
            {/* <Avatar sx={{ bgcolor: 'info' }} ><img src={data.profile_img} width="100%" alt="dp" /></Avatar> */}
          </Stack>
        </IconButton>
      </Stack>

      <Menu
        anchorEl={profileAnchor}
        open={menuVisible}
        onClose={() => setMenuVisible(false)}
      >
        <Box sx={{ p: 2, width: 200 }}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            👋 Hey,<strong>{data.name}</strong>
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <Person2Icon color="#000" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={logOutFunc}>
          <ListItemIcon>
            <Logout color="primary" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
}
