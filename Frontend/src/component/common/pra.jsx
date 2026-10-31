import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Palette,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";

// Update this import if your authAPI uses a different export name.
import { login } from "../../services/opertions/authAPI";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await dispatch(login(email, password, navigate));
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#faf8f4] lg:flex">
      {/* Left Section */}
      <div className="relative hidden min-h-screen w-5/12 flex-col justify-between overflow-hidden bg-[#f5eee5] p-10 lg:flex xl:p-14">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#e9c9a9]/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#d65f27]/10 blur-3xl" />

        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d65f27] text-white">
            <Palette size={25} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#302820]">
            Artify
          </span>
        </Link>

        {/* Illustration */}
        <div className="relative z-10 mx-auto my-10 w-full max-w-md">
          <div className="absolute -left-5 top-8 h-20 w-20 rounded-2xl bg-white/70 shadow-lg" />
          <div className="absolute -right-4 bottom-12 h-24 w-24 rounded-full bg-[#e8b18e]/40" />

          <img
            src="/images/painting.png"
            alt="Creative painting supplies"
            className="relative z-10 mx-auto max-h-[390px] w-full rounded-3xl object-contain"
          />

          <div className="absolute -bottom-5 left-1/2 z-20 w-[85%] -translate-x-1/2 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0e8] text-[#d65f27]">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="font-semibold text-[#302820]">
                  Creativity starts here
                </p>
                <p className="text-xs text-stone-500">
                  Make something beautiful today.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold leading-tight text-[#302820] xl:text-5xl">
            Welcome back to
            <span className="text-[#d65f27]"> Artify.</span>
          </h1>
          <p className="mt-5 text-base leading-7 text-stone-600">
            Your creative journey continues here. Sign in and bring your
            imagination to life.
          </p>

          <div className="mt-8 flex gap-2">
            <span className="h-1.5 w-8 rounded-full bg-[#d65f27]" />
            <span className="h-1.5 w-3 rounded-full bg-[#d8c6b6]" />
            <span className="h-1.5 w-3 rounded-full bg-[#d8c6b6]" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex min-h-screen w-full items-center justify-center px-5 py-10 sm:px-10 lg:w-7/12 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link
            to="/"
            className="mb-10 flex items-center justify-center gap-3 lg:hidden"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d65f27] text-white">
              <Palette size={25} />
            </div>
            <span className="text-2xl font-bold text-[#302820]">Artify</span>
          </Link>

          <div className="rounded-3xl border border-[#eee6dd] bg-white p-6 shadow-[0_15px_50px_rgba(70,45,25,0.06)] sm:p-10">
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d65f27]">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold text-[#302820] sm:text-4xl">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-500">
                Enter your details below to access your Artify account.
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#40372f]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={changeHandler}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-[#e8dfd6] bg-[#fdfcfb] py-3.5 pl-12 pr-4 text-sm text-[#302820] outline-none transition placeholder:text-stone-400 focus:border-[#d65f27] focus:ring-4 focus:ring-[#d65f27]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#40372f]"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-[#d65f27] transition hover:text-[#a94318]"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={changeHandler}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-[#e8dfd6] bg-[#fdfcfb] py-3.5 pl-12 pr-12 text-sm text-[#302820] outline-none transition placeholder:text-stone-400 focus:border-[#d65f27] focus:ring-4 focus:ring-[#d65f27]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 transition hover:text-[#d65f27]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d65f27] py-3.5 font-semibold text-white shadow-lg shadow-[#d65f27]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#bd4e1e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Login to Account"}
                {!loading && <ArrowRight size={19} />}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#eee6dd]" />
              <span className="text-xs text-stone-400">NEW TO ARTIFY?</span>
              <div className="h-px flex-1 bg-[#eee6dd]" />
            </div>

            <p className="text-center text-sm text-stone-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-[#d65f27] transition hover:text-[#a94318]"
              >
                Create Account
              </Link>
            </p>
          </div>

          <p className="mt-7 text-center text-xs text-stone-400">
            © {new Date().getFullYear()} Artify. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;