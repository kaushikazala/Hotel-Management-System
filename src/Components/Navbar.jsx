import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice";

export default function Navbar(){
  const { user } = useSelector(s=>s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand">Royal</NavLink>
        <div className="menu">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="services">Services</NavLink>
          <NavLink to="amenities">Amenities</NavLink>
          <NavLink to="testimonials">Testimonials</NavLink>
        </div>
        <div className="row">
          {user ? (
            <>
              <span className="badge">Hi, {user.name.split(" ")[0]}</span>
              <button className="ghost" onClick={()=>nav("/reservations")}>My Reservations</button>
              <button onClick={()=>{dispatch(logout()); nav("/");}}>Logout</button>
            </>
          ) : (
            <>
              <button className="ghost" onClick={()=>nav("/login")}>Login</button>
              <button onClick={()=>nav("/signup")}>Sign up</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}