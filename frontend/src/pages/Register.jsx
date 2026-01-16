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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519681393784-d120267933ba')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Create Your Account ✨
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Start sharing and saving notes
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full mt-1 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
