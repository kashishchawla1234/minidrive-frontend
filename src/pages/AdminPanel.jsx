import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Trash2 } from "lucide-react";

export default function AdminPanel() {
  const [allFiles, setAllFiles] = useState([]);
  const { user } = useContext(AuthContext);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${API_URL}/api/admin/files`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setAllFiles(res.data))
      .catch(console.error);
  }, [user]);

  const openDeleteModal = (file) => {
    setFileToDelete(file);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/files/${fileToDelete._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAllFiles((prev) => prev.filter((f) => f._id !== fileToDelete._id));
      setShowModal(false);
      setFileToDelete(null);
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#fffaf5] to-[#f8ede3] p-8 overflow-hidden">
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(245, 240, 235, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              border: "10px solid #e0b083",
              borderBottomColor: "transparent",
              animation: "spin 1.5s linear infinite",
              boxShadow: "0 0 15px rgba(224, 176, 131, 0.4)",
            }}
          ></div>
          <p style={{ marginTop: "20px", color: "#3a2e25", fontWeight: "500" }}>
            Deleting...
          </p>
          <style>
            {`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}

      <h2 className="text-3xl font-semibold mb-6 text-[#3a2e25]">
        Admin Dashboard
      </h2>

      {allFiles.length === 0 ? (
        <p className="text-gray-500">No files uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {allFiles.map((file) => (
            <div
              key={file._id}
              className="relative p-5 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl border border-[#e6b17e]/30 hover:scale-[1.02] transition-transform"
            >
              <button
                onClick={() => openDeleteModal(file)}
                className="absolute top-3 right-3 text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
              <p className="font-semibold truncate text-[#3a2e25]">
                {file.filename}
              </p>
              <p className="text-sm text-gray-500">
                Owner:{" "}
                <span className="text-[#e6b17e]">
                  {file.ownerEmail || "Unknown"}
                </span>
              </p>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e6b17e] text-sm underline"
              >
                View / Download
              </a>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-96 text-center border border-[#e6b17e]/30 animate-fadeIn">
            <h3 className="text-xl font-semibold text-[#3a2e25] mb-4">
              Delete File?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-[#e6b17e]">
                {fileToDelete?.filename}
              </span>{" "}
              owned by{" "}
              <span className="font-medium text-[#e6b17e]">
                {fileToDelete?.ownerEmail}
              </span>
              ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-lg bg-[#e6b17e] text-white hover:bg-[#e2a66d] transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
