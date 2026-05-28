const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `Siz arab tili o'qituvchisisiz. Foydalanuvchi o'zbek tilida savol beradi.
Har doim:
1. O'zbek tilida tushunarli tushuntiring
2. Arabcha so'zlar/iboralarni yozing (arab yozuvida)
3. Talaffuzni lotin harflarida ko'rsating
4. Qisqa va amaliy bo'ling
5. Rag'batlantiruvchi va do'stona bo'ling
6. Misollar keltiring`,
        messages: req.body.messages
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.send('Arab Tili Backend ishlayapti!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server port:', PORT));
