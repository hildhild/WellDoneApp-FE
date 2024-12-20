import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "@/Services/group";

const slice = createSlice({
  name: "group",
  initialState: {
    groupList: [] as Group[],
  },
  reducers: {
    setGroupList: (state, action: PayloadAction<Group[]>) => {
      state.groupList = action.payload;
    }
  },
});

export const { setGroupList } = slice.actions;

export const groupReducers = slice.reducer;
