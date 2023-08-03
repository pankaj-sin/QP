import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const noOfAttemptMissionAction = createAsyncThunk(
    'no-of-attempt-missions',
    async (data, { rejectWithValue }) => {
        try {
            // const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/no-of-attempt-missions`)
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/profile`)

            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const noOfAttemptMissionSlice = createSlice({
    name: 'no-of-attempt-missions',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(noOfAttemptMissionAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(noOfAttemptMissionAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(noOfAttemptMissionAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const noOfAttemptMissionReducer = noOfAttemptMissionSlice.reducer