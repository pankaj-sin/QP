import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const noOfParticipantAttemptsAction = createAsyncThunk(
    'no-of-participant-attempts',
    async (data, { rejectWithValue }) => {
        try {
            console.log("data", data)
            // const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/no-of-participant-attempts`)
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/profile`)

            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const noOfParticipantAttemptsSlice = createSlice({
    name: 'no-of-participant-attempts',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(noOfParticipantAttemptsAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(noOfParticipantAttemptsAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(noOfParticipantAttemptsAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const  noOfParticipantAttemptsReducer = noOfParticipantAttemptsSlice.reducer