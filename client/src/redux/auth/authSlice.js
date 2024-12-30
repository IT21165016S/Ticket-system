import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./authService";

//get user data from local storage
const user = JSON.parse(localStorage.getItem("user"));
const admin = JSON.parse(localStorage.getItem("admin"));

export const userRegThunk = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLoginThunk = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const adminLoginThunk = createAsyncThunk(
  "auth/adminLogin",
  async (adminData, thunkAPI) => {
    try {
      return await authService.adminLogin(adminData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: user || null,
    admin: admin || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    reset(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    logout(state) {
      state.user = null;
      state.admin = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(userRegThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(userLoginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(adminLoginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLoginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(adminLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
