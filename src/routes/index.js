import React, { useEffect } from 'react'
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Dashboard from '../screens/dashboard/Dashboard';
import Profile from '../screens/profile/Show';
import ProfileEdit from '../screens/profile/Edit';
import AccountManager from '../screens/account-manager/Index'
import AccountAdd from '../screens/payout/CreateBankDetail';
import AccountEdit from '../screens/payout/UpdateBankDetail'
import Users from '../screens/users/Index';
import UserDetail from '../screens/users/Detail';

import Apps from '../screens/apps/Index';
import CreateApp from '../screens/apps/CreateApp';

import LiveMissions from '../screens/live-missions/Index';
import LiveMissionDetail from '../screens/live-missions/Detail';

import PastMissions from '../screens/past-missions/Index';
import PastMissionDetail from '../screens/past-missions/Detail';

import PausedMissions from '../screens/paused-missions/Index';
import PausedMissionDetail from '../screens/paused-missions/Detail';

import UpcomingMissions from '../screens/upcoming-missions/Index';
import UpcomingMissionDetail from '../screens/upcoming-missions/Detail';

import SetPostback from '../screens/postback/Set';

import PostbackLoggors from '../screens/postback-loggers/Index';
import PostbackLoggorDetail from '../screens/postback-loggers/Detail';


import SupportKnowladge from '../screens/support-knowladge';

import Payout from '../screens/payout/index'

import Requestpayment from '../screens/payout/PaymentRequest'

import NotFoundPage from '../screens/NotFoundPage';
import Protected from '../routes/ProtectedRoute'
import UpdateApp from '../screens/apps/UpdateApp';
import { useDispatch } from 'react-redux';
import { myProfileAction } from '../redux/toolkit/profile/my-profile';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/",
    element: <Protected><Dashboard/></Protected>,
  },
  {
    path: "/profile",
    element:<Protected><Profile/></Protected> ,
  },
  {
    path: "/profile/edit",
    element: <Protected><ProfileEdit/></Protected>,
  },

  {
    path: "/apps",
    element: <Protected><Apps/></Protected>,
  },
  {
    path: "/apps/create-app",
    element: <Protected><CreateApp/></Protected>,
  },
  {
    path: "/apps/update-app",
    element: <Protected><UpdateApp/></Protected>,
  },
  {
    path: "/users",
    element: <Protected><Users/></Protected>,
  },
  {
    path: "/users/detail",
    element: <Protected><UserDetail/></Protected>,
  },

 
  {
    path: "/users/detail",
    element: <Protected><UserDetail/></Protected>,
  },

  {
    path: "/live-missions",
    element: <Protected><LiveMissions/></Protected>,
  },
  {
    path: "/live-missions/detail",
    element: <Protected><LiveMissionDetail/></Protected>,
  },
  
  {
    path: "/paused-missions",
    element: <Protected><PausedMissions/></Protected>,
  },
  {
    path: "/paused-missions/detail",
    element: <Protected><PausedMissionDetail/></Protected>,
  },
  
  {
    path: "/upcoming-missions",
    element: <Protected><UpcomingMissions/></Protected>,
  },
  {
    path: "/upcoming-missions/detail",
    element: <Protected><UpcomingMissionDetail/></Protected>,
  },

  {
    path: "/past-missions",
    element: <Protected><PastMissions/></Protected>,
  },
  {
    path: "/past-missions/detail",
    element: <Protected><PastMissionDetail/></Protected>,
  },


  {
    path: "/payouts",
    element: <Protected><Payout/></Protected>,
  },
  {
    path: "/request-payout",
    element: <Protected><Requestpayment/></Protected>,
  },
  // {
  //   path: "/payouts/update",
  //   element: <Protected><PayoutEdit/></Protected>,
  // },

  // {
  //   path: "/set-postback",
  //   element: <Protected><SetPostback/></Protected>,
  // },
  
  {
    path: "/postback-loggers",
    element: <Protected><PostbackLoggors/></Protected>,
  },
  {
    path: "/postback-loggers/detail",
    element: <Protected><PostbackLoggorDetail/></Protected>,
  },

  {
    path: "/support-knowladge",
    element: <Protected><SupportKnowladge/></Protected>,
  },

  {
    path: "/account-manager",
    element: <Protected><AccountManager/></Protected>,
  },
  {
    path: "/add-account",
    element: <Protected><AccountAdd/></Protected>,
  },
  {
    path: "/update-account",
    element: <Protected><AccountEdit/></Protected>,
  },
  
  
 
  {
    path: "/*",
    element: <NotFoundPage/>,
  }

]);


export default function Routes() {
   // state
   const dispatch = useDispatch()
   // use effect
   useEffect(() => {
       dispatch(myProfileAction())
   }, [dispatch])

  return (
    <RouterProvider router={router} />
  )
}
