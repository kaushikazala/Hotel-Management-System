import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

export const fetchRooms = createAsyncThunk("rooms/fetch", async () => {
  const res = await fetch("/src/data/rooms.json");
  if (!res.ok) throw new Error("Failed to load rooms");
  return await res.json();
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState: { items: [], status: "idle", error: null, filters: { q: "", category: "all", minPrice: 0, maxPrice: 10000, sort: "price-asc" } },
  reducers: {
    setFilter: (state, action) => { state.filters = { ...state.filters, ...action.payload }; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (s) => { s.status = "loading"; })
      .addCase(fetchRooms.fulfilled, (s, a) => { s.status = "succeeded"; s.items = a.payload; })
      .addCase(fetchRooms.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; });
  },
});

export const { setFilter } = roomsSlice.actions;
export default roomsSlice.reducer;

export const selectFilteredSortedRooms = createSelector(
  [(s)=>s.rooms.items,(s)=>s.rooms.filters],
  (items, f) => {
    let out = items.filter(r =>
      r.name.toLowerCase().includes(f.q.toLowerCase()) &&
      (f.category === "all" || r.category === f.category) &&
      r.price>=f.minPrice && r.price<=f.maxPrice
    );
    out = [...out].sort((a,b)=>{
      switch(f.sort){
        case "price-desc": return b.price-a.price;
        case "rating": return b.rating-a.rating;
        default: return a.price-b.price;
      }
    });
    return out;
  }
);