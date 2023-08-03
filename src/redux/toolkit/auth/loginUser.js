import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const loginUserAction = createAsyncThunk(
    'login-user',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, { email: data?.email, password: data?.password })
            return res?.data
            
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const loginUserSlice = createSlice({
    name: 'login-user',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(loginUserAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(loginUserAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(loginUserAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const loginUserReducer = loginUserSlice.reducer


