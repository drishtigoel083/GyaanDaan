import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Upload, Compass, LayoutDashboard, Bookmark, User, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { name: "Explore", path: "/explore", icon: Compass },
    { name: "Upload", path: "/upload", icon: Upload },
    ...(token
      ? [
          { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
          { name: "Saved", path: "/saved-notes", icon: Bookmark },
          { name: "Profile", path: "/profile", icon: User },
        ]
      : []),
  ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-5 border-b-4 border-black bg-white sticky top-0 z-50 shadow-[0_4px_0_0_rgba(0,0,0,1)] font-mono">
      <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter flex items-center gap-2">
        <span className="bg-[#B2F39D] px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          GD
        </span>
        GYAANDAAN
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 items-center">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 font-bold text-base px-3 py-1.5 rounded transition-all ${
                isActive
                  ? "bg-[#FFD363] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "hover:underline decoration-4 underline-offset-4"
              }`}
            >
              <Icon className="w-4 h-4" />
              {link.name}
            </Link>
          );
        })}

        {token ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 border-3 border-black bg-[#FFB7D5] font-black text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 border-3 border-black bg-[#FFD363] font-black text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 border-3 border-black bg-[#B2F39D] font-black text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 border-2 border-black bg-[#FFD363] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b-4 border-black p-6 shadow-[0_8px_0_0_rgba(0,0,0,1)] flex flex-col gap-4 z-50">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 font-black text-lg p-3 border-2 border-black ${
                  isActive ? "bg-[#FFD363]" : "bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}

          {token ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center justify-center gap-2 w-full p-3 border-3 border-black bg-[#FFB7D5] font-black text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center w-full p-3 border-3 border-black bg-[#FFD363] font-black text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center w-full p-3 border-3 border-black bg-[#B2F39D] font-black text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
