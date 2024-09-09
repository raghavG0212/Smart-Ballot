import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  currentUser: null,
  voteCasted: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setVoteCasted: (state, action) => {
      state.voteCasted = action.payload;
    },
    logout: (state) => {
      state.isAdmin = false;
      state.currentUser = null;
      state.voteCasted = false;
    },
  },
});

export const { setAdmin, setCurrentUser, setVoteCasted, logout } =
  authSlice.actions;

export default authSlice.reducer;
