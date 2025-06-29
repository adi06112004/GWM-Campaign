import React, { useEffect, useState } from "react";

const LeadList = ({ campaignId }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false); // NEW STATE for popup

  useEffect(() => {
    fetchLeads();
  }, [campaignId]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://gwm-campaign-backend.onrender.com/api/leads/${campaignId}`);
      const data = await res.json();
      if (res.ok) {
        setLeads(data);
      } else {
        setError(data.error || "❌ Failed to fetch leads");
      }
    } catch {
      setError("❌ Server error");
    }
    setLoading(false);
  };

  const handleDelete = async (leadId) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    setDeleting(true);  // Show popup
    try {
      const res = await fetch(`https://gwm-campaign-backend.onrender.com/api/leads/delete/${leadId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLeads(leads.filter((lead) => lead._id !== leadId));
      } else {
        alert("Failed to delete lead");
      }
    } catch {
      alert("Server error while deleting");
    }
    setDeleting(false);  // Hide popup
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <p className="text-yellow-400 text-lg animate-pulse">Loading leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 p-6 relative">
      <div className="max-w-4xl mx-auto bg-gray-800/70 border border-gray-700 rounded-2xl shadow-2xl p-5 backdrop-blur">
        <h2 className="text-2xl font-black text-yellow-400 text-center mb-4 drop-shadow">📋 Leads for: {campaignId}</h2>

        {leads.length === 0 ? (
          <p className="text-center text-gray-400">No leads found for this campaign.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-black">
                <tr>
                  <th className="py-2 px-3">👤 Name</th>
                  <th className="py-2 px-3">📞 Mobile</th>
                  <th className="py-2 px-3">💳 UPI</th>
                  <th className="py-2 px-3">⏰ Submitted At</th>
                  <th className="py-2 px-3">❌ Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-b text-white border-gray-700 hover:bg-gray-700/50 transition">
                    <td className="py-2 px-3">{lead.name}</td>
                    <td className="py-2 px-3">{lead.mobile}</td>
                    <td className="py-2 px-3">{lead.upi}</td>
                    <td className="py-2 px-3">{new Date(lead.createdAt).toLocaleString()}</td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="bg-gradient-to-r hover:cursor-pointer from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 active:scale-95 transition-transform duration-150 text-white rounded px-2 py-1 text-xs font-bold shadow-md"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleting && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-pink-500 rounded-xl p-6 text-center shadow-2xl">
            <h3 className="text-pink-400 font-bold text-lg mb-2">⏳ Please wait...</h3>
            <p className="text-gray-300 text-sm">We are deleting the lead...</p>
            <div className="mt-3 animate-pulse text-yellow-400 font-bold">Processing...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadList;
