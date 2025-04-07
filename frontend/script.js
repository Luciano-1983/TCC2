document.addEventListener('DOMContentLoaded', () => {
    // === Inicialização de elementos ===
    const souProfissionalButton = document.getElementById('sou-profissional');
    const buscoProfissionalButton = document.getElementById('busco-profissional');
    const initialScreen = document.getElementById('initial-screen');

    const souProfissionalNavButton = document.getElementById('sou-profissional-nav');
    const buscoProfissionalNavButton = document.getElementById('busco-profissional-nav');
    const voltarInicialNavButton = document.getElementById('voltar-inicial-nav');

    const profissionalLoginForm = document.getElementById('profissional-login-form');
    const profissionalLoginSection = document.getElementById('profissional-login');
    const profissionalRegisterButton = document.getElementById('profissional-register');
    const voltarInicialProfissionalLoginButton = document.getElementById('voltar-inicial-profissional-login');

    const registerProfissionalFormSection = document.getElementById('profissional-register-form');
    const registerProfissionalForm = document.getElementById('register-profissional-form');
    const voltarLoginButton = document.getElementById('voltar-login');

    const profissionalDashboardSection = document.getElementById('profissional-dashboard');
    const profissionalNomeExibicao = document.getElementById('profissional-nome-exibicao');
    const profissionalNomeValor = document.getElementById('profissional-nome-valor');
    const profissionalTelefoneValor = document.getElementById('profissional-telefone-valor');
    const profissionalCidadeValor = document.getElementById('profissional-cidade-valor');
    const profissionalEspecialidadeValor = document.getElementById('profissional-especialidade-valor');
    const profissionalRegistroValor = document.getElementById('profissional-registro-valor');
    const editarDadosButton = document.getElementById('editar-dados');
    const logoutProfissionalButton = document.getElementById('logout-profissional');
    const excluirCadastroButton = document.getElementById('excluir-cadastro');

    const editarProfissionalFormSection = document.getElementById('editar-profissional-form');
    const editarRegisterProfissionalForm = document.getElementById('editar-register-profissional-form');
    const cancelarEdicaoButton = document.getElementById('cancelar-edicao');

    const usuarioBuscaSection = document.getElementById('usuario-busca');
    const buscaProfissionalForm = document.getElementById('busca-profissional-form');
    const voltarInicialBuscaButton = document.getElementById('voltar-inicial-busca');
    const resultadosBuscaSection = document.getElementById('resultados-busca');
    const listaProfissionais = document.getElementById('lista-profissionais');

    // === Seções de Login e Registro de Usuário ===
    const usuarioLoginSection = document.getElementById('usuario-login');
    const usuarioLoginForm = document.getElementById('usuario-login-form');
    const usuarioRegisterButton = document.getElementById('usuario-register');
    const voltarInicialUsuarioLoginButton = document.getElementById('voltar-inicial-usuario-login');

    const usuarioRegisterFormSection = document.getElementById('usuario-register-form');
    const registerUsuarioForm = document.getElementById('register-usuario-form');
    const voltarLoginUsuarioButton = document.getElementById('voltar-login-usuario');

    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let usuarioLogado = null;

    let profissionais = JSON.parse(localStorage.getItem('profissionais') || '[]');
    let profissionalLogado = null;

    // === Funções de controle de exibição ===
    function showSection(section) {
        document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
        section.classList.remove('hidden');
    }

    function checkLogin() {
        const logado = localStorage.getItem('logado');
        if (logado) {
            profissionalLogado = JSON.parse(logado);
            showProfissionalDashboard(profissionalLogado);
        }
    }

    function checkUsuarioLogin() {
        const usuarioLogadoData = localStorage.getItem('usuarioLogado');
        if (usuarioLogadoData) {
            usuarioLogado = JSON.parse(usuarioLogadoData);
            showUsuarioBusca(); // Redireciona para a tela de busca após o login
        }
    }

    function showUsuarioBusca() {
        showSection(usuarioBuscaSection);
    }

    function showProfissionalDashboard(profissional) {
        profissionalNomeExibicao.textContent = profissional.nome;
        profissionalNomeValor.textContent = profissional.nome;
        profissionalTelefoneValor.textContent = profissional.telefone;
        profissionalCidadeValor.textContent = profissional.cidade;
        profissionalEspecialidadeValor.textContent = profissional.especialidade;
        profissionalRegistroValor.textContent = profissional.registro;
        showSection(profissionalDashboardSection);
    }

    // === Listeners dos botões da tela inicial ===
    souProfissionalButton.addEventListener('click', () => {
        showSection(profissionalLoginSection);
    });

    buscoProfissionalButton.addEventListener('click', () => {
        showSection(usuarioLoginSection); // Mostra a tela de login do usuário
    });

    // === Listeners dos botões da barra de navegação ===
    souProfissionalNavButton.addEventListener('click', () => {
        showSection(profissionalLoginSection);
    });

    buscoProfissionalNavButton.addEventListener('click', () => {
        showSection(usuarioLoginSection); // Mostra a tela de login do usuário
    });

    voltarInicialNavButton.addEventListener('click', () => {
        showSection(initialScreen);
    });

    // === Listeners e lógica da tela de login do profissional ===
    profissionalRegisterButton.addEventListener('click', () => {
        showSection(registerProfissionalFormSection);
    });

    voltarInicialProfissionalLoginButton.addEventListener('click', () => {
        showSection(initialScreen);
    });

    profissionalLoginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('profissional-login-email').value;
        const senha = document.getElementById('profissional-login-password').value;

        const response = await fetch('http://localhost:5000/api/professionals/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        if (response.ok) {
            const profissional = await response.json();
            localStorage.setItem('logado', JSON.stringify(profissional));
            profissionalLogado = profissional;
            showProfissionalDashboard(profissional);
        } else {
            alert('Credenciais inválidas.');
        }
    });

    // === Listeners e lógica da tela de registro do profissional ===
    voltarLoginButton.addEventListener('click', () => {
        showSection(profissionalLoginSection);
    });

    registerProfissionalForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nome = document.getElementById('profissional-nome').value;
        const telefone = document.getElementById('profissional-telefone').value;
        const email = document.getElementById('profissional-email').value;
        const cidade = document.getElementById('profissional-cidade').value;
        const especialidade = document.getElementById('profissional-especialidade').value;
        const registro = document.getElementById('profissional-registro').value;
        const senha = document.getElementById('profissional-senha').value;

        const response = await fetch('http://localhost:5000/api/professionals/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, telefone, email, cidade, especialidade, registro, senha }),
        });

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            showSection(profissionalLoginSection);
        } else {
            alert('Erro ao cadastrar profissional.');
        }
    });

    // === Listeners e lógica do dashboard do profissional ===
    editarDadosButton.addEventListener('click', () => {
        showSection(editarProfissionalFormSection);
        // Pré-preenche os campos do formulário de edição com os dados atuais
        document.getElementById('editar-profissional-nome').value = profissionalLogado.nome;
        document.getElementById('editar-profissional-telefone').value = profissionalLogado.telefone;
        document.getElementById('editar-profissional-cidade').value = profissionalLogado.cidade;
        document.getElementById('editar-profissional-especialidade').value = profissionalLogado.especialidade;
        document.getElementById('editar-profissional-registro').value = profissionalLogado.registro;
    });

    logoutProfissionalButton.addEventListener('click', () => {
        localStorage.removeItem('logado');
        profissionalLogado = null;
        showSection(initialScreen);
    });

    excluirCadastroButton.addEventListener('click', async () => {
        if (confirm('Tem certeza que deseja excluir seu cadastro? Esta ação não poderá ser desfeita.')) {
            // Remove o profissional do array de profissionais
            profissionais = profissionais.filter(p => p.id !== profissionalLogado.id);

            // Atualiza o localStorage
            localStorage.setItem('profissionais', JSON.stringify(profissionais));

            // Limpa o localStorage do profissional logado
            localStorage.removeItem('logado');
            profissionalLogado = null;

            // Redireciona para a tela inicial
            showSection(initialScreen);
        }
    });

    // === Listeners e lógica da tela de edição do profissional ===
    cancelarEdicaoButton.addEventListener('click', () => {
        showProfissionalDashboard(profissionalLogado);
    });

    editarRegisterProfissionalForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        profissionalLogado.nome = document.getElementById('editar-profissional-nome').value;
        profissionalLogado.telefone = document.getElementById('editar-profissional-telefone').value;
        profissionalLogado.cidade = document.getElementById('editar-profissional-cidade').value;
        profissionalLogado.especialidade = document.getElementById('editar-profissional-especialidade').value;
        profissionalLogado.registro = document.getElementById('editar-profissional-registro').value;

        // Atualiza no localStorage
        localStorage.setItem('logado', JSON.stringify(profissionalLogado));

        showProfissionalDashboard(profissionalLogado);
    });

    // === Listeners e lógica da tela de busca do usuário ===
    voltarInicialBuscaButton.addEventListener('click', () => {
        showSection(initialScreen);
    });

    buscaProfissionalForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const especialidade = document.getElementById('busca-especialidade').value;
        const cidade = document.getElementById('busca-cidade').value;

        const response = await fetch('http://localhost:5000/api/professionals'); // Rota para buscar todos os profissionais
        const profissionais = await response.json();

        const resultados = profissionais.filter(profissional => {
            // Se ambos os campos estiverem preenchidos, usa ambos os critérios
            if (especialidade && cidade) {
                return profissional.especialidade === especialidade &&
                       profissional.cidade.toLowerCase().includes(cidade.toLowerCase());
            }
            // Se apenas a especialidade estiver preenchida
            else if (especialidade) {
                return profissional.especialidade === especialidade;
            }
            // Se apenas a cidade estiver preenchida
            else if (cidade) {
                return profissional.cidade.toLowerCase().includes(cidade.toLowerCase());
            }
            // Se nenhum dos campos estiver preenchido, retorna todos os profissionais
            else {
                return true;
            }
        });

        listaProfissionais.innerHTML = ''; // Limpa resultados anteriores
        if (resultados.length > 0) {
            resultados.forEach(profissional => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${profissional.nome}</strong><br>
                    Telefone: ${profissional.telefone}<br>
                    Cidade: ${profissional.cidade}<br>
                    Especialidade: ${profissional.especialidade}<br>
                    Registro: ${profissional.registro}
                    <button class="verificar-registro" data-registro="${profissional.registro}">Verificar Registro</button>
                `;
                listaProfissionais.appendChild(li);
            });
            resultadosBuscaSection.classList.remove('hidden');
        } else {
            listaProfissionais.innerHTML = '<p>Nenhum profissional encontrado com os critérios de busca.</p>';
            resultadosBuscaSection.classList.remove('hidden');
        }
    });

    listaProfissionais.addEventListener('click', function(event) {
        if (event.target.classList.contains('verificar-registro')) {
            const registro = event.target.dataset.registro;
            const corenURL = `https://www.portalcoren-rs.gov.br/index.php?categoria=servicos&pagina=consulta-profissional&Inscricao=${registro}`;
            window.open(corenURL, '_blank');
        }
    });

    // === Listeners e lógica da tela de login do usuário ===
    usuarioRegisterButton.addEventListener('click', () => {
        showSection(usuarioRegisterFormSection);
    });

    voltarInicialUsuarioLoginButton.addEventListener('click', () => {
        showSection(initialScreen);
    });

    usuarioLoginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('usuario-login-email').value;
        const senha = document.getElementById('usuario-login-password').value;

        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        if (response.ok) {
            const usuario = await response.json();
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            usuarioLogado = usuario;
            showUsuarioBusca(); // Redireciona para a tela de busca
        } else {
            alert('Credenciais inválidas.');
        }
    });

    // === Listeners e lógica da tela de registro do usuário ===
    voltarLoginUsuarioButton.addEventListener('click', () => {
        showSection(usuarioLoginSection);
    });

    registerUsuarioForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nome = document.getElementById('usuario-nome').value;
        const email = document.getElementById('usuario-email').value;
        const senha = document.getElementById('usuario-senha').value;

        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha }),
        });

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            showSection(usuarioLoginSection);
        } else {
            alert('Erro ao cadastrar usuário.');
        }
    });

    // Inicialização: verifica se há um profissional logado ao carregar a página
    checkLogin();
    checkUsuarioLogin();
});