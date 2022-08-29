import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../../app/api/agent";
import { User } from "../../app/models/User";

interface AccountState {
    user : User | null,
}
const initialState : AccountState = {
    user : null,
}
export const loginUserAsync = createAsyncThunk<User, FieldValues>(
    'account/loginUserAsync',
    async(data, thunkAPI) => {
        try{
        const user : any = await agent.Account.login(data);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
        }
        catch(error : any){
        thunkAPI.rejectWithValue({error : error.data});
    }
}
);

export const fetchUserAsync = createAsyncThunk<User>(
    'account/fetchUserAsync',
    async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try{
    const user = await agent.Account.currentUser();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
        }catch(error : any){
            thunkAPI.rejectWithValue({error : error.data});
        }   
    },
    {
        condition : () => {
            if(!localStorage.getItem('user')) return false;
        }
    }
    );

export const accountSlice = createSlice({
    name : 'account',
    initialState,
    reducers : {
        SignOutUser : (state) => {
            state.user = null;
            localStorage.removeItem('user');
            history.push('/');
        },
        setUser : (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers : (builder => {
        builder.addCase(fetchUserAsync.rejected, (state) => {
            state.user = null;
            toast.error('Session is expired !! Please login again...');
            localStorage.removeItem('user');
            history.push('/');
           });

        
     builder.addCase(loginUserAsync.rejected, (state , action) => {
        console.log(action.payload);
     });
     builder.addMatcher(isAnyOf(loginUserAsync.fulfilled, fetchUserAsync.fulfilled), (state, action) => {
        state.user = action.payload;
    });
    })
});

export const { SignOutUser, setUser } = accountSlice.actions;