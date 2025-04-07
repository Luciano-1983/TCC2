const pool = require('../db');

const UserModel = {
    create: async (nome, email, senha) => { // Corrigido para usar a função create
        const newUser  = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, senha]
        );
        return newUser .rows[0];
    },

    findUserByEmailAndPassword: async (email, senha) => { // Corrigido aqui
        const user = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
            [email, senha]
        );
        return user.rows[0];
    }
};

module.exports = UserModel;