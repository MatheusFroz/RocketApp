require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Upgrade = require('./models/Upgrade');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch(err => console.error('❌ Erro ao conectar:', err));

// Rota para salvar upgrade
app.post('/api/upgrades', async (req, res) => {
  try {
    const novoUpgrade = new Upgrade(req.body);
    await novoUpgrade.save();
    res.status(201).json({ message: 'Upgrade salvo com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar upgrade.' });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
