import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const dashboardAttemptsAction = createAsyncThunk(
    'dashboard-all-info',
    async (data, { rejectWithValue }) => {
        try {
            // const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/dashboard-all-info`)
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/profile`)

            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const dashboardAttemptsSlice = createSlice({
    name: 'dashboard-all-info',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(dashboardAttemptsAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(dashboardAttemptsAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(dashboardAttemptsAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const dashboardAttemptsReducer = dashboardAttemptsSlice.reducer