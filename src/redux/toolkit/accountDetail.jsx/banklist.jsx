import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const bankListAction = createAsyncThunk(
    'bank-list',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/bank/lists/0/20`, )
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const bankListSlice = createSlice({
    name: 'bank-list',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(bankListAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(bankListAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(bankListAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const bankListReducer = bankListSlice.reducer