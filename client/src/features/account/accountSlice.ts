import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { User } from "../../app/models/User";
import { setBasket } from "../BasketPage/BasketSlice";
import { router } from "../../Routes/Routes";

interface AccountState {
    user : User | null;
}
const initialState : AccountState = {
    user : null
}
export const loginUserAsync = createAsyncThunk<User, FieldValues>(
    'account/loginUserAsync',
    async(data, thunkAPI) => {
        try{
        const userDTO = await agent.Account.login(data);
        const {basket, ...user} = userDTO;
        if (basket) thunkAPI.dispatch(setBasket(basket));
        localStorage.setItem("user", JSON.stringify(user));
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
    const userDTO = await agent.Account.currentUser();
    const {basket, ...user} = userDTO;
    if(basket) thunkAPI.dispatch(setBasket(basket));
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
            router.navigate('/');
        },
        setUser : (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers : (builder => {
     builder.addMatcher(isAnyOf(loginUserAsync.fulfilled, fetchUserAsync.fulfilled), (state, action) => {
        state.user = action.payload;
    }); 
    builder.addMatcher(isAnyOf(loginUserAsync.rejected, fetchUserAsync.rejected), (state, action) => {
        console.log(action.payload);
    })
  })
});

export const { SignOutUser, setUser } = accountSlice.actions;