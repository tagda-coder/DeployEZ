import { useContext } from "react";
import {
  deleteAccount,
  getMe,
  login,
  logoutUser,
  register,
  resendVerificationEmail,
  verifyEmail,
} from "../service/auth.api";
import { AuthContext } from "../auth.context";
import { toast } from "react-toastify";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");

  const {
    actionLoading,
    authLoading,
    setAuthLoading,
    actionType,
    setActionType,
    setActionLoading,
    user,
    setUser,
  } = context;

  // ── Register ──────────────────────────────────────────────────────────────
  // Backend: POST /api/auth/signup → { message, user }
  // No email-verification step exists in backend yet, so we log the user in
  // immediately after signup.
  async function handleRegister({ email, username, password }) {
    setActionLoading(true);
    try {
      const data = await register({ email, username, password });
      toast.success(data.message || "Account created successfully!");
      setUser(data.user);
      return data; // caller checks data.user to redirect
    } catch (error) {
      toast.error(
        error.response?.data?.Message ||
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setActionLoading(false);
    }
  }

  // ── Login ─────────────────────────────────────────────────────────────────
  // Backend accepts email OR username + password
  async function handleLogin({ email, username, password }) {
    setActionLoading(true);
    try {
      const data = await login({ email, username, password });
      toast.success(data.message || "Login successful!");
      setUser(data.user);
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.Message ||
          error.response?.data?.message ||
          "Invalid credentials.",
      );
    } finally {
      setActionLoading(false);
    }
  }

  // ── Logout ────────────────────────────────────────────────────────────────
  // Backend: POST /api/auth/logout  (cookie-based, requires auth middleware)
  async function handleLogout() {
    setActionLoading(true);
    try {
      const data = await logoutUser();
      setUser(null);
      sessionStorage.removeItem("pendingEmail");
      toast.success("Logged out successfully.");
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again.",
      );
    } finally {
      setActionLoading(false);
    }
  }

  // ── Delete account (stub — backend endpoint TODO) ──────────────────────
  async function handleDeleteAccount() {
    setActionLoading(true);
    try {
      const data = await deleteAccount();
      setUser(null);
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not delete account.",
      );
    } finally {
      setActionLoading(false);
    }
  }

  // ── Get current user (stub — backend endpoint TODO) ──────────────────────
  // Called once on app mount to re-hydrate the user from the cookie session.
  // Until GET /api/auth/get-me exists on the backend, this will 404 and user
  // will remain null (requiring re-login after refresh).
  async function handleGetMe() {
    setActionLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);
      return data;
    } catch {
      setUser(null);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleInitAuth() {
    try {
      const data = await getMe();
      setUser(data?.user ?? null);
      return data;
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }

  // ── Email verify (stub — backend endpoint TODO) ───────────────────────────
  async function handleVerifyEmail({ email, code }) {
    setActionLoading(true);
    try {
      const data = await verifyEmail({ email, code });
      toast.success(data.message);
      setUser(data.user);
      sessionStorage.removeItem("pendingEmail");
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid verification code.",
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function handleResendVerification({ email }) {
    setActionLoading(true);
    setActionType("resend");
    try {
      const data = await resendVerificationEmail({ email });
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not resend code.",
      );
    } finally {
      setActionLoading(false);
      setActionType(null);
    }
  }

  return {
    actionLoading,
    authLoading,
    user,
    actionType,
    handleRegister,
    handleLogin,
    handleLogout,
    handleDeleteAccount,
    handleGetMe,
    handleInitAuth,
    handleVerifyEmail,
    handleResendVerification,
  };
};