import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="backdrop-blur-md bg-white/80 shadow-sm sticky top-0 z-50 border-b border-[var(--accent)]/30">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-gray-800 tracking-wide">
          Mini Drive
        </Link>

        <div className="flex items-center gap-5">
          {user ? (
            <>
              <Link to="/upload" className="text-gray-700 hover:text-gray-900 font-medium">
                Upload
              </Link>
              <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
                My Files
              </Link>
              {user.isAdmin && (
                <Link to="/admin" className="text-gray-700 hover:text-gray-900 font-medium">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-md text-gray-800 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900 font-medium">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-md text-gray-800 font-medium"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
