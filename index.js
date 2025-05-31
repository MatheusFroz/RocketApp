const upgradeRoutes = require('./routes/upgradeRoutes');
app.use('/api/upgrades', upgradeRoutes);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '*'
}));

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
  roll: String,
  result: String,
  raridade: String,
  timestamp: { type: Date, default: Date.now },
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor online na porta ${PORT}`));
