const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const professionalRoutes = require('./routes/professionalRoutes');
const path = require('path'); // Importa o módulo path

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos do diretório frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota para a raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo ao Sistema de Cuidadores API!');
});

app.use('/api/users', userRoutes);
app.use('/api/professionals', professionalRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});