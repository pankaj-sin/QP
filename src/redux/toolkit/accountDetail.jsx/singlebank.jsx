import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const singleBankAction = createAsyncThunk(
    'single-bank',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/bank/details/${data}`, )
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const singleBankSlice = createSlice({
    name: 'single-bank',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(singleBankAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(singleBankAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(singleBankAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const singleBankReducer = singleBankSlice.reducer