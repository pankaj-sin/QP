import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const addBankAction = createAsyncThunk(
    'add-bank',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/bank/store`,data )
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const addBankSlice = createSlice({
    name: 'add-bank',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(addBankAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(addBankAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(addBankAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const addBankReducer = addBankSlice.reducer