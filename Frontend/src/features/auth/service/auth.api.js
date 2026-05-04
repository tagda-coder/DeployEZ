import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // send cookies with every request
});

// ─── Backend endpoints (auth.route.js) ───────────────────────────────────────
// POST /api/auth/signup
// POST /api/auth/login
// POST /api/auth/logout  (protected)
//
// NOTE: /get-me, /verify-email, /resend-verification, /delete-account do NOT
// exist in the backend yet. They are stubbed below so the frontend compiles,
// but they will 404 until you add them server-side.
// ─────────────────────────────────────────────────────────────────────────────

export const register = async ({ username, email, password }) => {
  const response = await api.post("/api/auth/signup", {
    username,
    email,
    password,
  });
  // Backend returns: { Message, user }  — normalise to camelCase for FE
  const { Message, user } = response.data;
  return { message: Message, user };
};

export const login = async ({ email, username, password }) => {
  const response = await api.post("/api/auth/login", {
    email,
    username,
    password,
  });
  // Backend returns: { success, Message, user }
  const { Message, user, success } = response.data;
  return { message: Message, user, success };
};

export const logoutUser = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

// ── Stubs for features not yet in backend ────────────────────────────────────

export const getMe = async () => {
  // TODO: add GET /api/auth/get-me to backend
  // For now we return null so handleInitAuth sets user to null safely
  const response = await api.get("/api/auth/get-me");
  return response.data;
};

export const verifyEmail = async ({ email, code }) => {
  // TODO: add POST /api/auth/verify-email to backend
  const response = await api.post("/api/auth/verify-email", { email, code });
  return response.data;
};

export const resendVerificationEmail = async ({ email }) => {
  // TODO: add POST /api/auth/resend-verification to backend
  const response = await api.post("/api/auth/resend-verification", { email });
  return response.data;
};

export const deleteAccount = async () => {
  // TODO: add DELETE /api/auth/delete-account to backend
  const response = await api.delete("/api/auth/delete-account");
  return response.data;
};