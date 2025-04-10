// Importa o modelo que gerencia o acesso aos dados dos usuários
const UserModel = require('../models/userModel');

// Define o controlador com os métodos relacionados ao usuário
const UserController = {

    // Método para registrar um novo usuário
    register: async (req, res) => {
        // Extrai os dados do corpo da requisição
        const { nome, email, senha } = req.body;

        try {
            // Chama a função do model para criar o usuário no banco
            const user = await UserModel.create(nome, email, senha); 

            // Retorna os dados do usuário criado como resposta
            res.json(user);
        } catch (err) {
            // Em caso de erro, exibe no console e retorna erro 500
            console.error(err.message);
            res.status(500).send('Erro ao registrar usuário');
        }
    },

    // Método para login do usuário
    login: async (req, res) => {
        // Extrai email e senha do corpo da requisição
        const { email, senha } = req.body;

        try {
            // Busca o usuário pelo email e senha
            const user = await UserModel.findUserByEmailAndPassword(email, senha); 

            if (user) {
                // Se encontrado, retorna os dados
                res.json(user);
            } else {
                // Caso não encontrado, retorna erro 401 (não autorizado)
                res.status(401).send('Credenciais inválidas');
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erro ao fazer login');
        }
    }
};

// Exporta o controlador para ser utilizado nas rotas
module.exports = UserController;

