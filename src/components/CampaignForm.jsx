import { useState, useEffect } from "react";

const CampaignForm = () => {
  const campaign = {
    id: "campaign1",
    name: "DHANUSH ",
    reward: "₹70",
    offerText: "LIMITED TIME BONUS",
    redirectUrl: "https://ekycdhanush.ashikagroup.com/r/1444/3",
    paymentTime: "48-72 Hours",
    steps: [
      "Enter your Name, Mobile Number & UPI ID and submit",
      "Open account using Aadhaar & PAN card",
      "Wait for account approval",
      "Receive ₹70 in your Bank Account within 48-72 Hours 🎉"
    ]
  };

  const [formData, setFormData] = useState({ name: "", mobile: "", upi: "" });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNote, setShowNote] = useState(true);
  const [focused, setFocused] = useState(null);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? "" : d + ".");
    }, 200);
    return () => clearInterval(interval);
  }, [loading]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      alert("Server error. Please try again.");
    }
    setShowModal(false);
    setLoading(false);
  };

  const fields = [
    { key: "name", label: "Full Name", placeholder: "Enter your full name", icon: "👤", type: "text" },
    { key: "mobile", label: "Mobile Number", placeholder: "10-digit mobile number", icon: "📱", type: "tel" },
    { key: "upi", label: "UPI ID", placeholder: "yourname@upi", icon: "💳", type: "text" }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1e 40%, #0a0f1a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    }}>
      {/* Ambient background orbs */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        overflow: "hidden", pointerEvents: "none", zIndex: 0
      }}>
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "50vw", height: "50vw", maxWidth: 400, maxHeight: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "-10%",
          width: "50vw", height: "50vw", maxWidth: 400, maxHeight: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "30%",
          width: "40vw", height: "40vw", maxWidth: 300, maxHeight: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: 420,
      }}>
        {/* Header badge */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <span style={{
            display: "inline-block",
            background: "linear-gradient(90deg, #7c3aed, #ec4899, #f59e0b)",
            borderRadius: 100,
            padding: "6px 20px",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>
            🔥 {campaign.offerText}
          </span>
        </div>

        {/* Main card */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "28px 24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}>
          {/* Campaign title */}
          <div style={{ textAlign: "center", marginBottom: 6 }}>
            <p style={{
              fontSize: 13, fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
              margin: 0, marginBottom: 4
            }}>Referral Campaign</p>
            <h1 style={{
              fontSize: 32, fontWeight: 800, margin: 0,
              background: "linear-gradient(135deg, #fff 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px"
            }}>{campaign.name}</h1>
          </div>

          {/* Reward display */}
          <div style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))",
            border: "1px solid rgba(167,139,250,0.3)",
            borderRadius: 16,
            padding: "16px 20px",
            textAlign: "center",
            margin: "16px 0",
          }}>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>EARN INSTANTLY</p>
            <p style={{
              margin: "4px 0 0", fontSize: 48, fontWeight: 900,
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 1
            }}>{campaign.reward}</p>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              Payment within <span style={{ color: "#a78bfa", fontWeight: 600 }}>{campaign.paymentTime}</span>
            </p>
          </div>

          {/* Alert note */}
          {showNote && (
            <div style={{
              display: "flex", alignItems: "flex-start", justifyContent: "space-between",
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.25)",
              borderRadius: 10, padding: "10px 12px",
              marginBottom: 16,
            }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 14 }}>⚠️</span>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(251,191,36,0.85)", lineHeight: 1.5 }}>
                  Try only if you haven't registered before to ensure proper tracking and payment.
                </p>
              </div>
              <button onClick={() => setShowNote(false)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(251,191,36,0.5)", fontSize: 14, padding: "0 0 0 8px", flexShrink: 0
              }}>✕</button>
            </div>
          )}

          <p style={{
            textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.35)",
            margin: "0 0 20px", fontStyle: "italic"
          }}>Fill the form below to claim your bonus</p>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {fields.map(({ key, label, placeholder, icon, type }) => (
              <div key={key}>
                <label style={{
                  display: "block", fontSize: 11, fontWeight: 600,
                  color: focused === key ? "#a78bfa" : "rgba(255,255,255,0.4)",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  marginBottom: 6, transition: "color 0.2s"
                }}>
                  {label}
                </label>
                <div style={{
                  display: "flex", alignItems: "center",
                  background: focused === key ? "rgba(167,139,250,0.08)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${focused === key ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 12, overflow: "hidden",
                  transition: "all 0.2s",
                  boxShadow: focused === key ? "0 0 0 3px rgba(124,58,237,0.15)" : "none"
                }}>
                  <span style={{
                    padding: "0 12px 0 14px",
                    fontSize: 18, opacity: 0.7, userSelect: "none"
                  }}>{icon}</span>
                  <input
                    type={type}
                    name={key}
                    placeholder={placeholder}
                    value={formData[key]}
                    onChange={handleChange}
                    onFocus={() => setFocused(key)}
                    onBlur={() => setFocused(null)}
                    required
                    style={{
                      flex: 1, background: "none", border: "none", outline: "none",
                      color: "#fff", fontSize: 15,
                      padding: "14px 14px 14px 0",
                      caretColor: "#a78bfa",
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                background: loading
                  ? "rgba(124,58,237,0.4)"
                  : "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)",
                border: "none",
                borderRadius: 14,
                padding: "16px",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 4,
                letterSpacing: "0.02em",
                boxShadow: loading ? "none" : "0 8px 24px rgba(124,58,237,0.35)",
                transform: "translateY(0)",
                transition: "all 0.2s",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {loading ? `Processing${dots}` : "🎯  Claim ₹70 Now"}
            </button>
          </div>

          {/* Security note */}
          <p style={{
            textAlign: "center", fontSize: 12,
            color: "rgba(255,255,255,0.25)", margin: "14px 0 0",
          }}>
            🔒 100% secure &nbsp;·&nbsp; Instant payout to your bank
          </p>
        </div>

        {/* Steps card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20,
          padding: "20px 24px",
          marginTop: 16,
        }}>
          <p style={{
            fontSize: 13, fontWeight: 700, color: "#ec4899",
            margin: "0 0 14px", letterSpacing: "0.05em", textTransform: "uppercase"
          }}>
            📌 How to Claim ₹70
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {campaign.steps.map((step, idx) => (
              <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  flexShrink: 0,
                  width: 26, height: 26,
                  borderRadius: "50%",
                  background: idx === campaign.steps.length - 1
                    ? "linear-gradient(135deg, #7c3aed, #ec4899)"
                    : "rgba(167,139,250,0.15)",
                  border: "1px solid rgba(167,139,250,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700,
                  color: idx === campaign.steps.length - 1 ? "#fff" : "#a78bfa",
                }}>
                  {idx + 1}
                </div>
                <p style={{
                  margin: 0, fontSize: 13,
                  color: idx === campaign.steps.length - 1
                    ? "rgba(167,139,250,0.9)"
                    : "rgba(255,255,255,0.55)",
                  lineHeight: 1.6, paddingTop: 3
                }}>{step}</p>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 16, textAlign: "center",
            padding: "10px", borderRadius: 10,
            background: "rgba(251,191,36,0.06)",
            border: "1px solid rgba(251,191,36,0.15)"
          }}>
            <p style={{
              margin: 0, fontSize: 13, fontWeight: 700,
              color: "#fbbf24", letterSpacing: "0.03em"
            }}>
              ⚡ Limited-time offer — Act now!
            </p>
          </div>
        </div>
      </div>

      {/* Processing modal */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 24
        }}>
          <div style={{
            background: "rgba(15,10,30,0.95)",
            border: "1px solid rgba(167,139,250,0.4)",
            borderRadius: 24, padding: "36px 32px",
            textAlign: "center", maxWidth: 340, width: "100%",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          }}>
            {/* Spinner */}
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              border: "3px solid rgba(167,139,250,0.2)",
              borderTop: "3px solid #a78bfa",
              margin: "0 auto 20px",
              animation: "spin 0.8s linear infinite"
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <h3 style={{
              color: "#a78bfa", fontWeight: 700, fontSize: 18,
              margin: "0 0 10px"
            }}>🚀 Hold Tight!</h3>
            <p style={{
              color: "rgba(255,255,255,0.5)", fontSize: 13,
              margin: "0 0 16px", lineHeight: 1.6
            }}>
              Submitting your details for lead tracking.
              Please wait and do not click again…
            </p>
            <p style={{ color: "#fbbf24", fontWeight: 600, fontSize: 14, margin: 0 }}>
              Processing{dots}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignForm;
