import React, { useEffect, useState } from "react";

const LeadList = ({ campaignId }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleReward = async (leadId) => {
    try {
      const res = await fetch(`https://gwm-campaign-backend.onrender.com/api/leads/reward/${leadId}`, {
        method: "PUT",
      });
      if (res.ok) {
        fetchLeads();
      } else {
        alert("Failed to mark rewarded");
      }
    } catch {
      alert("Server error while rewarding");
    }
  };

  const handleDelete = async (leadId) => {
    try {
      const res = await fetch(`https://gwm-campaign-backend.onrender.com/api/leads/delete/${leadId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchLeads();
      } else {
        alert("Failed to delete lead");
      }
    } catch {
      alert("Server error while deleting");
    }
  };

  const handleExportPDF = () => {
    window.open(`https://gwm-campaign-backend.onrender.com/api/leads/export/${campaignId}`, "_blank");
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.mobile?.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <p className="text-yellow-400 text-lg animate-pulse">Loading leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-5">
        <h2 className="text-2xl font-black text-yellow-400 text-center mb-4">
          📋 Leads for: {campaignId}
        </h2>

        {/* Summary Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border border-slate-600 rounded-xl p-3 shadow-xl">
          <h3 className="text-yellow-400 font-bold text-sm sm:text-base border border-yellow-400 rounded-lg px-4 py-1 bg-black/30 shadow-md">
            ✅ Total Leads: {leads.length}
          </h3>
          <div className="relative w-full sm:w-64">
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400">🔍</span>
  <input
    type="text"
    placeholder="Search by name, email or mobile"
    className="w-full pl-9 pr-4 py-2 bg-black/70 text-yellow-400 placeholder-yellow-300 border border-yellow-500 rounded-lg shadow-inner shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black transition duration-200"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>


          <button
            onClick={handleExportPDF}
            className="bg-gradient-to-r from-blue-500 hover:cursor-pointer via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 border border-blue-500 text-white rounded-lg px-4 py-2 text-sm sm:text-base font-bold shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            📄 Export as PDF
          </button>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="py-2 px-2">S.No.</th>
                {/* <th className="py-2 px-3">👤 Name</th> */}
                <th className="py-2 px-2">📧 Email</th>
                <th className="py-2 px-2">📞 Mobile</th>
                <th className="py-2 px-2">💳 UPI</th>
                <th className="py-2 px-2">⏰ Submitted At</th>
                <th className="py-2 px-2">🏆 Reward</th>
                <th className="py-2 px-2">❌ Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <tr key={lead._id} className="border-b border-gray-700 text-white">
                  <td className="py-2 px-2">{index + 1}</td>
                  <td className="py-2 px-2">{lead.name}</td>
                  {/* <td className="py-2 px-3">{lead.email || "—"}</td> */}
                  <td className="py-2 px-2">{lead.mobile}</td>
                  <td className="py-2 px-2">{lead.upi}</td>
                  <td className="py-2 px-2">{new Date(lead.createdAt).toLocaleString()}</td>
                  <td className="py-2 px-2">
                    {lead.rewarded ? (
                      <span className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-900 text-white rounded px-2 py-1 text-xs font-bold shadow-sm transition-transform hover:scale-105 active:scale-95">
                        🎁 Rewarded
                      </span>
                    ) : (
                      <button
                        onClick={() => handleReward(lead._id)}
                        className="bg-green-600 hover:cursor-pointer hover:bg-green-700 text-white rounded px-2 py-1 text-xs font-bold"
                      >
                        Mark Rewarded
                      </button>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => {
                        if (window.confirm(`❌ Are you sure you want to delete ${lead.name}?`)) {
                          handleDelete(lead._id);
                        }
                      }}
                      className="bg-gradient-to-r hover:cursor-pointer from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded px-2 py-1 text-xs font-bold shadow-sm transition-transform hover:scale-105 active:scale-95"
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-gray-400 py-4">No leads found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadList;
