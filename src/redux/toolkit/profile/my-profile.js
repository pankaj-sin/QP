
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: "" }

export const myProfileAction = createAsyncThunk(
    'my-profile',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/profile`,data)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const myProfileSlice = createSlice({
    name: 'my-profile',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(myProfileAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(myProfileAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(myProfileAction.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.error
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
        },

})



export const myProfileReducer = myProfileSlice.reducer