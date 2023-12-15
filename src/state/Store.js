import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./Auth/Auth";
import authSlice from "./Auth/Auth";
import errorSlice from "./Flashmessage/Flashmessage";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    Flashmessage: errorSlice,
  },
});

// // Path: src/state/slices/counter.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     value: 0
// };

// export const counterSlice = createSlice({
//     name: "counter",
//     initialState,
//     reducers: {
//         increment: state => {
//             state.value += 1;
//         },
//         decrement: state => {
//             state.value -= 1;
//         },
//         incrementByAmount: (state, action) => {
//             state.value += action.payload;
//         }
//     }
// });

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export default counterSlice.reducer;

// // Path: src/state/slices/index.js
// import { combineReducers } from "@reduxjs/toolkit";
// import counterReducer from "./counter";

// export default combineReducers({
//     counter: counterReducer
// });
