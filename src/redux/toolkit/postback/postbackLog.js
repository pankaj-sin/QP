import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: "" }

export const postbackLogAction = createAsyncThunk(
    'postback-log',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/postback/logs/0/10000`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const postbackLogSlice = createSlice({
    name: 'postback-log',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(postbackLogAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(postbackLogAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(postbackLogAction.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.error
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
        },

})



export const postBackLogReducer = postbackLogSlice.reducer