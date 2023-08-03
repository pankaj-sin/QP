import { combineReducers } from '@reduxjs/toolkit'
import { toolkitReducers } from './toolkit'



export const rootReducer = combineReducers({
    ...toolkitReducers,
    
})