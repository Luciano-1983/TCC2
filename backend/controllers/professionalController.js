// Importa o modelo que contém a lógica de acesso ao banco de dados para os profissionais de saúde
const ProfessionalModel = require('../models/professionalModel');

// Define o controlador com os métodos de manipulação dos dados dos profissionais
const ProfessionalController = {
    
    // Método para registrar um novo profissional
    register: async (req, res) => {
        const { nome, telefone, email, cidade, especialidade, registro, senha } = req.body;

        try {
            // Chama o método do model para criar um novo profissional
            const professional = await ProfessionalModel.createProfessional(
                nome, telefone, email, cidade, especialidade, registro, senha
            );

            // Retorna os dados do profissional criado em formato JSON
            res.json(professional);
        } catch (err) {
            // Caso ocorra erro, exibe no console e retorna erro 500
            console.error(err.message);
            res.status(500).send('Erro ao registrar profissional');
        }
    },

    // Método para login do profissional
    login: async (req, res) => {
        const { email, senha } = req.body;

        try {
            // Busca profissional por email e senha
            const professional = await ProfessionalModel.findProfessionalByEmailAndPassword(email, senha);

            if (professional) {
                // Se encontrado, retorna os dados
                res.json(professional);
            } else {
                // Se não encontrado, retorna erro 401 (não autorizado)
                res.status(401).send('Credenciais inválidas');
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erro ao fazer login');
        }
    },

    // Método para buscar todos os profissionais cadastrados
    getAll: async (req, res) => {
        try {
            const profissionais = await ProfessionalModel.findAll(); // Consulta no banco
            res.json(profissionais); // Retorna a lista
        } catch (error) {
            console.error('Erro ao buscar profissionais:', error);
            res.status(500).send('Erro ao buscar profissionais');
        }
    },

    // Método para atualizar os dados de um profissional
    update: async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;

        // Validação básica de entrada
        if (!id || !updatedData) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }

        try {
            // Campos obrigatórios que precisam estar presentes no corpo da requisição
            const requiredFields = ['nome', 'email', 'senha', 'telefone', 'cidade', 'especialidade'];
            for (const field of requiredFields) {
                if (!updatedData[field]) {
                    return res.status(400).json({ 
                        message: `Campo obrigatório faltando: ${field}` 
                    });
                }
            }

            // Tenta atualizar os dados do profissional
            const updatedProfessional = await ProfessionalModel.update(id, updatedData);

            // Verifica se o profissional foi encontrado
            if (!updatedProfessional) {
                return res.status(404).json({ message: 'Profissional não encontrado' });
            }

            // Retorna o profissional atualizado
            res.json(updatedProfessional);
        } catch (error) {
            console.error('Erro ao atualizar profissional:', error);
            res.status(500).json({ 
                message: 'Erro ao atualizar profissional',
                error: error.message 
            });
        }
    },

    // Método para excluir um profissional pelo ID
    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await ProfessionalModel.delete(id);

            // Se não encontrou o profissional, retorna 404
            if (!result) {
                return res.status(404).json({ message: 'Profissional não encontrado' });
            }

            // Sucesso sem conteúdo (204 = No Content)
            res.status(204).send();
        } catch (error) {
            console.error('Erro ao excluir profissional:', error);
            res.status(500).json({ message: 'Erro ao excluir profissional' });
        }
    },

};

// Exporta o controlador para ser usado nas rotas
module.exports = ProfessionalController;
