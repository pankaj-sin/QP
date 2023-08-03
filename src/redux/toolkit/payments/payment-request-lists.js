import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }

export const paymentRequestListAction = createAsyncThunk(
    'payment-requests-lists',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/payment-requests/${data.page}/${data.limit}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const paymentRequestListSlice = createSlice({
    name: 'payment-requests-lists',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(paymentRequestListAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(paymentRequestListAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(paymentRequestListAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const paymentRequestListReducer = paymentRequestListSlice.reducer