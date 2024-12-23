
import { Project } from "@/Services/projects";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ProjectState {
  id: number | null;
  curProject: Project | null;
}

const initialState: ProjectState = {
  id: null,
  curProject: null
};
const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectId: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.id = id;
    },
    clearProjectId: (state) => {
      state.id = null;
    },
    setCurProject: (state, action: PayloadAction<Project>) => {
      state.curProject = action.payload;
    }
  },
});
export const {
  setProjectId,
  clearProjectId,
  setCurProject
} = slice.actions;

export const projectReducers = slice.reducer;
