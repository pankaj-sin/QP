import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, loading: false, data: [], error: "", message: "" }


export const uplodImageAction = createAsyncThunk(
    'upload-image',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/upload-image`, data)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const uplodImageSlice = createSlice({
    name: 'upload-image',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(uplodImageAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(uplodImageAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(uplodImageAction.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.error
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
        },

})



export const uplodImageReducer = uplodImageSlice.reducer