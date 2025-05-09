const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use(authRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
