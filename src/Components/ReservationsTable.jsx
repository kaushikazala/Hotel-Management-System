import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelReservation, removeReservation } from "../redux/features/reservationsSlice";
import { useNavigate } from "react-router-dom";

export default function ReservationsTable(){
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user } = useSelector(s=>s.auth);
  const rows = useSelector(s=> s.reservations.items.filter(r=>r.userId===user.id));
  const [sort, setSort] = React.useState("date-desc");
  const sorted = React.useMemo(()=>{
    return [...rows].sort((a,b)=>{
      switch(sort){
        case "date-asc": return new Date(a.createdAt)-new Date(b.createdAt);
        case "checkin": return new Date(a.checkIn)-new Date(b.checkIn);
        default: return new Date(b.createdAt)-new Date(a.createdAt);
      }
    });
  },[rows, sort]);

  return (
    <section className="section">
      <div className="row" style={{justifyContent:"space-between"}}>
        <h2>My Reservations</h2>
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="date-desc">Newest</option>
          <option value="date-asc">Oldest</option>
          <option value="checkin">Check‑in</option>
        </select>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Room</th>
              <th>Name</th>
              <th>Guests</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(r=> (
              <tr key={r.id}>
                <td>{r.roomId}</td>
                <td>{r.name}</td>
                <td>{r.guests}</td>
                <td>{r.checkIn} → {r.checkOut}</td>
                <td>${r.price}</td>
                <td><span className="badge">{r.status}</span></td>
                <td className="row">
                  <button className="ghost" onClick={()=>nav(`/reserve/${r.roomId}?edit=${r.id}`)}>Edit</button>
                  {r.status!=="canceled" ? (
                    <button className="warning" onClick={()=>dispatch(cancelReservation(r.id))} style={{background:"var(--warning)"}}>Cancel</button>
                  ) : (
                    <button className="danger" onClick={()=>dispatch(removeReservation(r.id))}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}