import { Project } from "@/Services/projects";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toggleRefetch } from "./group";
interface ProjectState {
  id: number | null;
  curProject: Project | null;
  projectList: Project[];
  refetch: boolean;
}

const initialState: ProjectState = {
  id: null,
  curProject: null,
  projectList: [],
  refetch: false,
};
const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectId: (state, action: PayloadAction<{ id: number | null }>) => {
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
    toggleRefetchProject: (state) => {
      state.refetch = !state.refetch;
    },
  },
});
export const { setProjectId, clearProjectId, setCurProject, setProjectList, toggleRefetchProject } =
  slice.actions;

export const projectReducers = slice.reducer;
