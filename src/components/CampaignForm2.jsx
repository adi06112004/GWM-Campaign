import React, { useState } from "react";

const CampaignForm2 = () => {
  const campaign = {
    id: "campaign2",
    name: "Motilal ₹250 Offer",
    reward: "₹250",
    offerText: "⚡ EXCLUSIVE BONUS!",
    redirectUrl: "https://motilal-affiliate.com",
    steps: [
      "Fill Name, Mobile, UPI and submit",
      "Install Motilal app and register with Aadhaar + PAN",
      "₹250 credited on account approval 🎉"
    ]
  };

  const [formData, setFormData] = useState({ name: "", mobile: "", upi: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      if (res.ok || data.alreadyExists) {
        window.open(campaign.redirectUrl, "_blank");
      } else {
        alert(data.error || "Submission failed");
      }
    } catch {
      alert("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-black to-gray-900 p-6">
      <div className="bg-black/80 backdrop-blur-md border border-gray-700 max-w-md w-full rounded-3xl shadow-lg p-6 text-white">
        <div className="text-center mb-4">
          <span className="inline-block bg-gradient-to-r from-red-500 to-yellow-500 rounded-full px-3 py-1 font-bold text-xs">{campaign.offerText}</span>
        </div>
        <h2 className="text-center text-xl font-bold text-yellow-400">{campaign.name}</h2>
        <p className="text-center text-4xl font-extrabold text-red-400 mb-2">Get {campaign.reward}</p>
        <p className="text-center text-gray-400 text-sm mb-4">Just 3 easy steps to grab your reward</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {["name", "mobile", "upi"].map((field, idx) => (
            <div key={idx} className="flex items-center border border-gray-600 rounded p-2 bg-gray-800">
              <span className="mr-2">{field === "name" ? "👤" : field === "mobile" ? "📞" : "💳"}</span>
              <input
                type="text"
                name={field}
                placeholder={field === "name" ? "Your Name" : field === "mobile" ? "Mobile Number" : "UPI ID"}
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none text-white"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-500 to-red-500 p-2 rounded font-bold hover:scale-105 transition"
          >
            {loading ? "Submitting..." : "🎯 Grab Offer"}
          </button>
        </form>

        <div className="mt-4 bg-gray-800 p-3 rounded border border-gray-700 text-sm">
          <p className="font-bold text-yellow-300 mb-2">How to claim:</p>
          <ol className="list-decimal pl-4 text-gray-300 space-y-1">
            {campaign.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm2;
