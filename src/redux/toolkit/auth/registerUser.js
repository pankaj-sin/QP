import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const registerUserAction = createAsyncThunk(
    'register-publisher',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/register`, {name:data?.name, email: data?.email, password: data?.password, c_password: data?.c_password })
            //const res = await axios.post(`/support-server/api/register-admin`, { ...data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const registerUserSlice = createSlice({
    name: 'register-publisher',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(registerUserAction.pending, (state) => {

                state.loading = true
            })
            builder.addCase(registerUserAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(registerUserAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const registerUserReducer = registerUserSlice.reducer