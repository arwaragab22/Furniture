import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { favtype, user } from "../../type";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { RootState } from "../store";
export const subtofav = createAsyncThunk(
  "users/subfav",
  async (id: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const email = state.user.username; // أو state.user.email حسب تعريفك

      if (!email) {
        return thunkAPI.rejectWithValue("You need to be logged in to remove this from your favorites.");
      }

      // نعمل query للمستخدم بالـ email
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return thunkAPI.rejectWithValue("User not found in Firestore");
      }

      // ناخد أول مستند مطابق
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);
      const userData = userDoc.data();

      // نحصل على ال products الحاليين أو نبدأ بآري فاضية
      const existingProducts: number[] = userData.fav || [];

      // لو ال productId مش موجود نضيفه
      if (existingProducts.includes(id)) {
      let newproducts=  existingProducts.filter((num) => num !== id);;

        await updateDoc(userRef, {
          fav: newproducts,
        });

        return id; // ترجع الـ productId الناجح
      } else {
        return thunkAPI.rejectWithValue(
          "Product already exists in user's products"
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add product ID");
    }
  }
);
export const Addtofav = createAsyncThunk(
  "users/fav",
  async (id: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const email = state.user.username; // أو state.user.email حسب تعريفك

      if (!email) {
        return thunkAPI.rejectWithValue(
          "🔒 You need to log in to save items to your favorites."
        );
      }

      // نعمل query للمستخدم بالـ email
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return thunkAPI.rejectWithValue("User not found in Firestore");
      }

      // ناخد أول مستند مطابق
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);
      const userData = userDoc.data();

      // نحصل على ال products الحاليين أو نبدأ بآري فاضية
      const existingProducts: number[] = userData.fav || [];

      // لو ال productId مش موجود نضيفه
      if (!existingProducts.includes(id)) {
        existingProducts.push(id);

        await updateDoc(userRef, {
          fav: existingProducts,
        });

        return id; // ترجع الـ productId الناجح
      } else {
        return thunkAPI.rejectWithValue("❤️ This is already in your favorites");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add product ID");
    }
  }
);
export const Getproductofuser = createAsyncThunk(
  "users/getfav",
  async (name: string, thunkAPI) => {
    try {
      const email = name; // أو state.user.email حسب تعريفك

      if (!email) {
        return thunkAPI.rejectWithValue("Please log in to add a product");
      }

      // نعمل query للمستخدم بالـ email
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return thunkAPI.rejectWithValue("User not found in Firestore");
      }

      // ناخد أول مستند مطابق
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // نحصل على ال products الحاليين أو نبدأ بآري فاضية
      const existingProducts: number[] = userData.fav || [];

      return existingProducts; // ترجع الـ productId الناجح
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add product ID");
    }
  }
);
// Define the initial state using that type
const initialState: favtype = {
  username: "",
  loading: "idle",
fav: [],
  error: null,
};

export const favSlice = createSlice({
  name: "fav",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getallproduct: (state, action) => {},
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(Addtofav.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.fav = [...state.fav, action.payload as number];
    });
    builder.addCase(Addtofav.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(Addtofav.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = "failed";
    });
    ////////////////
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(subtofav.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.fav = state.fav.filter((ele) => {
        return ele !== action.payload as number;
      })
    });
    builder.addCase(subtofav.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(subtofav.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = "failed";
    });
  },
});

export default favSlice.reducer;
