import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, selectFilteredSortedRooms } from "../redux/features/roomsSlice";
import { useNavigate } from "react-router-dom";

export default function RoomsGrid(){
  const dispatch = useDispatch();
  const filters = useSelector(s=>s.rooms.filters);
  const status = useSelector(s=>s.rooms.status);
  const rooms = useSelector(selectFilteredSortedRooms);
  const nav = useNavigate();

  return (
    <section className="section">
      <small>Luxury Suites</small>
      <h2>Our Best <span>Rooms</span></h2>

      <div className="toolbar">
        <input placeholder="Search rooms" value={filters.q} onChange={e=>dispatch(setFilter({q:e.target.value}))} />
        <select value={filters.category} onChange={e=>dispatch(setFilter({category:e.target.value}))}>
          <option value="all">All</option>
          <option value="suite">Suite</option>
          <option value="deluxe">Deluxe</option>
          <option value="family">Family</option>
        </select>
        <select value={filters.sort} onChange={e=>dispatch(setFilter({sort:e.target.value}))}>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating">Rating</option>
        </select>
        <input type="number" min={0} placeholder="Min ₹" value={filters.minPrice} onChange={e=>dispatch(setFilter({minPrice:Number(e.target.value)||0}))} />
        <input type="number" min={0} placeholder="Max ₹" value={filters.maxPrice} onChange={e=>dispatch(setFilter({maxPrice:Number(e.target.value)||10000}))} />
      </div>

      {status === "loading" && <div className="card">Loading rooms…</div>}
      {status === "failed" && <div className="card">Failed to load rooms.</div>}

      <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))"}}>
        {rooms.map(r=> (
          <div key={r.id} className="card room-card">
            <img src={r.image} alt={r.name} />
            <div>
              <h3>{r.name}</h3>
              <p><span className="price">${r.price}/N</span> · {r.beds} bed · up to {r.guests} guests · {r.size}m²</p>
              <p><span className="badge">{r.category}</span> <span className="badge">⭐ {r.rating}</span></p>
              <div className="row">
                <button onClick={()=>nav(`/reserve/${r.id}`)}>Book Now</button>
                <button className="ghost" onClick={()=>nav(`/reserve/${r.id}`)}>Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}