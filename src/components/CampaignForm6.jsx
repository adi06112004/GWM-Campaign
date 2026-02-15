import React, { useState } from "react";

const CampaignForm6 = () => {
  const campaign = {
    id: "campaign-indiabulls",
    name: "Indiabulls Trading Offer",
    reward: "₹230",
    offerText: "🔥 LIMITED TIME OFFER",
    redirectUrl: "https://partnersales10607470.o18.click/c?o=21722579&m=12754&a=692490&sub_aff_id="
    steps: [
      "Register on Indiabulls website & verify OTP",
      "Complete KYC using Aadhaar & PAN",
      "Deposit ₹100+ and buy/sell any stock 3-4 times",
      "₹230 reward credited within 48 hours",
    ],
  };

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    upi: "",
  });

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
          body: JSON.stringify({
            ...formData,
            campaignId: campaign.id,
          }),
        }
      );

      const data = await res.json();

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (res.ok || data.alreadyExists) {
        window.location.href = campaign.redirectUrl;
      } else {
        alert(data.error || "Submission failed");
      }
    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
    setShowModal(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8">

        {/* Offer Badge */}
        <div className="text-center mb-4">
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-semibold">
            {campaign.offerText}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {campaign.name}
        </h2>

        <p className="text-center text-4xl font-extrabold text-blue-600 mt-2">
          Get {campaign.reward}
        </p>

        <p className="text-center text-gray-500 text-sm mb-6">
          Complete in 4 simple steps
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "mobile", "upi"].map((field) => (
            <div
              key={field}
              className="border rounded-xl p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 transition"
            >
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
                className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                required
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Claim ₹200 Now"}
          </button>
        </form>

        {/* Steps Section */}
        <div className="mt-8 space-y-4">

          {campaign.steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center p-4 rounded-2xl shadow-sm ${
                index === 0
                  ? "bg-blue-50"
                  : index === 1
                  ? "bg-purple-50"
                  : index === 2
                  ? "bg-green-50"
                  : "bg-yellow-50"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-xl text-white font-bold mr-4 ${
                  index === 0
                    ? "bg-blue-500"
                    : index === 1
                    ? "bg-purple-500"
                    : index === 2
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {index + 1}
              </div>

              <p className="text-gray-700 text-sm font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <h3 className="text-blue-600 font-bold mb-3">Processing...</h3>
            <p className="text-gray-500 text-sm mb-4">
              Please wait while we redirect you.
            </p>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignForm6;
