import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const pastMissionListAction = createAsyncThunk(
    'past-mission-lists',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/missions/past/${data.page}/${data.limit}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const pastMissionListSlice = createSlice({
    name: 'past-mission-lists',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(pastMissionListAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(pastMissionListAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(pastMissionListAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const pastMissionListReducer = pastMissionListSlice.reducer