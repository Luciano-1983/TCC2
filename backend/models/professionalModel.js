const pool = require('../db');

const ProfessionalModel = {
    createProfessional: async (nome, telefone, email, cidade, especialidade, registro, senha) => {
        const newProfessional = await pool.query(
            'INSERT INTO profissionais (nome, telefone, email, cidade, especialidade, registro, senha) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nome, telefone, email, cidade, especialidade, registro, senha]
        );
        return newProfessional.rows[0];
    },

    findProfessionalByEmailAndPassword: async (email, senha) => {
        const professional = await pool.query(
            'SELECT * FROM profissionais WHERE email = $1 AND senha = $2',
            [email, senha]
        );
        return professional.rows[0];
    },

    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM profissionais');
        return rows;
    },

};

module.exports = ProfessionalModel;