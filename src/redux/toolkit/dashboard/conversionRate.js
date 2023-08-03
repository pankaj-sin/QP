import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const conversionRateAction = createAsyncThunk(
    'conversion-rate',
    async (data, { rejectWithValue }) => {
        try {
            // const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/conversion-rate`)
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/profile`)

            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const conversionRateSlice = createSlice({
    name: 'conversion-rate',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(conversionRateAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(conversionRateAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(conversionRateAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const conversionRateReducer = conversionRateSlice.reducer