import { useState, useRef, useEffect } from "react";

// ============================================
// Replace YOUR_USERNAME with your Buttondown
// username before deploying!
// ============================================
const BUTTONDOWN_USERNAME = "YOUR_USERNAME";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, isVisible];
}

export default function SubscribeWidget() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(false);
  const [hov, setHov] = useState(false);
  const [ref, vis] = useInView();

  const handleSubscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) return;

    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("tag", "website");

      const res = await fetch(
        `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`,
        { method: "POST", body: formData }
      );

      if (res.ok) {
        setStatus("success");
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
    <section ref={ref} style={{
      padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto',
      borderTop: '1px solid var(--border-primary)',
    }}>
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        textAlign: 'center',
      }}>
        {status === "success" ? (
          <>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400, color: 'var(--text-primary)', marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}>
              You're <span style={{ color: 'var(--text-muted)' }}>In</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1.05rem',
              color: 'var(--text-secondary)', lineHeight: 1.7,
              maxWidth: '500px', margin: '0 auto',
            }}>
              We'll notify you when new articles go live. Welcome aboard.
            </p>
          </>
        ) : (
          <>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400, color: 'var(--text-primary)', marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}>
              Stay <span style={{ color: 'var(--text-muted)' }}>Updated</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1.05rem',
              color: 'var(--text-secondary)', lineHeight: 1.7,
              maxWidth: '500px', margin: '0 auto 2.5rem',
            }}>
              Get notified when I publish new cybersecurity articles,
              threat breakdowns and tech insights.
            </p>
            <div style={{
              display: 'flex', gap: '0.75rem', justifyContent: 'center',
              flexWrap: 'wrap', maxWidth: '480px', margin: '0 auto',
            }}>
              <input
                type="email"
                placeholder="johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1, minWidth: '200px', padding: '0.85rem 1.25rem',
                  background: 'transparent',
                  border: `1px solid ${focused ? 'rgba(0,180,216,0.5)' : 'rgba(0,180,216,0.2)'}`,
                  borderRadius: '5px', color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                  letterSpacing: '0.05em', outline: 'none',
                  transition: 'all 0.3s',
                }}
              />
              <button
                onClick={handleSubscribe}
                disabled={status === "sending"}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                  letterSpacing: '0.05em', padding: '0.85rem 2rem',
                  borderRadius: '5px', fontWeight: 600,
                  cursor: status === "sending" ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s', border: 'none',
                  color: 'var(--bg-primary)',
                  background: hov ? '#0096b7' : 'var(--accent-blue)',
                  boxShadow: hov ? '0 0 30px rgba(0,180,216,0.3)' : 'none',
                  opacity: status === "sending" ? 0.6 : 1,
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
      </div>
    </section>
  );
}
