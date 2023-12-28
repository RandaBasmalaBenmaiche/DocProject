import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import modulesService from './modulesService'

const initialState = {
    modules : [],
    module : [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// get modules 
export const getUserModules = createAsyncThunk('modules/get', async(_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await modulesService.GetUserModules(token)
    } catch (error) {
        const message = error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get modules by id
export const getModule = createAsyncThunk('module/get', async(id,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await modulesService.GetModule(id,token)
    } catch (error) {
        const message = error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const modulesSlice = createSlice({
    name: 'modules',
    initialState,
    reducers: {
        reset: (state)=> initialState ,
    },
    extraReducers: (builder)=>{
        builder
        // user modules
        .addCase(getUserModules.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getUserModules.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.modules = action.payload
        })
        .addCase(getUserModules.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        // module by id
        .addCase(getModule.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getModule.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.module = action.payload
        })
        .addCase(getModule.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = modulesSlice.actions
export default modulesSlice.reducer