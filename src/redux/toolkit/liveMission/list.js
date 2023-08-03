import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [],total:0, error: "", message: '' }


export const liveMissionListAction = createAsyncThunk(
    'live-mission-lists',
    async (data, { rejectWithValue }) => {
        console.log("data-->",data)
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/missions/live/${data.page}/${data.pageSize}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)




export const liveMissionListSlice = createSlice({
    name: 'live-mission-lists',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(liveMissionListAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(liveMissionListAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.total=action?.payload?.total
                state.message = action?.payload?.message
            })
            builder.addCase(liveMissionListAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.total=action?.payload?.total
                state.error = action?.payload?.message
            })
        },

})



export const liveMissionListReducer = liveMissionListSlice.reducer