import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "@/Services/group";

const slice = createSlice({
  name: "group",
  initialState: {
    curGroup: null as Group | null,
    groupList: [] as Group[],
  },
  reducers: {
    setGroupList: (state, action: PayloadAction<Group[]>) => {
      state.groupList = action.payload;
    },
    setCurGroup: (state, action: PayloadAction<Group>) => {
      state.curGroup = action.payload;
    }
  },
});

export const { setGroupList, setCurGroup } = slice.actions;

export const groupReducers = slice.reducer;
