const express = require('express');
const router = express.Router();
const Upgrade = require('../models/Upgrade'); // usa o model separado

router.post('/', async (req, res) => {
  try {
    console.log("📦 Dados recebidos:", req.body);

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
    console.error("❌ Erro no backend:", err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
