import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { carttype, user } from "../../type";
import { collection, getDocs, setDoc ,doc, updateDoc, query, where} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { RootState } from "../store";
import { number } from "zod/v4";
export const Addtocartbynum = createAsyncThunk(
  "users/cartbynum",
  async (alldata: { id: number, n: number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const email = state.user.username; // أو state.user.email حسب تعريفك

      if (!email) {
        return thunkAPI.rejectWithValue("🔒 Please log in to add a product.");
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
      const existingProducts: { id: number; n: number }[] =
        userData.products || [];

      // لو ال productId مش موجود نضيفه
      if (existingProducts.length < 1) {
        await updateDoc(userRef, {
          products: [{ id: alldata.id, n: alldata.n }],
        });

        return { id: alldata.id, n: alldata.n }; // ترجع الـ productId الناجح
      } else {
        const isfoundid = existingProducts.find((el) => {
          return el.id == alldata.id;
        });
        if (isfoundid) {
          const findingid = existingProducts.map((ele) => {
            return ele.id ==alldata.id ? { ...ele, n:(alldata.n)} : ele;
          });
          await updateDoc(userRef, {
            products: findingid,
          });
          return alldata;
        } else {
          await updateDoc(userRef, {
            products: [...existingProducts, { id: alldata.id, n: alldata.n }],
          });

          return alldata;
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add product ID");
    }
  }
);

export const Addtocart = createAsyncThunk(
  "users/cart",
  async (id: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const email = state.user.username; // أو state.user.email حسب تعريفك

      if (!email) {
        return thunkAPI.rejectWithValue("🔒 Please log in to add a product.");
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
      const existingProducts: {  id: number,
      n:number
    }[] = userData.products || [];
 


      // لو ال productId مش موجود نضيفه
      if (existingProducts.length < 1) {
        await updateDoc(userRef, {
          products: [{ id: id, n: 1 }]
        });

        return { id: id, n: 1 }; // ترجع الـ productId الناجح
      } else {
    const isfoundid = existingProducts.find((el) => {
          return el.id == id
        })
        if (isfoundid) {
          const findingid = existingProducts.map((ele) => {
            return ele.id === id ? { ...ele, n: ele.n + 1 } : ele;
          });
          await updateDoc(userRef, {
            products: findingid,
          });
          return id;
        }
        else {
          await updateDoc(userRef, {
            products: [...existingProducts, { id: id, n: 1 }]
          });
      
          return id;
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add product ID");
    }
  }
);
export const Removefromcart = createAsyncThunk(
  "users/removecart",
  async (id: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const email = state.user.username; // أو state.user.email حسب تعريفك

      if (!email) {
        return thunkAPI.rejectWithValue("🔒 Please log in to remove a product.");
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
      const existingProducts: { id: number, n: number }[] = userData.products;

      // لو ال productId مش موجود نضيفهش
      if (existingProducts) {
  const newproducts = existingProducts.filter((ele) => {
          return ele.id !==id
        })
  

        
        
        await updateDoc(userRef, {
          products: newproducts,
        });

        return id; // ترجع الـ productId الناجح
      } else {
        return thunkAPI.rejectWithValue(
          "Product already remove from  user's products"
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to remove product ID");
    }
  }
);
export const Getproductofuser = createAsyncThunk(
  "users/getcart",
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
      const existingProducts: { id: number, n: number }[] = userData.products || [];

    

        return existingProducts; // ترجع الـ productId الناجح
    
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add product ID");
    }
  }
);
// Define the initial state using that type
const initialState: carttype = {
  username: "",
  loading: "idle",
  products: [],
  error: null,
};

export const CartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getallproduct: (state, action)=>{
      
}


  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(Addtocart.fulfilled, (state, action) => {
       state.loading = "succeeded";
       console.log(action.payload);
       const specificproducts = state.products.map((ele) => {
         return ele.id == action.payload
           ? { ...ele, n: +ele.n + 1 }
           : ele;
       });
       state.products = state.products && specificproducts;
    });
    builder.addCase(Addtocart.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(Addtocart.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = "failed";
    });
    ////////////////remove

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(Addtocartbynum.fulfilled, (state, action) => {

      state.loading = "succeeded";
      console.log(action.payload);
      const specificproducts = state.products.map((ele) => {
        return ele.id == action.payload.id ? {...ele,n:+action.payload.n} :ele
      })
      state.products = state.products && specificproducts;
    });
    builder.addCase(Addtocartbynum.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(Addtocartbynum.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = "failed";
    });
    ////////////////remove

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(Removefromcart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.products = state.products.filter((ele) => {
        return ele.id != action.payload;
      });
    });
    builder.addCase(Removefromcart.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(Removefromcart.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = "failed";
    });

    //////////get
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(Getproductofuser.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.products =state.products&&action.payload
    });
    builder.addCase(Getproductofuser.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(Getproductofuser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = "failed";
    });
  },
});

export default CartSlice.reducer;
