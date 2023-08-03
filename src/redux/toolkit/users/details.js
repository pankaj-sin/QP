import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const userDetailsAction = createAsyncThunk(
    'user-details',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/details/${data?.user_id}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const userDetailsSlice = createSlice({
    name: 'user-details',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userDetailsAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(userDetailsAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(userDetailsAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const userDetailsReducer = userDetailsSlice.reducer