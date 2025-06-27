import React, { useState } from "react";

const CampaignForm = () => {
  // 👇 Campaign info — you can pass this dynamically too
  const campaign = {
    id: "campaign1",  // unique ID for tracking on backend
    name: "Upstox ₹200 Offer",
    reward: "₹200",
    offerText: "🔥 LIMITED TIME BONUS!",
    redirectUrl: "https://your-affiliate-link.com",
    steps: [
      "Enter your Name, Mobile Number & UPI ID and submit",
      "If tracking success then open account using Aadhaar & PAN",
      "Get ₹200 instantly in your bank account 🎉"
    ]
  };

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    upi: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, mobile, upi } = formData;
  if (!name || !mobile || !upi) {
    alert("Please fill all fields");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        campaignId: campaign.id
      })
    });

    const data = await res.json();

    // ✅ Success OR already exists — redirect
    if (res.ok || data.alreadyExists) {
      window.open(campaign.redirectUrl, "_blank");
      
    } else {
      alert(data.error || "Submission failed");
    }

  } catch (err) {
    alert("Server error");
  }
  setLoading(false);
};


  return (
    <div className="w-[100%] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black p-6">
      <div className="bg-gray-800/80 border border-gray-700 backdrop-blur-md max-w-md w-full rounded-3xl shadow-2xl p-8 text-white">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-full px-4 py-1 shadow-lg">
            <span className="text-white font-bold text-xs sm:text-sm">{campaign.offerText}</span>
          </div>
        </div>

        <h2 className="text-center text-lg sm:text-xl font-bold mb-1 text-yellow-400">{campaign.name}</h2>
        <p className="text-center text-3xl sm:text-4xl font-extrabold mb-3 text-pink-400">Get {campaign.reward}</p>
        <p className="text-center text-xs sm:text-sm mb-4 italic text-gray-300">Claim your bonus in 3 simple steps!</p>

        <form onSubmit={handleSubmit} className="space-y-3">
  <div className="flex items-center border border-gray-400 rounded-lg p-2 bg-gray-700/50">
    <span className="text-pink-400 mr-2">👤</span>
    <input
      type="text"
      name="name"
      placeholder="Your Name"
      value={formData.name}
      onChange={handleChange}
      className="w-full bg-transparent focus:outline-none text-white"
      required
    />
  </div>

  <div className="flex items-center border border-gray-400 rounded-lg p-2 bg-gray-700/50">
    <span className="text-pink-400 mr-2">📞</span>
    <input
      type="text"
      name="mobile"
      placeholder="Mobile Number"
      value={formData.mobile}
      onChange={handleChange}
      className="w-full bg-transparent focus:outline-none text-white"
      required
    />
  </div>

  <div className="flex items-center border border-gray-400 rounded-lg p-2 bg-gray-700/50">
    <span className="text-pink-400 mr-2">💳</span>
    <input
      type="text"
      name="upi"
      placeholder="UPI ID"
      value={formData.upi}
      onChange={handleChange}
      className="w-full bg-transparent focus:outline-none text-white"
      required
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 p-2 rounded-lg font-bold shadow-lg transform hover:scale-105 transition duration-300"
  >
    {loading ? "Submitting..." : "🎯 Claim Now"}
  </button>
</form>


        <p className="text-xs text-center mt-3 text-gray-400">🔒 100% secure & instant payout to your bank</p>

        <div className="bg-gray-700/50 mt-5 p-4 rounded-xl border border-gray-600 text-sm">
          <p className="font-bold mb-2 text-pink-400">📌 How to Claim Your {campaign.reward}:</p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-300">
            {campaign.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <p className="text-yellow-400 font-bold mt-3 text-center animate-pulse">🔥 Act Fast – Offer Ending Soon!</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
