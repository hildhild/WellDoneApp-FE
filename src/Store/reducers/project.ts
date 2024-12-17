import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ProjectState {
  id: string | null;
}

const initialState: ProjectState = {
  id: null,
};
const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectId: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.id = id;
    },
    clearProjectId: (state) => {
      state.id = null;
    },
  },
});
export const { setProjectId, clearProjectId } = slice.actions;

export const projectReducers = slice.reducer;