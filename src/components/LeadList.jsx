import React, { useEffect, useState } from "react";

const LeadList = ({ campaignId }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/leads/${campaignId}`);
        const data = await res.json();
        if (res.ok) {
          setLeads(data);
        } else {
          setError(data.error || "Failed to fetch leads");
        }
      } catch (err) {
        setError("Server error");
      }
      setLoading(false);
    };

    fetchLeads();
  }, [campaignId]);

  if (loading) return <p className="text-white">Loading leads...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800">
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-3">Leads for Campaign: {campaignId}</h2>
      {leads.length === 0 ? (
        <p>No leads found for this campaign.</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-1">Name</th>
              <th className="py-1">Mobile</th>
              <th className="py-1">UPI</th>
              <th className="py-1">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-1">{lead.name}</td>
                <td className="py-1">{lead.mobile}</td>
                <td className="py-1">{lead.upi}</td>
                <td className="py-1">{new Date(lead.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default LeadList;
