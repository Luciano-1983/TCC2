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

    update: async (id, data) => {
        const { nome, telefone, email, cidade, especialidade, registro, senha } = data;
        const result = await pool.query('UPDATE profissionais SET nome = $1, telefone = $2, email = $3, cidade = $4, especialidade = $5, registro = $6, senha = $7 WHERE id = $8 RETURNING *', [nome, telefone, email, cidade, especialidade, registro, senha, id]);
        return result.rows[0];
    },

    delete: async (id) => {
        try {
            const result = await pool.query('DELETE FROM profissionais WHERE id = $1 RETURNING *', [id]);
            return result.rows[0]; // Retorna o profissional excluído, se encontrado
        } catch (error) {
            console.error('Erro ao excluir profissional no modelo:', error);
            throw error; // Lança o erro para ser tratado no controlador
        }
    },

};

module.exports = ProfessionalModel;