const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234567',
  database: 'projetorotas'
});


db.connect((err) => {
  if (err) {
    console.error('Erro de conexão:', err.message);
  } else {
    console.log('Conectado.');
  }
});

module.exports = db;