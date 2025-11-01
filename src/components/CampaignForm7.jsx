import React, { useState } from "react";

const CampaignForm7 = () => {
  const campaign = {
    id: "campaign7",
    name: "Mudrex ₹300 + ₹130 Offer",
    reward: "₹300 + ₹130",
    offerText: "🔥 LIMITED TIME BONUS!",
    redirectUrl: "https://mudrex.go.link/a84Cl",
    steps: [
      "Enter your Name, Mobile Number & UPI ID and Register with New Number.",
      "Then Instantly Showing ₹300 BTC Pop-up >> Now Complete Your Kyc Via Pan, Aadhar, Selfie & Bank Details.",
      "Now Deposit ₹2002 And Instantly Recieved ₹300 BTC Coin.",
      "Now Sell BTC Coin & Withdrawal All Amount Instantly Received Credited All Amount.",
      "Done!! You Will Received ₹130 Upi Cashback after 48 Hour.",
      "🛑Note: After Register If You Not Showing ₹300 BTC Pop-up Then You don't need to complete KYC, it's your old Account.",
      "🛑 Deposit amount minimum 72 hours hold karna hai warna cashback nahi aayega."
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

      await new Promise(resolve => setTimeout(resolve, 12000));

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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-gray-200 relative overflow-hidden p-8">
        {/* Top gradient decoration */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-tr from-indigo-400 via-pink-400 to-yellow-300 rounded-full blur-3xl opacity-40"></div>

        {/* Offer Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold px-4 py-1 rounded-full shadow-md">
            {campaign.offerText}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-1">{campaign.name}</h2>
        <p className="text-center text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">
          Get {campaign.reward}
        </p>

        {/* Refer Code */}
        <p className="text-center text-sm text-gray-600 mb-8 leading-relaxed">
          *Apply this Refer Code in “Apply Refer Code” section on click three dots* <br />
          <span className="font-semibold text-indigo-600">Refer Code: UE9O7V10</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "mobile", "upi"].map((field) => (
            <div
              key={field}
              className="flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 hover:shadow-md transition-all duration-200"
            >
              <span className="mr-3 text-indigo-500 text-lg">
                {field === "name" && "👤"}
                {field === "mobile" && "📞"}
                {field === "upi" && "💳"}
              </span>
              <input
                type="text"
                name={field}
                placeholder={
                  field === "name"
                    ? "Full Name"
                    : field === "mobile"
                    ? "Mobile Number"
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
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
          >
            {loading ? "Submitting... Please wait" : "🎯 Claim Now"}
          </button>
        </form>

        <p className="text-xs text-center mt-5 text-gray-500">
          🔒 100% secure & instant payout to your bank
        </p>

        {/* Instructions */}
        <div className="bg-gray-50 mt-8 p-5 rounded-2xl border border-gray-200 text-sm">
          <p className="font-semibold mb-3 text-indigo-600">
            📋 How to Claim Your {campaign.reward}:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-700">
            {campaign.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
          <p className="text-center text-pink-500 font-bold mt-3 animate-pulse">
            ⚡ Hurry! Limited-time Deal!
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm w-full">
            <h3 className="text-indigo-600 font-bold text-lg mb-2">🚀 Please Wait!</h3>
            <p className="text-gray-700 text-sm mb-3">
              For smooth lead tracking, please click submit only once and wait 10–15 seconds...
            </p>
            <div className="mt-3 animate-pulse text-pink-600 font-semibold">
              Processing...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignForm7;
