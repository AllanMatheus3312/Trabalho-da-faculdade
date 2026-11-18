document.addEventListener('DOMContentLoaded', () => {

    const botoesOlho = document.querySelectorAll('.btn-olho');

    botoesOlho.forEach(botao => {
        botao.addEventListener('click', () => {
            const inputSenha = botao.previousElementSibling;
            if (inputSenha.type === 'password') {
                inputSenha.type = 'text';
                botao.textContent = '🙈';
            } else {
                inputSenha.type = 'password';
                botao.textContent = '👁️';
            }
        });
    });

    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = formCadastro.querySelectorAll('input:not([type="button"])');
            
            const novoUsuario = {
                nome: inputs[0].value,
                cpf: inputs[1].value,
                celular: inputs[2].value,
                cep: inputs[3].value,
                email: inputs[4].value,
                senha: inputs[5].value
            };

            localStorage.setItem('usuarioCadastrado', JSON.stringify(novoUsuario));

            alert('Cadastro realizado com sucesso!');
            formCadastro.reset();
        });
    }

    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = formLogin.querySelectorAll('input:not([type="button"])');
            const usuarioDig = inputs[0].value;
            const senhaDig = inputs[1].value;

            const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioCadastrado'));

            if (!usuarioSalvo) {
                alert('Nenhum usuário cadastrado ainda! Faça o cadastro primeiro.');
                return;
            }

            const loginValido = (
                usuarioDig === usuarioSalvo.email ||
                usuarioDig === usuarioSalvo.cpf ||
                usuarioDig === usuarioSalvo.celular
            );

            if (loginValido && senhaDig === usuarioSalvo.senha) {
                alert(`Login realizado com sucesso! Bem-vindo(a), ${usuarioSalvo.nome}!`);
                formLogin.reset();
            } else {
                alert('E-mail/CPF/Celular ou senha incorretos.');
            }
        });
    }

});