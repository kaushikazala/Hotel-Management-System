import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import roomsReducer from "./features/roomsSlice";
import reservationsReducer from "./features/reservationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    reservations: reservationsReducer,
  },
});