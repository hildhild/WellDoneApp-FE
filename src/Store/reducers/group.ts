import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "@/Services/group";

const slice = createSlice({
  name: "group",
  initialState: {
    curGroup: null as Group | null,
    groupList: [] as Group[],
    refetch: false as boolean
  },
  reducers: {
    setGroupList: (state, action: PayloadAction<Group[]>) => {
      state.groupList = action.payload;
    },
    setCurGroup: (state, action: PayloadAction<Group>) => {
      state.curGroup = action.payload;
    },
    toggleRefetch: (state) => {
      state.refetch = !state.refetch;
    }
  },
});

export const { setGroupList, setCurGroup, toggleRefetch } = slice.actions;

export const groupReducers = slice.reducer;
