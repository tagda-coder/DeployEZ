import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Layout, Mail, Lock, ArrowLeft, User, Eye, EyeOff } from "lucide-react";

// components
import BackgroundPattern from "../../shared/components/BackgroundPattern";
import { ThemeToggle } from "../../shared/components/ThemeToggle";

// hooks
import { useAuth } from "../hook/useAuth";

const Auth = () => {
  const navigate = useNavigate();
  const { actionLoading, handleRegister, handleLogin } = useAuth();

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Register ──────────────────────────────────────────────────────────────
  // Backend: POST /api/auth/signup → sets httpOnly cookie + returns { Message, user }
  // No email verification step on backend → redirect to dashboard immediately.
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    if (result?.user) {
      navigate("/");
    }
  };

  // ── Login ─────────────────────────────────────────────────────────────────
  // Backend: POST /api/auth/login accepts email OR username + password.
  // The email input on the login form doubles as email-or-username for simplicity.
  // If the user types a value without "@" we treat it as username.
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const rawInput = formData.email.trim();
    const isEmail = rawInput.includes("@");

    const result = await handleLogin({
      email: isEmail ? rawInput : undefined,
      username: !isEmail ? rawInput : undefined,
      password: formData.password,
    });

    if (result?.user) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-base) text-(--text-base) font-sans selection:bg-neutral-500/30 overflow-hidden relative px-4 transition-colors duration-700">
      <BackgroundPattern />

      {/* Top Controls */}
      <button
        onClick={() => navigate("/landing")}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-sm font-medium text-(--text-muted) hover:text-(--text-muted-hover) transition-colors group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Landing Page
      </button>
      <ThemeToggle style="absolute top-6 right-6" />

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="w-full max-w-md relative z-10 bg-(--card-bg) border border-(--card-border) rounded-3xl p-8 shadow-2xl overflow-hidden animate-[fadeIn_0.5s_ease-out]"
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 dark:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.03), transparent 40%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-neutral-900 dark:bg-white p-3 rounded-2xl mb-4 shadow-sm transform transition-transform hover:scale-105 duration-300">
              <Layout className="w-8 h-8 text-white dark:text-neutral-900" />
            </div>
            <h2 className="text-3xl font-medium tracking-tight mb-2 text-(--text-primary)">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-(--text-muted) font-light text-center">
              {isLogin
                ? "Enter your email (or username) to access your workspace."
                : "Start deploying your projects in seconds."}
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
          >
            {/* Username — signup only */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${isLogin ? "max-h-0 opacity-0" : "max-h-25 opacity-100"}`}
            >
              <div className="space-y-1.5 pb-2">
                <label className="text-sm font-medium text-(--text-label) ml-1">
                  Username
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--color-icon) group-focus-within:text-(--color-icon-active) transition-colors" />
                  <input
                    required={!isLogin}
                    type="text"
                    name="username"
                    placeholder="janedoe"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full bg-(--input-bg) border border-(--input-border) rounded-xl py-3 pl-12 pr-4 text-(--color-input) placeholder:text-(--color-placeholder) focus:outline-none focus:border-(--input-border-focus) transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Email / username (login) */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-(--text-label) ml-1">
                {isLogin ? "Email or Username" : "Email Address"}
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--color-icon) group-focus-within:text-(--color-icon-active) transition-colors" />
                <input
                  required
                  type={isLogin ? "text" : "email"}
                  name="email"
                  placeholder={isLogin ? "you@example.com or janedoe" : "you@example.com"}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-(--input-bg) border border-(--input-border) rounded-xl py-3 pl-12 pr-4 text-(--color-input) placeholder:text-(--color-placeholder) focus:outline-none focus:border-(--input-border-focus) transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-(--text-label) ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--color-icon) group-focus-within:text-(--color-icon-active) transition-colors" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-(--input-bg) border border-(--input-border) rounded-xl py-3 pl-12 pr-12 text-(--color-input) placeholder:text-(--color-placeholder) focus:outline-none focus:border-(--input-border-focus) transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-(--color-icon) hover:text-(--color-icon-active) transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-(--btn-primary-bg) hover:bg-(--btn-primary-bg-hover) text-(--btn-primary-text) hover:text-(--btn-primary-text-hover) font-medium py-3.5 rounded-xl transition-colors shadow-lg cursor-pointer disabled:bg-(--btn-disabled-bg) disabled:cursor-not-allowed"
              >
                {actionLoading
                  ? isLogin
                    ? "Signing in..."
                    : "Creating account..."
                  : isLogin
                    ? "Sign In"
                    : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-neutral-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setShowPassword(false);
                setFormData({ username: "", email: "", password: "" });
              }}
              className="text-(--color-link) font-medium hover:text-(--color-link-hover) transition-colors cursor-pointer"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;