import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const noOfDisqualifiedAttemptsAction = createAsyncThunk(
    'no-of-disqalified-attempts',
    async (data, { rejectWithValue }) => {
        try {
            // const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/no-of-disqalified-attempts`)
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/profile`)

            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const noOfDisqualifiedAttemptsSlice = createSlice({
    name: 'no-of-disqalified-attempts',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(noOfDisqualifiedAttemptsAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(noOfDisqualifiedAttemptsAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(noOfDisqualifiedAttemptsAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const noOfDisqualifiedAttemptsReducer = noOfDisqualifiedAttemptsSlice.reducer