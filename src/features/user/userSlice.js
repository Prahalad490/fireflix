import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      const { uid, email } = action.payload;
      state.user = {
        uid,
        email,
      };
    },
    logout: (state) => {
      state.user = null;
    },
    updateImage: (state, action) => {
      const { imageUrl } = action.payload;
      state.user.imageUrl = imageUrl;
    },
  },
});

export const { login, logout, updateImage } = userSlice.actions;

export const userSelect = (state) => state.user.user;

export default userSlice.reducer;
