// redux/authSlice.js
import { UserInfor } from "@/dtos/auth/auth.dto";
import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {} as UserInfor,
};

const authSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.data = action.payload;
    },
    clearAuthData: (state) => {
      state.data = {} as UserInfor;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
// Fix the selector to match the slice name in the store
export const selectAuthLogin = (state: RootState) => state.userInfo;
// Add a direct selector for the data property
export const selectUserData = (state: RootState) => state.userInfo.data;

export default authSlice.reducer;
