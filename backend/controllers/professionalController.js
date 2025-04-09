const ProfessionalModel = require('../models/professionalModel');

const ProfessionalController = {
    register: async (req, res) => {
        const { nome, telefone, email, cidade, especialidade, registro, senha } = req.body;
        try {
            const professional = await ProfessionalModel.createProfessional(nome, telefone, email, cidade, especialidade, registro, senha);
            res.json(professional);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erro ao registrar profissional');
        }
    },

    login: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const professional = await ProfessionalModel.findProfessionalByEmailAndPassword(email, senha);
            if (professional) {
                res.json(professional);
            } else {
                res.status(401).send('Credenciais inválidas');
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erro ao fazer login');
        }
    },

    getAll: async (req, res) => {
        try {
            const profissionais = await ProfessionalModel.findAll(); // Função que busca todos os profissionais
            res.json(profissionais);
        } catch (error) {
            console.error('Erro ao buscar profissionais:', error);
            res.status(500).send('Erro ao buscar profissionais');
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
    
        // Basic validation
        if (!id || !updatedData) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }
    
        try {
            // Validate required fields
            const requiredFields = ['nome', 'email', 'senha', 'telefone', 'cidade', 'especialidade'];
            for (const field of requiredFields) {
                if (!updatedData[field]) {
                    return res.status(400).json({ 
                        message: `Campo obrigatório faltando: ${field}` 
                    });
                }
            }
    
            const updatedProfessional = await ProfessionalModel.update(id, updatedData);
            
            if (!updatedProfessional) {
                return res.status(404).json({ message: 'Profissional não encontrado' });
            }
            
            res.json(updatedProfessional);
        } catch (error) {
            console.error('Erro ao atualizar profissional:', error);
            res.status(500).json({ 
                message: 'Erro ao atualizar profissional',
                error: error.message 
            });
        }
    },
    


    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await ProfessionalModel.delete(id);
            if (!result) {
                return res.status(404).json({ message: 'Profissional não encontrado' });
            }
            res.status(204).send(); // No Content
        } catch (error) {
            console.error('Erro ao excluir profissional:', error);
            res.status(500).json({ message: 'Erro ao excluir profissional' });
        }
    },

};

module.exports = ProfessionalController;