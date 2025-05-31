const express = require('express');
const router = express.Router();
const Upgrade = require('../models/Upgrade');

router.post('/', async (req, res) => {
  try {
    const upgrade = new Upgrade(req.body);
    await upgrade.save();
    res.status(201).json({ message: 'Upgrade salvo com sucesso', upgrade });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar upgrade', error: err });
  }
});

module.exports = router;
