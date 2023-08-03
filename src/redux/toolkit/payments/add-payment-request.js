import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"

const initialState = { status: null, loading: false, data: [], error: "", message: '' }

export const addPaymentRequestAction = createAsyncThunk(
    'add-payment-request',
    async (data, { rejectWithValue }) => {
        console.log("data-->",data)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/request-payment`, data)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const addPaymentRequestSlice = createSlice({
    name: 'add-payment-request',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(addPaymentRequestAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(addPaymentRequestAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(addPaymentRequestAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const addPaymentRequestReducer = addPaymentRequestSlice.reducer