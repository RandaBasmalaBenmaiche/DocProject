import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import coursService from "./coursService";

const initialState = {
    cours : [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getModuleCoures = createAsyncThunk('cours/get', async(id, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await coursService.getCoures(id,token)
    } catch (error) {
        const message = error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const coursSlice = createSlice({
    name : 'cours',
    initialState,
    reducers: {
        reset: (state)=> initialState
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getModuleCoures.pending, (state)=>{
            state.isLoading = true 
        })
        .addCase(getModuleCoures.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.cours = action.payload
        })
        .addCase(getModuleCoures.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = coursSlice.actions
export default coursSlice.reducer