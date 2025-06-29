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
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.upi) {
      alert("Please fill all fields");
      return;
    }

    setShowModal(true);
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

    setShowModal(false);
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-black via-gray-900 to-black p-6 relative">
      {/* Glow background layers */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-red-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-yellow-400 rounded-full opacity-30 blur-3xl animate-pulse"></div>

      <div className="bg-black/80 backdrop-blur-md border border-gray-700 max-w-md w-full rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="text-center mb-4">
          <span className="inline-block bg-gradient-to-r from-red-500 to-yellow-500 rounded-full px-4 py-1 font-bold text-xs shadow-md animate-pulse">
            {campaign.offerText}
          </span>
        </div>

        <h2 className="text-center text-2xl font-black text-yellow-400 drop-shadow-lg">{campaign.name}</h2>
        <p className="text-center text-5xl font-black text-red-500 mb-2 drop-shadow-md">Get {campaign.reward}</p>
        <p className="text-center text-gray-400 text-sm mb-6">Just 3 easy steps to grab your reward</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "mobile", "upi"].map((field, idx) => (
            <div key={idx} className="flex items-center border border-gray-600 rounded-lg p-3 bg-gray-800/60 focus-within:border-yellow-400">
              <span className="mr-3 text-yellow-400 text-lg">
                {field === "name" && "👤"}
                {field === "mobile" && "📞"}
                {field === "upi" && "💳"}
              </span>
              <input
                type="text"
                name={field}
                placeholder={
                  field === "name" ? "Your Name" :
                  field === "mobile" ? "Mobile Number" :
                  "UPI ID"
                }
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-3 rounded-xl font-bold shadow-xl transform hover:scale-105 transition duration-300"
          >
            {loading ? "Submitting... Please wait" : "🚀 Grab Offer"}
          </button>
        </form>

        <div className="mt-5 bg-gray-800/60 p-4 rounded-xl border border-gray-700 text-sm">
          <p className="font-bold text-yellow-300 mb-2">📌 How to claim:</p>
          <ol className="list-decimal pl-4 text-gray-300 space-y-1">
            {campaign.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          <p className="text-center text-red-400 font-bold mt-2 animate-bounce">⚡ Limited Time — Don’t Miss!</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-red-500 rounded-2xl p-6 text-center shadow-2xl">
            <h3 className="text-yellow-400 font-bold mb-2">⏳ Processing...</h3>
            <p className="text-gray-300 text-sm mb-3">
              For smooth tracking, please wait 10-15 seconds. Do not refresh or close.
            </p>
            <div className="mt-2 animate-pulse text-red-400 font-bold">Tracking your lead...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignForm2;
