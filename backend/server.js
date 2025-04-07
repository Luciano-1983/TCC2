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

app.put('/api/professionals/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, telefone, cidade, especialidade, registro, email, senha } = req.body;

    try {
        // Verifique se o profissional existe
        const profissional = await Profissional.findById(id);
        if (!profissional) {
            return res.status(404).json({ message: 'Profissional não encontrado' });
        }

        // Atualize os dados
        profissional.nome = nome;
        profissional.telefone = telefone;
        profissional.cidade = cidade;
        profissional.especialidade = especialidade;
        profissional.email = email;
        profissional.senha = senha;

        // Verifique se a especialidade é "cuidador"
        if (especialidade !== 'cuidador') {
            // Se não for cuidador, atualize o registro
            profissional.registro = registro; // Atualiza o registro se não for cuidador
        } else {
            // Se for cuidador, mantenha o valor anterior do registro
            // Você pode optar por não alterar o registro ou deixá-lo como está
            // profissional.registro = profissional.registro; // Isso é redundante, mas deixa claro que não estamos mudando
        }

        await profissional.save();
        res.json(profissional);
    } catch (error) {
        console.error('Erro ao atualizar profissional:', error);
        res.status(500).json({ message: 'Erro ao atualizar profissional' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});