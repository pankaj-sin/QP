import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const appActivateAction = createAsyncThunk(
    'active-app',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/app/active`,data )
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const appActivateSlice = createSlice({
    name: 'active-app',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(appActivateAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(appActivateAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(appActivateAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const appActivateReducer = appActivateSlice.reducer