const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseSDK.json');

admin.initializeApp({credential: admin.credential.cert(serviceAccount), databaseURL:'https://controle-financeiro-4deb4-default-rtdb.firebaseio.com/'});
const auth = admin.auth();
const app = express();
const port = 3000;
const db = admin.database();
console.log("Firebase database initialized:", !!db);

const cors = require('cors');

app.use(cors());

// Middleware para processar o conteúdo de formulários (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Middleware para servir arquivos estáticos (como o HTML da calculadora)
app.use(express.static('public'));

app.get('/custosfixos', (req, res) => {

// Serve o arquivo calculadora.html localizado na pasta public
res.sendFile(__dirname + '/public/custosFixos.html');
});

app.post('/custosfixos', async (req, res) => {

// Obtém os dados do formulário enviado
const {nomeItem, categoria, valor } = req.body;

try {
const custosFixosRef = db.ref('custosFixos');

await custosFixosRef.push({
nomeItem: nomeItem,
categoria: categoria,
valor: valor,
dataCadastro: new Date().toISOString()
});

res.status(200).send(`Custo fixo cadastrado com sucesso!
  <script>
  setTimeout(function() {
  window.location.href = "/custosfixos"; // Endpoint para redirecionar
  }, 2000); // Redirecionar após 2 segundos
  </script>
`);



  } catch (error) {

    console.error('Erro ao cadastrar custo fixo:', error);
    res.status(500).send('Erro ao cadastrar custo fixo.');
  }
});



app.get('/listarcustosfixos', async (req, res) => {

try {
  const custosFixosRef = db.ref('custosFixos');
  const snapshot = await custosFixosRef.once('value');
  const data = snapshot.val();

  if (data) {
    const formattedData = Object.values(data).map(item => {

  return {
    nomeItem: item.nomeItem,
    categoria: item.categoria,
    valor: item.valor
};

});

res.status(200).json(formattedData);

} else {
res.status(200).json([]);
}

  } catch (error) {
    console.error('Erro ao listar custos fixos:', error);
    res.status(500).send('Erro ao listar custos fixos');
  }
});

app.get('/login', async (req, res) => {
res.sendFile(__dirname + '/public/login.html');
});

app.post('/login-executar', async (req, res) => {
  // ... (lógica de autenticação)

  const userRecord = await auth.getUserByEmail(email);

  // Retornar dados do usuário para o cliente
  res.json({
    uid: userRecord.uid,
    email: userRecord.email,
    displayName: userRecord.displayName,
    // ... outros dados que você quiser retornar
  });
});

app.get('/cadastro', async (req, res) => {
res.sendFile(__dirname + '/public/cadastro.html');
});

app.post('/cadastro-salvar', async (req, res) => {
const { nome, email, senha } = req.body;

try {

// Cria um usuário no Firebase Authentication
const userRecord = await auth.createUser({
email: email,
password: senha,
displayName: nome
});

console.log('Successfully created new user:', userRecord.uid);
res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Inicializa o servidor na porta 3000
app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});