import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const upcomingMissionListAction = createAsyncThunk(
    'upcoming-mission-lists',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/missions/upcomming/${data.page}/${data.limit}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const upcomingMissionListSlice = createSlice({
    name: 'upcoming-mission-lists',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(upcomingMissionListAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(upcomingMissionListAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(upcomingMissionListAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const upcomingMissionListReducer = upcomingMissionListSlice.reducer