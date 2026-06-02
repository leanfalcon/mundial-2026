export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Map Anthropic request format to Groq format
    const { model, max_tokens, system, messages } = req.body;

    const groqMessages = [];
    if (system) {
      groqMessages.push({ role: "system", content: system });
    }
    groqMessages.push(...messages);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: max_tokens || 1000,
        messages: groqMessages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    // Convert Groq response back to Anthropic format so the frontend works unchanged
    if (data.choices && data.choices[0]) {
      return res.status(200).json({
        content: [{ type: "text", text: data.choices[0].message.content }]
      });
    }

    res.status(500).json({ error: 'No response from Groq', detail: data });
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to Groq API', detail: error.message });
  }
}
