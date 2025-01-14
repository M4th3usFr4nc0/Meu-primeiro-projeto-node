const express = require('express');
const fs = require('fs').promises; // Promises para leitura de arquivos
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Middleware para processar dados do body
app.use(bodyParser.urlencoded({ extended: true }));

// Função para gerar o hash MD5
function gerarMD5(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}

// Rota para servir o formulário (GET)
app.get('/', async (req, res) => {
  try {
    const formHtml = await fs.readFile('form.html', 'utf-8'); // Leitura assíncrona do arquivo
    res.status(200).send(formHtml); // Envia o HTML como resposta
  } catch (err) {
    console.error("Erro ao carregar o formulário:", err);
    res.status(500).send('Erro ao carregar o formulário.');
  }
});

// Rota para processar login (POST)
app.post('/login', (req, res) => {
  const senha = req.body.senha; // Extrai a senha do body da requisição

  if (senha === 'Felix') {
    const senhaCriptografada = gerarMD5(senha);
    console.log("Logado no sistema.");
    console.log(`Senha criptografada em MD5: ${senhaCriptografada}`);
    res.status(200).send('Login bem-sucedido!');
  } else {
    console.log("Senha incorreta.");
    res.status(401).send('Senha incorreta.');
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
