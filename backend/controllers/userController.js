const UserModel = require('../models/userModel');

const UserController = {
    register: async (req, res) => {
        const { nome, email, senha } = req.body;
        try {
            const user = await UserModel.create(nome, email, senha); // Corrigido para chamar a função create
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erro ao registrar usuário');
        }
    },

    login: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const user = await UserModel.findUserByEmailAndPassword(email, senha); // Corrigido aqui
            if (user) {
                res.json(user);
            } else {
                res.status(401).send('Credenciais inválidas');
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erro ao fazer login');
        }
    }
};

module.exports = UserController;