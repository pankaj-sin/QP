import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"
const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const knowledgeListAction = createAsyncThunk(
    'knowledge-list',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/support-knowladges`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const knowledgeListSlice = createSlice({
    name: 'knowledge-list',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(knowledgeListAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(knowledgeListAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(knowledgeListAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const knowledgeListReducer = knowledgeListSlice.reducer