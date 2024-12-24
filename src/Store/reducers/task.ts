
import { Task } from "@/Services/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ProjectState {
  curTask: Task | null;
}

const initialState: ProjectState = {
  curTask: null
};
const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setCurTask: (state, action: PayloadAction<Task | null>) => {
      state.curTask = action.payload;
    }
  },
});
export const {
  setCurTask
} = slice.actions;

export const taskReducers = slice.reducer;
