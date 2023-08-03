import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '',total:'' }


export const userListAction = createAsyncThunk(
    'user-lists',
    async (data, { rejectWithValue }) => {
        console.log("data in action--",data.page,data.limit)
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/lists/${data.page}/${data.limit}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const userListSlice = createSlice({
    name: 'user-lists',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userListAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(userListAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.total=action?.payload?.total
            })
            builder.addCase(userListAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const userListReducer = userListSlice.reducer