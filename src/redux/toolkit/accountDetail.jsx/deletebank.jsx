import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const bankDeleteAction = createAsyncThunk(
    'bank-remove-restore',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/bank/remove/restore`, )
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const bankDeleteSlice = createSlice({
    name: 'bank-remove-restore',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(bankDeleteAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(bankDeleteAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(bankDeleteAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const bankDeleteReducer = bankDeleteSlice.reducer