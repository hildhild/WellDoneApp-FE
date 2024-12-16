import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface NotificationState {
  id: string | null;
}

const initialState: NotificationState = {
  id: null,
};
const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.id = id;
    },
    clearId: (state) => {
      state.id = null;
    },
  },
});
export const { setId, clearId } = slice.actions;

export const notificationReducers = slice.reducer;