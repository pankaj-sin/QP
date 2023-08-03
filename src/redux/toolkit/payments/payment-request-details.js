import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const paymentRequestDetailsAction = createAsyncThunk(
    'payment-request-details',
    async (data, { rejectWithValue }) => {
        console.log("data-->",data)
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/payment-request/detail/${data}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const paymentRequestDetailsSlice = createSlice({
    name: 'payment-request-details',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(paymentRequestDetailsAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(paymentRequestDetailsAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(paymentRequestDetailsAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const paymentRequestDetailsReducer = paymentRequestDetailsSlice.reducer