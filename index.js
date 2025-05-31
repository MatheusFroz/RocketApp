const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("🟢 MongoDB conectado"))
  .catch(err => console.error("🔴 Erro na conexão:", err));

// Esquema e rota
const Upgrade = mongoose.model('Upgrade', new mongoose.Schema({
  user: String,
  userlink: String,
  userimg: String,
  item: String,
  itemimg: String,
  valor: Number,
  price: Number,
  roll: Number,
  result: String,
  raridade: String,
  timestamp: { type: Date, default: Date.now },
}));

app.post('/api/upgrades', async (req, res) => {
  try {
    const novo = new Upgrade(req.body);
    await novo.save();
    res.status(201).json({ message: 'Upgrade salvo!', id: novo._id });
  } catch (err) {
    console.error("❌ Erro no backend:", err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor online na porta ${PORT}`));
