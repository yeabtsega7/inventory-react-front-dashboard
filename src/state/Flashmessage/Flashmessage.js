import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Flashmessages: [],
};

export const errorSlice = createSlice({
  name: "Flashmessage",
  initialState,
  reducers: {
    setFlashmessages: (state, action) => {
      const Flashmessages = {
        id: action.payload.id,
        message: action.payload.message,
        error: action.payload.error,
      };
      state.Flashmessages.push(Flashmessages);
    },
    removeFlashmessages: (state, action) => {
      state.Flashmessages = state.Flashmessages.filter(
        (error) => error.id !== action.payload.id
      );
    },
  },
});

export const { setFlashmessages, removeFlashmessages } = errorSlice.actions;

export default errorSlice.reducer;
