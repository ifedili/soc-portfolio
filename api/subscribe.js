export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          utm_source: "website",
          utm_medium: "subscribe_form",
        }),
      }
    );

    const data = await response.json();

    if (response.ok || response.status === 201) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(response.status).json({ error: data });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
