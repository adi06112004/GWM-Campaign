import React, { useEffect, useState } from "react";

const LeadList = ({ campaignId }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
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

    fetchLeads();
  }, [campaignId]);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 p-6">
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
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-b text-white border-gray-700 hover:bg-gray-700/50 transition">
                    <td className="py-2 px-3">{lead.name}</td>
                    <td className="py-2 px-3">{lead.mobile}</td>
                    <td className="py-2 px-3">{lead.upi}</td>
                    <td className="py-2 px-3">{new Date(lead.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadList;
