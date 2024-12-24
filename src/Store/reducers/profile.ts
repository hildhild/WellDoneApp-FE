import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "profile",
  initialState: { token: "", id: null as number | null, name: "", dateOfBirth: "", email: ""},
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
    setProfile: (state, action: PayloadAction<{id: number, name: string, dateOfBirth: string, email: string}>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.email = action.payload.email;
    }
  },
});

export const { setToken, removeToken, setProfile } = slice.actions;

export const profileReducers = slice.reducer;
