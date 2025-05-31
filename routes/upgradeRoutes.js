const express = require('express');
const router = express.Router();
const Upgrade = require('../models/Upgrade');

router.post('/', async (req, res) => {
  try {
    app.post('/api/upgrades', async (req, res) => {
  try {
    console.log("📦 Dados recebidos:", req.body); // ← Adicione isso

    const data = {
      ...req.body,
      roll: Number(req.body.roll),
      valor: Number(req.body.valor),
      price: Number(req.body.price)
    };

    const novo = new Upgrade(data);
    await novo.save();
    res.status(201).json({ message: 'Upgrade salvo!', id: novo._id });
  } catch (err) {
    console.error("❌ Erro no backend:", err); // ← Mostrará a exceção real
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

    const upgrade = new Upgrade(req.body);
    await upgrade.save();
    res.status(201).json({ message: 'Upgrade salvo com sucesso', upgrade });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar upgrade', error: err });
  }
});

module.exports = router;
