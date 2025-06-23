import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {  user, userlogin } from "../../type";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export const lgoinuser = createAsyncThunk("users/login", async (data:userlogin, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.username,
      data.password
    );


    return userCredential.user.email;
  }
  catch (error ) {
    if (error instanceof Error) {
  return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("حدث خطأ غير متوقع");
  }
});
// Define the initial state using that type
const initialState:user = {
  username: "",
  loading: 'idle',
  error:  null
  
};

export const UserSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signout: (state) => {
      state.username = "";
      state.loading = "idle";
        state.error=null
    },
    setuser: (state, action) => {
      state.username = action.payload;
      state.loading = "succeeded";

      
}

  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(lgoinuser.fulfilled,
      (state, action) => {
        state.username = action.payload as string ;
        state.loading = "succeeded";
        
      }
    );
    builder.addCase(lgoinuser.pending, (state, action) => {
      state.loading = "pending";
    
       });
    builder.addCase(lgoinuser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = "failed"

      });
  },
});


export const { signout, setuser } = UserSlice.actions;
export default UserSlice.reducer;
