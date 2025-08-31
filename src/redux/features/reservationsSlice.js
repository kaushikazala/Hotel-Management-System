import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getLS, setLS } from "../../utils/localStorage";

const initial = getLS("reservations") || [];

const reservationsSlice = createSlice({
  name: "reservations",
  initialState: { items: initial },
  reducers: {
    createReservation: {
      reducer: (state, action) => {
        state.items.push(action.payload);
        setLS("reservations", state.items);
      },
      prepare: ({ userId, roomId, name, guests, checkIn, checkOut, price }) => ({
        payload: { id: nanoid(), userId, roomId, name, guests, checkIn, checkOut, price, status: "booked", createdAt: new Date().toISOString() }
      })
    },
    updateReservation: (state, action) => {
      const idx = state.items.findIndex(r => r.id === action.payload.id);
      if (idx !== -1) { state.items[idx] = { ...state.items[idx], ...action.payload.updates }; setLS("reservations", state.items); }
    },
    cancelReservation: (state, action) => {
      const r = state.items.find(x=>x.id===action.payload);
      if (r) { r.status = "canceled"; setLS("reservations", state.items); }
    },
    removeReservation: (state, action) => {
      state.items = state.items.filter(r=>r.id!==action.payload);
      setLS("reservations", state.items);
    }
  }
});

export const { createReservation, updateReservation, cancelReservation, removeReservation } = reservationsSlice.actions;
export default reservationsSlice.reducer;