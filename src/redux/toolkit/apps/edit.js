import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const appEditAction = createAsyncThunk(
    'app-edit',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/app/update`, data )
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const appEditSlice = createSlice({
    name: 'app-edit',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(appEditAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(appEditAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(appEditAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const appEditReducer = appEditSlice.reducer