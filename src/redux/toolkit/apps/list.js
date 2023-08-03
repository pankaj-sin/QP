import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const appListAction = createAsyncThunk(
    'app-lists',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/app/lists/${data.is_deleted}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const appListSlice = createSlice({
    name: 'app-lists',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(appListAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(appListAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(appListAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const appListReducer = appListSlice.reducer