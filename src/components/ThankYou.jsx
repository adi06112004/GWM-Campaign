import React from "react";

const ThankYou = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-blue-900 p-6 relative">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-400 opacity-30 blur-3xl rounded-full animate-pulse"></div>

      {/* Main thank you card */}
      <div className="bg-black/80 backdrop-blur-md border border-blue-700 max-w-md w-full rounded-3xl shadow-2xl p-8 text-white relative text-center">
        <div className="text-center mb-4">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full px-4 py-1 font-bold text-xs shadow-md animate-pulse">
            🎉 Submission Complete!
          </span>
        </div>

        <h1 className="text-3xl font-black text-cyan-300 drop-shadow-lg mb-2">Thank You! 🎉</h1>
        <p className="text-blue-400 text-lg font-semibold mb-4">
          You’ve successfully completed the Incred offer.
        </p>
        <p className="text-gray-400 text-sm mb-6">
          Our team will verify your submission. Your ₹100 reward will be credited after account approval.
        </p>

        <p className="text-center text-blue-400 font-bold mt-2 animate-bounce">💎 Stay tuned!</p>
      </div>
    </div>
  );
};

export default ThankYou;
