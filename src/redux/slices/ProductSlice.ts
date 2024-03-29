import { 
  ActionReducerMapBuilder, 
  PayloadAction, 
  createAsyncThunk, 
  createSlice } from "@reduxjs/toolkit";

import { apiService } from "../../services/APIService";
import ProductSliceUtils from "../utils/ProductSliceUtils";

import { FilteredProducts, Product, ProductRegister, ProductUpdate } from "../../misc/types/Product";
import Filter from "../../misc/types/Filter";
import Sort from "../../misc/types/Sort";

export type InitialState = {
  products: Product[];
  product: Product | null;
  sort?: Sort;
  sortedProducts: Product[];
  total: number;
  minMaxPrice: number[];
  filter?: Filter;
  loading: boolean;
  error?: string;
}

export const initialState: InitialState = {
  products: [],
  sortedProducts: [],
  product: null,
  loading: false,
  total: 0,
  minMaxPrice: []
};

export const fetchProducts = createAsyncThunk(
  "fetchProducts", // get all products, by categories, by page, by itemsPerPage
  async (filter: Filter, { rejectWithValue }) => {
    try {
      return apiService.getProducts(filter);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const fetchProduct = createAsyncThunk(
  "fetchProduct", // get a product
  async (productId: string, { rejectWithValue }) => {
    try {
      return apiService.getProduct(productId);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const registerProduct = createAsyncThunk(
  "registerProduct",
  async (product: ProductRegister, { rejectWithValue }) => {
    try {
      return apiService.registerProduct(product);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (productUpdate: ProductUpdate, { rejectWithValue }) => {
    try {
      return apiService.updateProduct(productUpdate.item, productUpdate.id);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      return apiService.deleteProduct(product);
    } catch (e) {
      return rejectWithValue(e);
    }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    sortBy: (state, actions: PayloadAction<Sort>) => {
      state.sort = actions.payload;
      state.sortedProducts = ProductSliceUtils.sortProducts(state.products, actions.payload);
    },
    updateFilter: (state, actions: PayloadAction<Filter>) => {
      state.filter = actions.payload;
    }
  },
  extraReducers(builder: ActionReducerMapBuilder<InitialState>) {
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        const filteredProducts: FilteredProducts = ProductSliceUtils.getTotalAndImageCheckedProducts(action.payload, state.filter, state.total, state.minMaxPrice);
        return {
          ...state,
          products: filteredProducts.products,
          sortedProducts: ProductSliceUtils.sortProducts(filteredProducts.products, state.sort),
          total: filteredProducts.total,
          minMaxPrice: filteredProducts.minMaxPrice,
          loading: false     
        }
      }).addCase(fetchProducts.pending, (state, action) => {
        return {
          ...state,
          products: [],
          sortedProducts: [],
          loading: true,
          error: undefined
        }
      }).addCase(fetchProducts.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "Unkown error..."
        }
      });

      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        const imageCheckedProduct: Product = ProductSliceUtils.checkImagesForProduct(action.payload)

        return {
          ...state,
          product: imageCheckedProduct,
          loading: false
        }
      }).addCase(fetchProduct.pending, (state, action) => {
        return {
          ...state,
          product: null,
          loading: true,
          error: undefined
        }
      }).addCase(fetchProduct.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "Unkown error..."
        }
      });

      builder.addCase(registerProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const imageCheckedProduct: Product = ProductSliceUtils.checkImagesForProduct(action.payload)
        return {
          ...state,
          product: imageCheckedProduct,
          loading: false
        }
      }).addCase(registerProduct.pending, (state, action) => {
        return {
          ...state,
          product: null,
          loading: true,
          error: undefined        
        }
      }).addCase(registerProduct.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "Unkown error..."
        }
      });

      builder.addCase(updateProduct.fulfilled, (state, action) => {
        const imageCheckedProduct: Product = ProductSliceUtils.checkImagesForProduct(action.payload)
        return {
          ...state,
          product: imageCheckedProduct,
          loading: false
        }
      }).addCase(updateProduct.pending, (state, action) => {
        return {
          ...state,
          product: null,
          loading: true,
          error: undefined        
        }
      }).addCase(updateProduct.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "Unkown error..."
        }
      });

      builder.addCase(deleteProduct.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          product: null
        }
      }).addCase(deleteProduct.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: undefined        
        }
      }).addCase(deleteProduct.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "Unknow error..."
        }
      });
  },
});

export const { 
  sortBy,
  updateFilter
} = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;
