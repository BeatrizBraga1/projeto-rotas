const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./database'); 

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/entregas', (req, res) => {
  const { nome, rua, cidade, pais, place_id, peso, lat, lng } = req.body;
  const sql = 'INSERT INTO entregas (nome, rua, cidade, pais, place_id, peso, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome, rua, cidade, pais, place_id, peso, lat, lng], (err, result) => {
    if (err) {
      console.error('Erro ao inserir entrega:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar entrega.' });
    }
    res.status(201).json({ message: 'Entrega cadastrada com sucesso!' });
  });
});

app.get('/api/entregas', (req, res) => {
  const sql = 'SELECT * FROM entregas';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar entregas:', err);
      return res.status(500).json({ error: 'Erro ao consultar entregas.' });
    }
    res.status(200).json(results);
  });
});

app.delete('/api/entregas', (req, res) => {
    const sql = 'DELETE FROM entregas';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Erro ao deletar entregas:', err);
        return res.status(500).json({ error: 'Erro ao deletar entregas.' });
      }
      res.status(200).json({ message: 'Todas as entregas foram deletadas com sucesso!' });
    });
  });

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
