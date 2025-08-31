export const getLS = (key) => {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
export const setLS = (key, val) => localStorage.setItem(key, JSON.stringify(val));
export const removeLS = (key) => localStorage.removeItem(key);