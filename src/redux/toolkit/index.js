
import { loginUserReducer } from './auth/loginUser'
import { registerUserReducer } from './auth/registerUser'
import { conversionRateReducer } from './dashboard/conversionRate'
import { expectedRevenueReducer } from './dashboard/expectedRevenue'
import { noOfAttemptMissionReducer } from './dashboard/noOfAttemptMissions'
import { noOfDisqualifiedAttemptsReducer } from './dashboard/noOfDisqualifiedAttempts'
import { noOfDropAttemptsReducer } from './dashboard/noOfDropAttempts'
import { noOfExpectedImpressionsGeneratedReducer } from './dashboard/noOfExpectedImpressionsGenerated'
import { noOfQualifiedAttemptsReducer } from './dashboard/noOfQualifiedAttempts'
import { noOfParticipantAttemptsReducer } from './dashboard/noOfParticipantAttempts'
import { noOfQuitAttemptsReducer } from './dashboard/noOfQuitAttempts'

import { myProfileReducer } from './profile/my-profile'
// import { setPostbackReducer } from './postback/postbackLog'

import { appListReducer } from './apps/list'
import { appStoreReducer } from './apps/store'
import { appEditReducer } from './apps/edit'
import { appDetailReducer } from './apps/detail'
import { appRemoveRestoreReducer } from './apps/remove-restore'
import { appActivateReducer } from './apps/active'

import { uplodImageReducer } from './image/uploadImage'
import { appCategoryReducer } from './apps/categories'


import { addPaymentRequestReducer } from './payments/add-payment-request'
import { paymentRequestDetailsReducer } from './payments/payment-request-details'
import { paymentRequestListReducer } from './payments/payment-request-lists'

import { addBankReducer } from './accountDetail.jsx/addbank'
import { editBankReducer } from './accountDetail.jsx/editbank'
import { singleBankReducer } from './accountDetail.jsx/singlebank'
import { bankDeleteReducer } from './accountDetail.jsx/deletebank'
import { bankListReducer } from './accountDetail.jsx/banklist'

import { liveMissionListReducer } from './liveMission/list'
import { upcomingMissionListReducer } from './upcomingMission/list'
import { pausedMissionListReducer } from './pausedMission/list'
import { pastMissionListReducer } from './pastMission/list'
import { userListReducer } from './users/list'
import { knowledgeListReducer } from './knowledge/list'
import { postBackLogReducer } from './postback/postbackLog'
import { dashboardAttemptsReducer } from './dashboard/dashboard'
import { editProfileReducer } from './profile/edit'

export const toolkitReducers = {
    loginUser: loginUserReducer,
    registerUser: registerUserReducer,
   
    // dashboard reducers
    dashboard: dashboardAttemptsReducer,
    conversionRate: conversionRateReducer,
    expectedRevenue: expectedRevenueReducer,
    attemptMission: noOfAttemptMissionReducer,
    disqualifiedAttempts: noOfDisqualifiedAttemptsReducer,
    dropAttempts: noOfDropAttemptsReducer,
    expectedImpressions: noOfExpectedImpressionsGeneratedReducer,
    qualifiedAttempts: noOfQualifiedAttemptsReducer,
    participantAttempts: noOfParticipantAttemptsReducer,
    quitAttempts: noOfQuitAttemptsReducer,

    //profile
    editProfile:editProfileReducer,
    myProfile: myProfileReducer,
    // setPostback: setPostbackReducer,s
    //app
    appLists: appListReducer,
    appStore: appStoreReducer,
    appEdit: appEditReducer,
    appDetail: appDetailReducer,
    appRemoveRestore: appRemoveRestoreReducer,
    appCategory:appCategoryReducer,
    appActivate:appActivateReducer,

    //image upload

    getImage:uplodImageReducer,

    // bank detail

    addBank:addBankReducer,
    editBank:editBankReducer,
    singleBank:singleBankReducer,
    listBank:bankListReducer,
    deleteBank:bankDeleteReducer,

    // live mission

    liveMissionList:liveMissionListReducer,

    //past mission

    pastMissionList:pastMissionListReducer,

    //upcoming mission

    upcomingMissionList:upcomingMissionListReducer,

    //paused mission

    pausedMissionList:pausedMissionListReducer,

    //user

    userList:userListReducer,


    //payment

    addPayment:addPaymentRequestReducer,
    paymentList:paymentRequestListReducer,
    paymetnDetail:paymentRequestDetailsReducer,

    //knowledge

    knowledgeList:knowledgeListReducer,

    //postback log

    postbackLog:postBackLogReducer
    
}