import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const appCategoryAction = createAsyncThunk(
    'app-categories',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/app/categories`, )
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const appCategorySlice = createSlice({
    name: 'app-categories',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(appCategoryAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(appCategoryAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(appCategoryAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const appCategoryReducer = appCategorySlice.reducer