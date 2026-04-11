import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminSupport = () => {
  const [supports, setSupports] = useState([]);
  const [reply, setReply] = useState({});

  // ================= GET SUPPORT =================
  const getSupports = async () => {
    try {
      const res = await axios.get("/support/all");
      console.log(res.data.data);
      setSupports(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSupports();
  }, []);

  // ================= SEND REPLY =================
  const sendReply = async (id) => {
    try {
      await axios.put(`/support/reply/${id}`, {
        reply: reply[id]
      });

      setReply({ ...reply, [id]: "" });
      getSupports();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Support Requests
      </h1>

      {supports.length > 0 ? (

        <div className="space-y-4">

          {supports.map((s) => (

            <div key={s._id} className="bg-white p-5 rounded-xl shadow">

              {/* USER INFO */}
              <div className="mb-2">
                <p className="font-bold text-gray-800">
                  {s.name}
                </p>
                <p className="text-sm text-gray-500">
                  {s.email}
                </p>
              </div>

              {/* SUBJECT */}
              <p className="text-sm font-semibold text-blue-600 mb-2">
                {s.subject}
              </p>

              {/* MESSAGE */}
              <p className="text-gray-700 mb-3">
                {s.message}
              </p>

              {/* STATUS */}
              <span className={`px-3 py-1 text-xs rounded-full ${
                s.status === "Pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}>
                {s.status}
              </span>

              {/* DATE */}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(s.createdAt).toLocaleString()}
              </p>

              {/* REPLY INPUT */}
              <div className="flex gap-2 mt-4">
                <input
                  value={reply[s._id] || ""}
                  onChange={(e) =>
                    setReply({ ...reply, [s._id]: e.target.value })
                  }
                  placeholder="Type reply..."
                  className="border p-2 flex-1 rounded"
                />

                <button
                  onClick={() => sendReply(s._id)}
                  className="bg-blue-600 text-white px-4 rounded"
                >
                  Reply
                </button>
              </div>

            </div>
          ))}

        </div>

      ) : (
        <p className="text-center text-gray-500">
          No support requests found
        </p>
      )}

    </div>
  );
};

export default AdminSupport;