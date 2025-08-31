import React from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/features/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Signup(){
  const [form,setForm]=React.useState({name:"",email:"",password:""});
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <section className="section">
      <div className="card" style={{maxWidth:480, margin:"0 auto"}}>
        <h2>Sign up</h2>
        <form className="grid" style={{gap:".8rem"}} onSubmit={(e)=>{e.preventDefault(); try{dispatch(signup(form)); nav("/");}catch(err){alert(err.message)}}}>
          <label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></label>
          <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></label>
          <label>Password<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/></label>
          <button type="submit">Create Account</button>
        </form>
        <p style={{marginTop:".6rem"}}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </section>
  );
}