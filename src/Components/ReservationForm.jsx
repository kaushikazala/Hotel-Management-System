import React, { useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReservation, updateReservation } from "../redux/features/reservationsSlice";

export default function ReservationForm(){
  const { roomId } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(s=>s.auth.user);
  const room = useSelector(s=>s.rooms.items.find(r=>r.id===roomId));
  const search = new URLSearchParams(useLocation().search);
  const resId = search.get("edit");
  const existing = useSelector(s=> s.reservations.items.find(r=> r.id===resId));

  const [form, setForm] = React.useState(()=> existing || { name: user?.name || "", guests: 1, checkIn: "", checkOut: "" });

  const nights = useMemo(()=> {
    const a = form.checkIn? new Date(form.checkIn) : null;
    const b = form.checkOut? new Date(form.checkOut) : null;
    if(!a||!b) return 0;
    const diff = Math.ceil((b-a)/(1000*60*60*24));
    return Math.max(0, diff);
  },[form.checkIn, form.checkOut]);

  if (!room && !existing) return <div className="card">Room not found.</div>;
  const effectiveRoom = room || useSelector(s=>s.rooms.items.find(r=>r.id===existing.roomId));

  const price = nights * (effectiveRoom?.price||0);

  return (
    <section className="section">
      <div className="grid" style={{gridTemplateColumns:"1.2fr 1fr"}}>
        <div className="card">
          <h2>{existing? "Update Reservation" : "Reserve Room"}</h2>
          <form onSubmit={(e)=>{
            e.preventDefault();
            if (existing) {
              dispatch(updateReservation({ id: existing.id, updates: { ...form, price } }));
            } else {
              dispatch(createReservation({ userId: user.id, roomId: effectiveRoom.id, name: form.name, guests:Number(form.guests), checkIn: form.checkIn, checkOut: form.checkOut, price }));
            }
            nav("/reservations");
          }} className="grid" style={{gap:".8rem"}}>
            <label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></label>
            <label>Guests<input type="number" min={1} max={effectiveRoom?.guests||10} value={form.guests} onChange={e=>setForm({...form,guests:Number(e.target.value)})} required/></label>
            <label>Check‑in<input type="date" value={form.checkIn} onChange={e=>setForm({...form,checkIn:e.target.value})} required/></label>
            <label>Check‑out<input type="date" value={form.checkOut} onChange={e=>setForm({...form,checkOut:e.target.value})} required/></label>
            <div className="row"><span className="badge">Nights: {nights}</span><span className="badge">Total: ${price}</span></div>
            <div className="row">
              <button type="submit">{existing? "Update" : "Confirm Reservation"}</button>
              <button type="button" className="ghost" onClick={()=>nav(-1)}>Cancel</button>
            </div>
          </form>
        </div>
        <div className="card">
          <img src={effectiveRoom?.image} alt={effectiveRoom?.name} />
          <h3>{effectiveRoom?.name}</h3>
          <p><span className="badge">${effectiveRoom?.price}/N</span> · Max {effectiveRoom?.guests} guests</p>
          <p>Amenities: {effectiveRoom?.amenities?.join(", ")}</p>
        </div>
      </div>
    </section>
  );
}