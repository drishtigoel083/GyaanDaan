import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", data);
      localStorage.setItem("token", res.data.token);
      navigate("/upload");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] relative overflow-hidden font-mono">
      {/* Decorative dots background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 2px, transparent 0)", backgroundSize: "40px 40px" }}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10 w-full max-w-md bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10"
      >
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-2 leading-none">
          Join Us
        </h2>
        <p className="font-bold text-gray-600 mb-8 uppercase tracking-widest">
          Start sharing notes ✨
        </p>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-xl font-black uppercase mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
              placeholder="YOUR NAME"
              className="w-full px-4 py-3 bg-white border-4 border-black font-bold outline-none focus:bg-[#FFB7D5] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xl font-black uppercase mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="YOU@EXAMPLE.COM"
              className="w-full px-4 py-3 bg-white border-4 border-black font-bold outline-none focus:bg-[#FFB7D5] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xl font-black uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white border-4 border-black font-bold outline-none focus:bg-[#FFB7D5] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#B2F39D] border-4 border-black font-black text-2xl uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all active:scale-95"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="text-center font-bold mt-10 uppercase">
          Got an account?{" "}
          <Link
            to="/login"
            className="underline decoration-4 decoration-[#FFD363] hover:bg-[#FFD363] transition-colors"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;


