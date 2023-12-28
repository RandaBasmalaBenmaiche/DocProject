import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState ={
    user: user ? user : null,
    isError: false,
    type: null,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//regester the user
export const regester = createAsyncThunk('auth/regester', async(user, thunkAPI)=>{
    try {
        return await authService.regester(user)
    } catch (error) {
        const message = error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//login the user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        const message = error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//logout user
export const logOut = createAsyncThunk('auth/logout', async()=>{
    await authService.logOut()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: state => {
            state.isError = false
            state.isSuccess = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(regester.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(regester.fulfilled, (state,action)=>{
            state.isLoading = false
        })
        .addCase(regester.rejected, (state,action)=>{
            state.user = null
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(login.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state,action)=>{
            state.user = action.payload[0]
            state.type = action.payload[1].type
            state.isLoading = false 
            state.isSuccess = true
        })
        .addCase(login.rejected, (state,action)=>{
            state.user = null
            state.type = null
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(logOut.fulfilled, (state,action)=>{
            state.user = null
            state.type = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer 