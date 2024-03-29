import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LoginUserInfo, RegisterUserInfo, User, UserToken } from "../../misc/types/User";
import { apiService } from "../../services/APIService";
import { userSlicerUtil } from "../utils/UserSlicerUtil";

export type InitialState = {
  user: User | null; // User;
  loading: boolean;
  error?: string;
}

export const initialState: InitialState = {
  user: null,
  loading: false
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async (userInfo: RegisterUserInfo, { rejectWithValue }) => {
    try {
      return apiService.registerUser(userInfo);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const loginUser = createAsyncThunk(
  "loginUser",
  async (userInfo: LoginUserInfo, { rejectWithValue }) => {
    try {
      return apiService.loginUser(userInfo);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const getUserWithSession = createAsyncThunk(
  "getUserWithSession",
  async (tokens: UserToken, { rejectWithValue }) => {
    try {
      return apiService.getUserWithSession(tokens);
    } catch (e) {
      return rejectWithValue(e);
    }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      userSlicerUtil.removeTokensFromLocalStorage();
      state.user = null;
    }
  },
  extraReducers(builder: ActionReducerMapBuilder<InitialState>) {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false      
      }
    }).addCase(registerUser.pending, (state, action: PayloadAction) => {
      return {
        ...state,
        loading: true,
        error: undefined
      }
    }).addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        user: null,
        loading: false,
        error: action.error.message ?? "Unkown error..."
      }
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      userSlicerUtil.setTokensToLocalStorage(action.payload);

      return {
        ...state,
        loading: false      
      }
    }).addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: undefined
      }
    }).addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        user: null,
        loading: false,
        error: action.error.message ?? "Unkown error..."
      }
    });

    builder.addCase(getUserWithSession.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false     
      }
    }).addCase(getUserWithSession.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: undefined
      }
    }).addCase(getUserWithSession.rejected, (state, action) => {
      return {
        ...state,
        user: null,
        loading: false,
        error: action.error.message ?? "Unkown error..."
      }
    });
  }
});

export const { 
  logout
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;