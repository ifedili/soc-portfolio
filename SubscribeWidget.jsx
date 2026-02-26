import { useState } from "react";

// ============================================
// Beehiiv subscription via Vercel API route
// No API keys exposed in frontend
// ============================================

export default function SubscribeWidget() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focused, setFocused] = useState(false);

  const handleSubscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        throw new Error("Subscription failed");
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubscribe();
  };

  return (
    <section style={styles.section}>
      {status === "success" ? (
        <div style={styles.successWrap}>
          <h2 style={styles.heading}>
            You're <span style={styles.headingItalic}>In</span>
          </h2>
          <p style={styles.subtext}>
            We'll notify you when new articles go live. Welcome aboard.
          </p>
        </div>
      ) : (
        <>
          <h2 style={styles.heading}>
            Stay <span style={styles.headingItalic}>Updated</span>
          </h2>
          <p style={styles.subtext}>
            Get notified when I publish new cybersecurity articles,
            threat breakdowns and tech insights.
          </p>
          <div style={styles.form}>
            <input
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={handleKeyDown}
              style={{
                ...styles.input,
                borderColor: focused ? "#64ffda" : "#333",
              }}
            />
            <button
              onClick={handleSubscribe}
              disabled={status === "sending"}
              style={{
                ...styles.button,
                ...(status === "sending" ? styles.buttonDisabled : {}),
              }}
            >
              {status === "sending"
                ? "Sending..."
                : status === "error"
                ? "Retry →"
                : "Subscribe →"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

const styles = {
  section: {
    width: "100%",
    padding: "80px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  sectionLabel: {
    fontFamily: "'Fira Code', 'SF Mono', 'Courier New', monospace",
    fontSize: "14px",
    fontWeight: 400,
    color: "#64ffda",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  heading: {
    fontFamily: "'Playfair Display', 'Georgia', serif",
    fontSize: "clamp(36px, 5vw, 52px)",
    fontWeight: 400,
    color: "#ffffff",
    marginBottom: "20px",
    lineHeight: 1.2,
  },
  headingItalic: {
    fontStyle: "italic",
  },
  subtext: {
    fontFamily: "'Fira Code', 'SF Mono', 'Courier New', monospace",
    fontSize: "14px",
    color: "#888",
    lineHeight: 1.8,
    maxWidth: "500px",
    marginBottom: "40px",
  },
  form: {
    display: "flex",
    gap: "12px",
    width: "100%",
    maxWidth: "480px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    minWidth: "220px",
    padding: "14px 18px",
    background: "transparent",
    border: "1px solid #333",
    borderRadius: "0",
    color: "#fff",
    fontFamily: "'Fira Code', 'SF Mono', 'Courier New', monospace",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "14px 28px",
    background: "#64ffda",
    border: "1px solid #64ffda",
    borderRadius: "0",
    color: "#0a0a0a",
    fontFamily: "'Fira Code', 'SF Mono', 'Courier New', monospace",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease",
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  successWrap: {
    textAlign: "center",
  },
};
