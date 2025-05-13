// login.js
import { auth } from './firebase.js';
import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.0/firebase-auth.js"

window.login = function login() {
    try {
        const email = document.getElementById('email').value;
        const senha = document.getElementById('password').value;
        const mensagemErro = document.getElementById('mensagemErro');

        // Verifica se os campos foram preenchidos (validação básica)
        if (!email || !senha) {
            mensagemErro.textContent = "Preencha todos os campos!";
            return;
        }

    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Usuário logado:", user);
            mensagemErro.textContent = ""; // Limpa mensagem de erro
            localStorage.setItem('userData', JSON.stringify(user));
            // Redireciona para a página protegida ou realiza outras ações
            window.location.href = '/minha-assinatura';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Erro de login:", errorCode, errorMessage);
            mensagemErro.textContent = errorMessage; // Exibe a mensagem de erro do Firebase
        });
    } catch (error) {
        console.error("Erro na função login:", error);
    }
}