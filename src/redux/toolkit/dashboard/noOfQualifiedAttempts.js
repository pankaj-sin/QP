import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const noOfQualifiedAttemptsAction = createAsyncThunk(
    'no-of-quilified-attempts',
    async (data, { rejectWithValue }) => {
        try {
            console.log("data", data)
            // const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/no-of-quilified-attempts`)
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/profile`)

            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const noOfQualifiedAttemptsSlice = createSlice({
    name: 'no-of-quilified-attempts',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(noOfQualifiedAttemptsAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(noOfQualifiedAttemptsAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(noOfQualifiedAttemptsAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const  noOfQualifiedAttemptsReducer = noOfQualifiedAttemptsSlice.reducer