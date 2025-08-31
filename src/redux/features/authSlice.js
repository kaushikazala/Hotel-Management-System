import { createSlice } from "@reduxjs/toolkit";
import { getLS, setLS, removeLS } from "../../utils/localStorage";

const initial = getLS("auth") || { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    signup: (state, action) => {
      const { name, email, password } = action.payload;
      const users = getLS("users") || [];
      if (users.find(u => u.email === email)) throw new Error("Email already registered");
      const user = { id: crypto.randomUUID(), name, email, password };
      setLS("users", [...users, user]);
      state.user = { id: user.id, name: user.name, email: user.email };
      setLS("auth", { user: state.user });
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const users = getLS("users") || [];
      const u = users.find(x => x.email === email && x.password === password);
      if (!u) throw new Error("Invalid credentials");
      state.user = { id: u.id, name: u.name, email: u.email };
      setLS("auth", { user: state.user });
    },
    logout: (state) => {
      state.user = null;
      removeLS("auth");
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;