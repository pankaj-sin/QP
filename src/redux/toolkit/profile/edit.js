import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: "" }

export const editProfileAction = createAsyncThunk(
    'edit-profile',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/edit/profile`,data)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const editProfileSlice = createSlice({
    name: 'edit-profile',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(editProfileAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(editProfileAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(editProfileAction.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.error
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
        },

})



export const editProfileReducer = editProfileSlice.reducer