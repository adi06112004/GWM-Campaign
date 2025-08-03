import React, { useState } from "react";

const CampaignForm4 = () => {
  const campaign = {
  const campaign = {
    id: "campaign4",
    name: "PAYTM MONEY",
    reward: "₹120",
    offerText: "🔥 LIMITED TIME BONUS!",
    redirectUrl: "https://paytmmoney.page.link/i6V46MVBHZD9WCZD9",
    steps: [
      "Enter your Name, Mobile Number & UPI ID and submit",
      "then open account using Aadhaar & PAN",
      "Wait for Approval",
      "Get ₹120 in your Bank Account within 24 hourse 🎉"
    ]
  };

  const [formData, setFormData] = useState({ name: "", mobile: "", upi: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.upi) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://gwm-campaign-backend.onrender.com/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, campaignId: campaign.id })
      });
      const data = await res.json();
      await new Promise(resolve => setTimeout(resolve, 5000));
      if (res.ok || data.alreadyExists) {
       window.location.href = campaign.redirectUrl;
      } else {
        alert(data.error || "Submission failed");
      }
    } catch {
      alert("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black p-6">
      <div className="bg-black/80 border border-gray-700 rounded-3xl shadow-xl p-6 text-white max-w-md w-full">
        <div className="text-center mb-3">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full font-bold text-xs">{campaign.offerText}</span>
        </div>
        <h2 className="text-xl font-bold text-yellow-400 text-center">{campaign.name}</h2>
        <p className="text-3xl font-extrabold text-orange-400 text-center mb-2">Get {campaign.reward}</p>
        <form onSubmit={handleSubmit} className="space-y-3 mt-3">
          {["name", "mobile", "upi"].map((f, i) => (
            <div key={i} className="flex items-center bg-gray-800/50 border border-gray-600 p-2 rounded">
              <span className="mr-2">{f === "name" ? "👤" : f === "mobile" ? "📞" : "💳"}</span>
              <input
                type="text"
                name={f}
                placeholder={f === "name" ? "Your Name" : f === "mobile" ? "Mobile Number" : "UPI ID"}
                value={formData[f]}
                onChange={handleChange}
                className="w-full bg-transparent text-white focus:outline-none"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded font-bold hover:scale-105 transition"
          >
            {loading ? "Submitting..." : "💸 Get Cashback"}
          </button>
        </form>
        <div className="bg-gray-800/50 p-3 mt-3 rounded text-sm border border-gray-600">
          <p className="font-bold text-yellow-300 mb-2">How to claim:</p>
          <ol className="list-decimal pl-4 space-y-1 text-gray-300">
            {campaign.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm4;
