import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function Login(){
  const [form,setForm]=React.useState({email:"",password:""});
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/";

  return (
    <section className="section">
      <div className="card" style={{maxWidth:420, margin:"0 auto"}}>
        <h2>Login</h2>
        <form className="grid" style={{gap:".8rem"}} onSubmit={(e)=>{e.preventDefault(); try{dispatch(login(form)); nav(from,{replace:true});}catch(err){alert(err.message)}}}>
          <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></label>
          <label>Password<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/></label>
          <button type="submit">Login</button>
        </form>
        <p style={{marginTop:".6rem"}}>No account? <Link to="/signup">Create one</Link></p>
      </div>
    </section>
  );
}