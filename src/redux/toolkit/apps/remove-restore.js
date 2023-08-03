import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const appRemoveRestoreAction = createAsyncThunk(
    'app-remove-restore',
    async (data, { rejectWithValue }) => {
        console.log("data---> il llljdfk",data);
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/app/remove-restore`, data )
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const appRemoveRestoreSlice = createSlice({
    name: 'app-remove-restore',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(appRemoveRestoreAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(appRemoveRestoreAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(appRemoveRestoreAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const appRemoveRestoreReducer = appRemoveRestoreSlice.reducer