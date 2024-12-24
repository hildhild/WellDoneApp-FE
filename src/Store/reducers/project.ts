import { Project } from "@/Services/projects";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ProjectState {
  id: number | null;
  curProject: Project | null;
  projectList: Project[];
}

const initialState: ProjectState = {
  id: null,
  curProject: null,
  projectList: [],
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
    },
    setProjectList: (state, action: PayloadAction<Project[]>) => {
      state.projectList = action.payload;
    },
  },
});
export const { setProjectId, clearProjectId, setCurProject, setProjectList } =
  slice.actions;

export const projectReducers = slice.reducer;
