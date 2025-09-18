import React, { useState } from "react";

const CampaignForm5 = () => {
  const campaign = {
    id: "campaign5",
    name: "AngelOne ₹200 Offer",
    reward: "₹200",
    offerText: "👑 ROYAL BONUS!",
    redirectUrl: "https://formlie.in/p/?o=qQAFnS",
    steps: [
      "Enter details and submit",
      "Install AngelOne app & register",
      "Do complete KYC",
      "Wait for KYC Approval",
      "After Approval you receive your amount",
      "₹220 on successful account opening",
    ],
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
      const res = await fetch(
        "https://gwm-campaign-backend.onrender.com/api/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, campaignId: campaign.id }),
        }
      );
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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-purple-900 p-6 relative overflow-hidden">
      {/* Background floating blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 opacity-25 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-400 opacity-25 blur-3xl rounded-full animate-pulse"></div>

      {/* Main Card */}
      <div className="bg-black/60 backdrop-blur-xl border border-purple-700/50 max-w-md w-full rounded-3xl shadow-[0_0_40px_rgba(255,0,150,0.3)] p-8 text-white relative transition-transform hover:scale-[1.02]">
        {/* Badge */}
        <div className="text-center mb-4">
          <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-5 py-1 font-bold text-xs shadow-md animate-bounce">
            {campaign.offerText}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-black text-pink-300 drop-shadow-lg tracking-wide">
          {campaign.name}
        </h2>
        <p className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-2 drop-shadow-md">
          Get {campaign.reward}
        </p>
        <p className="text-center text-gray-400 text-sm mb-6">
          Complete in 3 simple steps
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "mobile", "upi"].map((field, idx) => (
            <div
              key={idx}
              className="flex items-center border border-gray-600 rounded-xl p-3 bg-gray-800/50 focus-within:border-pink-400 transition-all"
            >
              <span className="mr-3 text-pink-300 text-lg">
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
                    ? "Mobile Number"
                    : "UPI ID"
                }
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
                required
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full hover:cursor-pointer flex items-center justify-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 p-3 rounded-xl font-bold shadow-lg transform hover:scale-105 hover:rotate-1 transition duration-300 relative"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Submitting...
              </span>
            ) : (
              "🚀 Claim Now"
            )}
          </button>
        </form>

        {/* Steps */}
        <div className="mt-6 bg-gray-800/50 p-4 rounded-xl border border-purple-700 text-sm">
          <p className="font-bold text-pink-300 mb-2">📌 How to claim:</p>
          <ol className="list-decimal pl-4 text-gray-300 space-y-1">
            {campaign.steps.map((s, i) => (
              <li
                key={i}
                className="hover:text-pink-400 transition duration-200"
              >
                {s}
              </li>
            ))}
          </ol>
          <p className="text-center text-purple-400 font-bold mt-3 animate-pulse">
            👑 Limited Period Offer!
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-900/90 border border-pink-500 rounded-2xl p-6 text-center shadow-[0_0_25px_rgba(255,0,150,0.4)] scale-95 animate-zoomIn">
            <h3 className="text-pink-300 font-bold text-lg mb-3">
              ⏳ Processing...
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Please wait 10-15 seconds. Do not close or refresh.
            </p>
            <div className="flex justify-center">
              <span className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></span>
            </div>
            <div className="mt-3 text-purple-400 font-semibold animate-pulse">
              Tracking your lead...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignForm5;
