import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const pausedMissionListAction = createAsyncThunk(
    'paused-mission-lists',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/missions/paused/${data.page}/${data.limit}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const pausedMissionListSlice = createSlice({
    name: 'paused-mission-lists',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(pausedMissionListAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(pausedMissionListAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(pausedMissionListAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const pausedMissionListReducer = pausedMissionListSlice.reducer