import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

// for filtered product

export const fetchAllFilteredProduct = createAsyncThunk(
  "/products/fetchAllProduct",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `https://e-commerce-backend-9rj8.onrender.com/api/shop/products/get?${query}`
    );
    return result?.data;
  }
);

// for filtered product-details

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `https://e-commerce-backend-9rj8.onrender.com/api/shop/products/get/${id}`
    );
    return result?.data;
  }
);

const shoppingProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // for filter-product

      .addCase(fetchAllFilteredProduct.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(fetchAllFilteredProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })

      .addCase(fetchAllFilteredProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })

      // for Product-detials

      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      })

      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      });
  },
});

export const { setProductDetails } = shoppingProductsSlice.actions;
export default shoppingProductsSlice.reducer;
