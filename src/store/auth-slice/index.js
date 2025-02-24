import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// for register
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      // "https://e-commerce-backend-9rj8.onrender.com/api/auth/register",
      "https://e-commerce-backend-9rj8.onrender.com/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// for login
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    // "https://e-commerce-backend-9rj8.onrender.com/api/auth/login",
    "https://e-commerce-backend-9rj8.onrender.com/api/auth/login",

    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

// for logout

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "https://e-commerce-backend-9rj8.onrender.com/api/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
});

// auth Middleware

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(
    "https://e-commerce-backend-9rj8.onrender.com/api/auth/check-auth",
    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder
      // for register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });

    builder
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // for login

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success;
    });

    builder
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // for check-auth

      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success;
    });

    builder
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // for logout

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
