import React, { useState } from "react";

const CampaignForm3 = () => {
  const campaign = {
  id: "campaign3",
  name: "InCred Money ₹100 Offer",
  reward: "₹100",
  offerText: "💎 PREMIUM REWARD!",
  redirectUrl: "./thankyou",
  steps: [
    "Enter the *same email* you used to register on InCred",
    "Fill in your Mobile Number and UPI ID",
    "We will verify your InCred registration",
    "You'll receive ₹100 via UPI after successful verification 🎉"
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

      await new Promise((resolve) => setTimeout(resolve, 5000));

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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-blue-900 p-6 relative">
      <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-400 opacity-30 blur-3xl rounded-full animate-pulse"></div>

      <div className="bg-black/80 backdrop-blur-md border border-blue-700 max-w-md w-full rounded-3xl shadow-2xl p-8 text-white relative">
        <div className="text-center mb-4">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full px-4 py-1 font-bold text-xs shadow-md animate-pulse">
            {campaign.offerText}
          </span>
        </div>

        <h2 className="text-center text-2xl font-black text-cyan-300 drop-shadow-lg">{campaign.name}</h2>
        <p className="text-center text-5xl font-black text-blue-400 mb-2 drop-shadow-md">Get {campaign.reward}</p>
        <p className="text-center text-gray-400 text-sm mb-6">Complete in 3 easy steps</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "mobile", "upi"].map((field, idx) => (
            <div key={idx} className="flex items-center border border-gray-600 rounded-lg p-3 bg-gray-800/60 focus-within:border-cyan-400">
              <span className="mr-3 text-cyan-300 text-lg">
                {field === "name" && "📩"}
                {field === "mobile" && "📞"}
                {field === "upi" && "💳"}
              </span>
              <input
                type="text"
                name={field}
                placeholder={
                  field === "name" ? "Registered Email" :
                  field === "mobile" ? "Your Mobile NO." :
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
            className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 p-3 rounded-xl font-bold shadow-xl transform hover:scale-105 transition duration-300"
          >
            {loading ? "Submitting... Please wait" : "🚀 Grab Now"}
          </button>
        </form>

        <div className="mt-5 bg-gray-800/60 p-4 rounded-xl border border-blue-700 text-sm">
          <p className="font-bold text-cyan-300 mb-2">📌 How to claim:</p>
          <ol className="list-decimal pl-4 text-gray-300 space-y-1">
            {campaign.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          <p className="text-center text-blue-400 font-bold mt-2 animate-bounce">💎 Act Fast!</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-blue-500 rounded-2xl p-6 text-center shadow-2xl">
            <h3 className="text-cyan-300 font-bold mb-2">⏳ Processing...</h3>
            <p className="text-gray-300 text-sm mb-3">
              Please wait 10-15 seconds. Tracking in progress...
            </p>
            <div className="mt-2 animate-pulse text-blue-400 font-bold">Processing...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignForm3;
