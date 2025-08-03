import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CampaignForm4 = () => {
  const campaign = {
    id: "campaign4",
    name: "PAYTM MONEY",
    reward: "₹150",
    offerText: "🔥 LIMITED TIME BONUS!",
    redirectUrl: "https://paytmmoney.page.link/i6V46MVBHZD9WCZD9",
    steps: [
      "Enter your Name, Mobile Number & UPI ID and submit",
      "Then open account using Aadhaar & PAN",
      "Wait for Approval",
      "Get ₹120 in your Bank Account within 24 hours 🎉"
    ]
  };

  const [formData, setFormData] = useState({ name: "", mobile: "", upi: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const errorRef = useRef(null);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, mobile, upi } = formData;

    // Client-side Validation
    if (!name || !mobile || !upi) {
      setError("Please fill in all fields.");
      errorRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!/^[0-9]{10}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      errorRef.current?.scrollIntoView({ behavior: "smooth" });
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
      await new Promise((r) => setTimeout(r, 2000));

      if (res.ok || data.alreadyExists) {
        setSuccess(true);
        await new Promise((r) => setTimeout(r, 3000));
        window.location.href = campaign.redirectUrl;
      } else {
        setError(data.error || "Submission failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-xl border border-gray-600/30 shadow-2xl rounded-3xl p-6 max-w-md w-full text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
        
        {/* Logo/Avatar */}
        <div className="flex justify-center">
          <img
            src="https://play-lh.googleusercontent.com/nXCY9Did341stoQEhCEH5wJW2FBybZYbpiYl2J-eCajYOXZ_XXXHX1ptjATuA0zayg"
            alt="Paytm Money"
            className="w-16 h-16 rounded-full border-2 border-yellow-400 shadow-md mb-2"
          />
        </div>

        {/* Offer Tag */}
        <div className="text-center mb-2">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full font-bold text-xs shadow-md">
            {campaign.offerText}
          </span>
        </div>

        <h2 className="text-xl font-bold text-yellow-400 text-center">{campaign.name}</h2>
        <p className="text-3xl font-extrabold text-orange-400 text-center mb-3 animate-pulse">
          Get {campaign.reward}
        </p>

        {/* Error Message */}
        {error && (
          <div ref={errorRef} className="text-red-400 text-sm text-center font-semibold mb-2">
            ⚠ {error}
          </div>
        )}

        {/* Form */}
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            {["name", "mobile", "upi"].map((field, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-gray-800/40 border border-gray-600 rounded-xl p-2 px-3 focus-within:ring-2 ring-yellow-400 transition"
              >
                <span className="text-xl">
                  {field === "name" ? "👤" : field === "mobile" ? "📞" : "💳"}
                </span>
                <input
                  type="text"
                  name={field}
                  placeholder={
                    field === "name"
                      ? "Your Name"
                      : field === "mobile"
                      ? "10-digit Mobile"
                      : "example@upi"
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  autoComplete="off"
                  required
                />
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-2 rounded-lg font-bold text-black shadow-xl hover:shadow-2xl transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "💸 Get Cashback"}
            </motion.button>
          </form>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mt-4"
            >
              <p className="text-green-400 font-bold text-lg">✅ Submitted Successfully!</p>
              <p className="text-gray-300 text-sm mt-1">Redirecting you in a moment...</p>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Steps */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/40 p-4 mt-5 rounded-lg border border-gray-700"
        >
          <p className="font-bold text-yellow-300 mb-2">How to claim:</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-300">
            {campaign.steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {step}
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CampaignForm4;
