import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const noOfExpectedImpressionsGeneratedAction = createAsyncThunk(
    'no-of-expected-impressions',
    async (data, { rejectWithValue }) => {
        try {
            console.log("data", data)
            // const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/no-of-expected-impressions`)
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/profile`)

            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const noOfExpectedImpressionsGeneratedSlice = createSlice({
    name: 'no-of-expected-impressions',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(noOfExpectedImpressionsGeneratedAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(noOfExpectedImpressionsGeneratedAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(noOfExpectedImpressionsGeneratedAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const  noOfExpectedImpressionsGeneratedReducer = noOfExpectedImpressionsGeneratedSlice.reducer