const cors = require('cors');
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());

app.use(authRoutes);

app.use(express.json());

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
