import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "profile",
  initialState: { token: "", name: "", dateOfBirth: "", email: ""},
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
    setProfile: (state, action: PayloadAction<{name: string, dateOfBirth: string, email: string}>) => {
      state.name = action.payload.name;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.email = action.payload.email;
    }
  },
});

export const { setToken, removeToken, setProfile } = slice.actions;

export const profileReducers = slice.reducer;
