import React, { useState } from "react";

const CampaignForm5 = () => {
  const campaign = {
    id: "campaign5",
    name: "Coinswitch Dhamaka Offer",
    reward: "₹200 UPI Cashback 💸",
    offerText: "🎉 LIMITED TIME OFFER!",
    redirectUrl: "https://coinswitch.co/pro/signup?code=BcWETMY",
    steps: [
      "Enter Coinswitch Mobile Number and UPI ID and click Submit.",
      "Register using the same number and download the app.",
      "Login with the same number and complete your KYC.",
      "Add ₹500 in your account using UPI (Deposit amount can be instantly withdrawn).",
      "Click 'Pro' → 'Select Future' → 'Most Traded' → Select SOL Coin → Leverage 25x → Order Value 100%.",
      "Buy and Sell the same coin 15–20 times (just quick Buy & Sell).",
      "✅ Done! You will get ₹200 UPI Cashback within 12–48 hours."
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
      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, campaignId: campaign.id }),
      });
      const data = await res.json();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (res.ok || data.alreadyExists) {
        window.open(campaign.redirectUrl, "_blank");
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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 via-white to-gray-200 p-6 relative overflow-hidden">
      {/* Soft light blobs */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-yellow-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>

      <div className="bg-white/90 backdrop-blur-md border border-gray-300 max-w-md w-full rounded-3xl shadow-2xl p-8 text-gray-800 relative overflow-hidden">
        <div className="text-center mb-4">
          <span className="inline-block bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full px-4 py-1 font-bold text-xs shadow-md animate-pulse text-gray-900">
            {campaign.offerText}
          </span>
        </div>

        <h2 className="text-center text-2xl font-extrabold text-gray-900 drop-shadow-sm">
          {campaign.name}
        </h2>
        <p className="text-center text-4xl font-extrabold text-pink-500 mb-2">
          Get {campaign.reward}
        </p>
        <p className="text-center text-gray-600 text-sm mb-6">
          Complete all steps to grab your reward
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "mobile", "upi"].map((field, idx) => (
            <div
              key={idx}
              className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:border-yellow-500 transition-all duration-200"
            >
              <span className="mr-3 text-yellow-500 text-lg">
                {field === "name" && "👤"}
                {field === "mobile" && "📞"}
                {field === "upi" && "💳"}
              </span>
              <input
                type="text"
                name={field}
                placeholder={
                  field === "name"
                    ? "Your Name"
                    : field === "mobile"
                    ? "Coinswitch Mobile Number"
                    : "UPI ID"
                }
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 p-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition duration-300 text-white"
          >
            {loading ? "Submitting... Please wait" : "🚀 Submit & Claim Offer"}
          </button>
        </form>

        <div className="mt-5 bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm">
          <p className="font-bold text-pink-600 mb-2">📋 Steps to Claim:</p>
          <ol className="list-decimal pl-4 text-gray-700 space-y-1">
            {campaign.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <p className="text-center text-yellow-600 font-bold mt-2 animate-bounce">
            ⚡ Hurry! Limited Time Offer
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white border border-yellow-400 rounded-2xl p-6 text-center shadow-2xl">
            <h3 className="text-yellow-600 font-bold mb-2">⏳ Processing...</h3>
            <p className="text-gray-700 text-sm mb-3">
              For smooth tracking, please wait 10–15 seconds. Do not refresh or close.
            </p>
            <div className="mt-2 animate-pulse text-pink-600 font-bold">
              Tracking your lead...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignForm5;
