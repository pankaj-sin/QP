import {
  Box,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/drawer.module.scss";
import MailIcon from "@mui/icons-material/Mail";
import Person2Icon from "@mui/icons-material/Person2";
import { Link, useLocation } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { ThemeContext } from "../context/ThemeProvider";
import Logo from "../assets/img/logo.png";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import GroupIcon from "@mui/icons-material/Group";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import PauseIcon from "@mui/icons-material/Pause";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaidIcon from "@mui/icons-material/Paid";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { useDispatch, useSelector } from "react-redux";
import { myProfileAction } from "../redux/toolkit/profile/my-profile";
import SnackBarUI from "./SnackUI";
import backgroundImage from "../assets/img/Icon.png";
import backgroundImag from "../assets/img/add 3.svg";
import backgroundIma from "../assets/img/users.svg";
import backgroundIm from "../assets/img/live.png";
import upcomingIcon from "../assets/img/upcoming 1.png";
import pauseIcon from "../assets/img/Vector.svg";
import pastMission from "../assets/img/time-past 1.png";
import postLogger from "../assets/img/PostbackLoer.png";
import payOutIcon from "../assets/img/Postback.png";
import barChart from "../assets/img/bar-chart-square-w02.svg";
import supportColorIcon from "../assets/img/support.svg";
import accountManagerColorIcon from "../assets/img/account-settings.svg";
import createCustumWhiteColorIcon from "../assets/img/createIconWhite.svg"
import usersWhiteColorIcon from "../assets/img/usersWhite.svg"
import liveMissionWhiteColorIcon from "../assets/img/liveWhite.svg"
import upcominMissiongWhiteColorIcon from "../assets/img/upcoming 1White .svg"
import pauseMissionWhiteColorIcon from "../assets/img/pause.svg"
import pastMissionWhiteColorIcon from "../assets/img/time-past 1White.svg"
import postBackLoggersWhiteColorIcon from "../assets/img/PostBackLoggerWhite.svg"
import payoutsWhiteColorIcon from "../assets/img/postBackWhite.svg"
import postBackWhiteColorIcon from "../assets/img/postBackWhite.svg"
import supportKnowledgeWhiteColorIcon from "../assets/img/supportWhite.svg"
import accountManagerWhiteColorIcon from "../assets/img/account-settingsWhite.svg"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';






export default function DrawerUI() {
  const { pathname } = useLocation();
  const { drawerSilde } = useContext(ThemeContext);
  const [snakbar, setSnakbar] = useState(false);
  const dispatch = useDispatch();
  const myProfileSelector = useSelector((state) => state.myProfile);
  const { data: profileData, status, message } = myProfileSelector;
  if (status === 401) {
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/login";
    }, 2000);
  }

  const listOFSidebar = [
    {
      primary: "Dashboard",
      sideIcon:  pathname!=="/"?<img src={backgroundImage}/>:<img src={barChart}/>,
      
      href: "/",
    },
    {
      primary: "Create and Customize",
      sideIcon: pathname!=="/apps"? <img src={backgroundImag} />:<img src={createCustumWhiteColorIcon}/>,
      href: "/apps",
    },
    {
      primary: "Users",
      sideIcon: pathname!=="/users"? <img src={backgroundIma} />:<img src={usersWhiteColorIcon}/>,
      href: "/users",
    },
    {
      primary: "Live Missions",
      sideIcon: pathname!=="/live-missions"? <img src={backgroundIm} />:<img src={liveMissionWhiteColorIcon}/>,
      href: "/live-missions",
    },
    {
      primary: "Upcoming Missions",
      sideIcon: pathname!=="/upcoming-missions"? <img src={upcomingIcon} />:<img src={upcominMissiongWhiteColorIcon}/>,
      href: "/upcoming-missions",
    },
    {
      primary: "Paused Missions",
      sideIcon: pathname!=="/paused-missions"? <img src={pauseIcon} />:<img src={pauseMissionWhiteColorIcon}/>,
      href: "/paused-missions",
    },
    {
      primary: "Past Missions",
      sideIcon: pathname!=="/past-missions"? <img src={pastMission} />:<img src={pastMissionWhiteColorIcon}/>,
      href: "/past-missions",
    },
    {
      primary: "Postback Loggers",
      sideIcon: pathname!=="/postback-loggers" ?<img src={postLogger} />:<img src={postBackLoggersWhiteColorIcon}/>,
      href: "/postback-loggers",
    },
    {
      primary: "Payouts",
      sideIcon: pathname!=="/payouts" ?<CurrencyRupeeIcon />:<CurrencyRupeeIcon/>,
      href: "/payouts",
    },

    // {
    //   primary: "Postback",
    //   sideIcon: pathname!=="/set-postback"? <img src={payOutIcon} />:<img src={postBackWhiteColorIcon}/>,
    //   href: "/set-postback",
    // },

    {
      primary: "Support & Knowledge",
      sideIcon: pathname!=="/support-knowladge"? <img src={supportColorIcon} />:<img src={supportKnowledgeWhiteColorIcon}/>,
      href: "/support-knowladge",
    },
    {
      primary: "Account Manager",
      sideIcon: pathname!=="/account-manager"? <img src={accountManagerColorIcon} />:<img src={accountManagerWhiteColorIcon}/>,
      href: "/account-manager",
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await dispatch(myProfileAction());
      setSnakbar(true);
    };
    fetchProfile();
  }, [dispatch]);

  const styles = {
    listItem: {
      "&:hover": {
        backgroundColor: "#E7F7FF", // Apply desired hover background color
      },
    },
  };

  const styles1 = {
    listItem: {
      "&:hover": {
        backgroundColor: "#0C6A96", // Apply desired hover background color
      },
    },
  };
  return (
    <>
      {/* <BodyWapperUI> */}
      <Stack className={drawerSilde ? Style.drawer_open : Style.drawer_close}>
        <Box className={Style.header}>
          <Stack
            direction="row"
            spacing={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <img
              src={profileData?.profile_img}
              style={{
                width: "40px",
                border: "2px solid #1D2524",
                borderRadius: "50%",
              }}
              alt="logo"
            />
            {drawerSilde && (
              <p
                style={{
                  fontSize: "1.5rem",
                  color: "#1A1A1A",
                  font: "DM Sans",
                  lineHeight: "18.23px",
                }}
              >
                {profileData.name}
              </p>
            )}
          </Stack>
        </Box>
        {/* <Divider /> */}
        <Box style={{ border: "2px solid #E0E0E0", padding: "5px" }}>
          <List>
            { listOFSidebar.map((item, index) => (
              <Link
                key={index}
                to={item?.href}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  className={item?.href == pathname && Style.actvie_link}
                  key={index}
                  disablePadding
                >
                  <ListItemButton
                    sx={item?.href !== pathname && styles.listItem}
                  >
                    <ListItemIcon
                      className={item?.href === pathname && Style.whiteColor}
                    >
                      {item?.sideIcon}
                    </ListItemIcon>
                    {drawerSilde && (
                      <ListItemText
                        className={item?.href === pathname && Style.whiteColor}
                        sx={{ color: "#344054" }}
                        primary={item?.primary}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Stack>
      {/* </BodyWapperUI> */}
      {snakbar && status !== 200 && (
        <SnackBarUI
          state={snakbar}
          setState={setSnakbar}
          status={status}
          message={message}
        />
      )}
    </>
  );
}
