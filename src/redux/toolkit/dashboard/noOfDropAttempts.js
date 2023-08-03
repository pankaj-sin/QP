import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const noOfDropAttemptsAction = createAsyncThunk(
    'no-of-drop-attempts',
    async (data, { rejectWithValue }) => {
        try {
            // const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/no-of-drop-attempts`)
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/profile`)

            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const noOfDropAttemptsSlice = createSlice({
    name: 'no-of-drop-attempts',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(noOfDropAttemptsAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(noOfDropAttemptsAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(noOfDropAttemptsAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const noOfDropAttemptsReducer = noOfDropAttemptsSlice.reducer