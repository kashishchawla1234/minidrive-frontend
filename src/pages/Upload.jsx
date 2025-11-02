import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import style from "./Upload.module.css";

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [output, setOutput] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file first");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:5000/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${user?.token}` },
      });
      if (res.status === 200) setOutput("success");
    } catch {
      setOutput("error");
    }
    setTimeout(() => {
      setOutput(null);
      navigate("/");
    }, 1200);
    setLoading(false);
  };

  return (
    <>
      {loading && <div className={style.loading}><div className={style.loader}></div></div>}
      <div className="max-w-md mx-auto mt-10 p-8 bg-[var(--bg-card)] rounded-lg shadow border border-[var(--accent)]/40">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Upload a File</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[var(--accent)] outline-none"
          />
          <button
            type="submit"
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-gray-800 font-medium py-2 rounded-md"
          >
            Upload
          </button>
        </form>
      </div>
      {output === "error" && <div className={`${style.smackbar} ${style.error}`}>Upload Failed</div>}
      {output === "success" && <div className={`${style.smackbar}`}>Upload Success</div>}
    </>
  );
}
