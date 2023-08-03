import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const expectedRevenueAction = createAsyncThunk(
    'expected-revenue',
    async (data, { rejectWithValue }) => {
        try {
            // const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/expected-revenue`)
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/profile`)

            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const expectedRevenueSlice = createSlice({
    name: 'expected-revenue',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(expectedRevenueAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(expectedRevenueAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(expectedRevenueAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const expectedRevenueReducer = expectedRevenueSlice.reducer