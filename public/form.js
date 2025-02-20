document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.uid) {
        document.getElementById("uid").value = userData.uid;
    }

    // Função para aplicar máscara no campo (aceita backspace corretamente)
    function aplicarMascara(input, mascara) {
        input.addEventListener("input", function () {
            let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número
            let resultado = "";
            let index = 0;

            for (let i = 0; i < mascara.length; i++) {
                if (mascara[i] === "#" && index < valor.length) {
                    resultado += valor[index++];
                } else if (mascara[i] !== "#") {
                    resultado += mascara[i];
                }
            }

            input.value = resultado;
        });

        input.addEventListener("keydown", function (event) {
            if (event.key === "Backspace") {
                let valor = input.value.replace(/\D/g, ""); // Remove caracteres não numéricos
                valor = valor.slice(0, -1); // Remove o último caractere numérico
                let resultado = "";
                let index = 0;

                for (let i = 0; i < mascara.length; i++) {
                    if (mascara[i] === "#" && index < valor.length) {
                        resultado += valor[index++];
                    } else if (mascara[i] !== "#") {
                        resultado += mascara[i];
                    }
                }

                input.value = resultado;
                event.preventDefault(); // Impede a ação padrão do Backspace
            }
        });
    }

    aplicarMascara(document.getElementById("whatsapp"), "(##) #####-####");
    aplicarMascara(document.getElementById("datacadastro"), "##/##/####");

    // Validação do formulário antes do envio
    document.querySelector("form").addEventListener("submit", function (event) {
        let valido = true;

        function validarCampo(id, mensagem) {
            let campo = document.getElementById(id);
            let erroSpan = document.getElementById(id + "-erro");

            if (!campo.value.trim()) {
                valido = false;
                campo.style.border = "2px solid red"; // Destaca o campo em vermelho

                // Se a mensagem de erro ainda não existe, cria uma
                if (!erroSpan) {
                    erroSpan = document.createElement("span");
                    erroSpan.id = id + "-erro";
                    erroSpan.style.color = "red";
                    erroSpan.style.fontSize = "14px";
                    erroSpan.textContent = mensagem;
                    campo.parentNode.insertBefore(erroSpan, campo.nextSibling);
                }
            } else {
                campo.style.border = "2px solid #15b66c"; // Borda verde se preenchido
                if (erroSpan) {
                    erroSpan.remove(); // Remove a mensagem de erro se o campo for preenchido
                }
            }
        }

        validarCampo("nome", "O nome é obrigatório.");
        validarCampo("titulo", "O título é obrigatório.");
        validarCampo("datacadastro", "A data de cadastro é obrigatória.");
        validarCampo("descricao", "A descrição é obrigatória.");
        validarCampo("categoria", "A categoria é obrigatória.");
        validarCampo("subcategoria", "A subcategoria é obrigatória.");
        validarCampo("estado", "O estado é obrigatório.");
        validarCampo("cidade", "A cidade é obrigatória.");
        validarCampo("bairro", "O bairro é obrigatório.");
        validarCampo("whatsapp", "O WhatsApp é obrigatório.");
        validarCampo("fotos", "Adicione pelo menos uma foto.");
        validarCampo("experiencia", "Informe sua experiência na área.");

        if (!valido) {
            event.preventDefault(); // Impede o envio do formulário se houver erros
        }
    });
});
