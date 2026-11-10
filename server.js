const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>LuckSpin STK</title><style>body{font-family:sans-serif;text-align:center;background:#111;color:#fff;padding:20px}button{background:#22c55e;color:#fff;border:0;padding:15px 30px;font-size:18px;border-radius:10px}input{padding:12px;width:80%;margin:10px;border-radius:8px;border:0}#wheel{font-size:80px;margin:20px}</style></head><body><h1>🎡 LuckSpin STK</h1><p>Spin & Win!</p><div id="wheel">🎡</div><input id="phone" placeholder="Enter M-PESA Number e.g 0712345678"><br><button onclick="spin()">SPIN NOW - KES 20</button><h2 id="result"></h2><script>async function spin(){const p=document.getElementById('phone').value;if(!p){alert('Weka namba ya simu');return}document.getElementById('result').innerText='Spinning... 🎡';const r=await fetch('/api/spin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:p})});const d=await r.json();document.getElementById('result').innerText='🎉 You won: '+d.prize;}</script></body></html>`);
});

app.post('/api/spin', (req, res) => {
  const prizes = ['KES 10','KES 20','KES 50','KES 100','Try Again','KES 500','KES 20','Try Again'];
  const prize = prizes[Math.floor(Math.random()*prizes.length)];
  res.json({ success: true, prize, phone: req.body.phone });
});

app.listen(PORT, () => console.log('Server running on ' + PORT));
