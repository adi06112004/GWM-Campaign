import React, { useState } from "react";

const CampaignForm = () => {
  const campaign = {
    id: "campaign1",
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
  const [showModal, setShowModal] = useState(false);

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

    setShowModal(true);
    setLoading(true);

    try {
      const res = await fetch("https://gwm-campaign-backend.onrender.com/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          campaignId: campaign.id
        })
      });

      const data = await res.json();
      await new Promise(resolve => setTimeout(resolve, 5000));

      if (res.ok || data.alreadyExists) {
        window.open(campaign.redirectUrl, "_blank");
      } else {
        alert(data.error || "Submission failed");
      }

    } catch (err) {
      alert("Server error");
    }

    setShowModal(false);
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 border border-gray-600/50 backdrop-blur-md max-w-md w-full rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-yellow-400 rounded-full blur-3xl opacity-30"></div>

        <div className="flex justify-center mb-5">
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-full px-5 py-1 shadow-md">
            <span className="text-white font-bold text-xs sm:text-sm animate-pulse">{campaign.offerText}</span>
          </div>
        </div>

        <h2 className="text-center text-xl sm:text-2xl font-extrabold mb-1 text-yellow-400">{campaign.name}</h2>
        <p className="text-center text-4xl sm:text-5xl font-black mb-4 text-pink-500 drop-shadow-lg">Get {campaign.reward}</p>
        <p className="text-center text-sm mb-6 italic text-gray-300">Claim your bonus in 3 simple steps!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "mobile", "upi"].map((field, index) => (
            <div key={index} className="flex items-center border border-gray-500 rounded-lg p-3 bg-gray-700/40 focus-within:border-pink-400">
              <span className="mr-3 text-pink-400 text-lg">
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
            className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 p-3 rounded-xl font-bold shadow-xl transform hover:scale-105 transition duration-300"
          >
            {loading ? "Submitting... Please wait" : "🎯 Claim Now"}
          </button>
        </form>

        <p className="text-xs text-center mt-4 text-gray-400">🔒 100% secure & instant payout to your bank</p>

        <div className="bg-gray-700/50 mt-6 p-4 rounded-xl border border-gray-600 text-sm">
          <p className="font-bold mb-2 text-pink-400">📌 How to Claim Your {campaign.reward}:</p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-300">
            {campaign.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
          <p className="text-yellow-400 font-bold mt-3 text-center animate-bounce">🔥 Hurry! Limited-time deal!</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-pink-500 rounded-2xl p-8 text-center shadow-2xl animate-fade-in">
            <h3 className="text-pink-400 font-bold text-lg mb-2">🚀 Please Wait!</h3>
            <p className="text-gray-300 text-sm mb-3">
              For smooth lead tracking, please click submit only once and wait 10-15 seconds...
            </p>
            <div className="mt-3 animate-pulse text-yellow-400 font-bold">Processing...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignForm;
