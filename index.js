const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const upgradeRoutes = require('./routes/upgradeRoutes'); // <-- mover pra depois de app

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("🟢 MongoDB conectado"))
.catch(err => console.error("🔴 Erro na conexão:", err));

// Rotas
app.use('/api/upgrades', upgradeRoutes); // <-- mover pra depois do app criado

// Inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor online na porta ${PORT}`));
