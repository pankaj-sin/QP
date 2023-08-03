import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const editBankAction = createAsyncThunk(
    'edit-bank',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/bank/edit`,data )
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const editBankSlice = createSlice({
    name: 'edit-bank',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(editBankAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(editBankAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(editBankAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const editBankReducer = editBankSlice.reducer