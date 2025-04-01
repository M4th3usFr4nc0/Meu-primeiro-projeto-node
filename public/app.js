const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseSDK.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount), databaseURL: 'https://controle-financeiro-4deb4-default-rtdb.firebaseio.com/' });
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

app.get('/meus-anuncios', (req, res) => {

  // Serve o arquivo calculadora.html localizado na pasta public
  res.sendFile(__dirname + '/public/meusanuncios.html');
});

app.post('/meus-anuncios', async (req, res) => {

  // Obtém os dados do formulário enviado
  const {
    nome,
    titulo,
    datacadastro,
    descricao,
    categoria,
    subcategoria,
    estado,
    cidade,
    bairro,
    whatsapp,
    fotos,
    experiencia,
    uid
  } = req.body;

  try {
    const meusanunciosRef = db.ref(uid);

    await meusanunciosRef.push({
      nome: nome,
      titulo: titulo,
      descricao: descricao,
      categoria: categoria,
      subcategoria: subcategoria,
      estado: estado,
      cidade: cidade,
      bairro: bairro,
      whatsapp: whatsapp,
      fotos: fotos,
      experiencia: experiencia,
      uid: uid,
      dataCadastro: new Date().toISOString()
    });

    res.status(200).send(`Anuncio cadastrado com sucesso!
  <script>
  setTimeout(function() {
  window.location.href = "/meus-anuncios"; // Endpoint para redirecionar
  }, 2000); // Redirecionar após 2 segundos
  </script>
`);



  } catch (error) {
    console.error('Erro ao anunciar:', error);
    res.status(500).send('Erro ao cadastrar');
  }
});

app.get('/listar-resultados', async (req, res) => {

  try {
    const meusanunciosRef = db.ref(); // Referência raiz do banco de dados
    const snapshot = await meusanunciosRef.once('value');
    const data = snapshot.val();
    const categoria = req.query.categoria;

    if (data) {
      const formattedData = [];

      // Percorre cada usuário na base
      Object.entries(data).forEach(([userID, anuncios]) => {
        // Percorre cada anúncio dentro do usuário
        Object.entries(anuncios).forEach(([anuncioID, item]) => {
          console.log(categoria);
          if (categoria && categoria != item.categoria){return}
          formattedData.push({
              anuncioID, // ID do anúncio
              userID, // ID do usuário que postou o anúncio
              titulo: item.titulo,
              categoria: item.categoria,
              descricao: item.descricao,
              cidade: item.cidade,
              estado: item.estado,
              dataCadastro: new Date(item.dataCadastro).toLocaleDateString("pt-BR"),
              whatsapp: item.whatsapp,
            });
        });
      });

      return res.json(formattedData);
    } else {
      return res.json([]);
    }
  } catch (error) {
    console.error("Erro ao buscar anúncios:", error);
    return res.status(500).send("Erro ao buscar anúncios.");
  }

});

app.get('/listarmeusanuncios', async (req, res) => {

  try {
    const uid = req.query.uid;
    const meusanunciosRef = db.ref(uid);
    const snapshot = await meusanunciosRef.once('value');
    const data = snapshot.val();

    if (data) {
      const formattedData = Object.entries(data).map(([anuncioID, item]) => ({
        anuncioID, // Adiciona o ID do anúncio
        titulo: item.titulo,
        categoria: item.categoria,
        descricao: item.descricao,
        cidade: item.cidade,
        dataCadastro: new Date(item.dataCadastro).toLocaleDateString("pt-BR"),
      }));


      res.status(200).json(formattedData);

    } else {
      res.status(200).json([]);
    }

  } catch (error) {
    console.error('Erro ao cadastrar', error);
    res.status(500).send('Erro ao cadastrar');
  }
});

app.get("/excluir-anuncio", async (req, res) => {
  try {
    const uid = req.query.uid;
    const id = req.query.id; // ID do anúncio a ser excluído

    if (!uid || !id) {
      return res.status(400).json({ error: "UID e ID do anúncio são obrigatórios." });
    }

    const meusanunciosRef = db.ref(`${uid}/${id}`);
    const snapshot = await meusanunciosRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Anúncio não encontrado." });
    }

    await meusanunciosRef.remove();
    return res.send(`
        <script>
          alert("Anúncio excluído com sucesso.");
          window.location.href = "/meus-anuncios";
        </script>
      `);
  } catch (error) {
    console.error("Erro ao excluir anúncio:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
});


app.get('/login', async (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/quem-somos', async (req, res) => {
  res.sendFile(__dirname + '/public/quemsomos.html');
});

app.get('/contato', async (req, res) => {
  res.sendFile(__dirname + '/public/contato.html');
});

app.get('/como-anunciar', async (req, res) => {
  res.sendFile(__dirname + '/public/comoAnunciar.html');
});

app.get('/categorias', async (req, res) => {
  res.sendFile(__dirname + '/public/categorias.html');
});

app.get('/minha-assinatura', async (req, res) => {
  res.sendFile(__dirname + '/public/minhaassinatura.html');
});

app.get('/resultado', async (req, res) => {
  res.sendFile(__dirname + '/public/resultado.html');
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

app.get('/pagina-protegida', async (req, res) => {
  res.sendFile(__dirname + '/public/paginaProtegida.html');
});

app.get('/listar-categorias', async (req, res) => {
  try {
    const categoriasRef = db.ref("Categorias"); // Referência ao nó "Categorias"
    const snapshot = await categoriasRef.once('value');
    const data = snapshot.val();

    if (data) {
      const categorias = Object.keys(data); // Obtém apenas os nomes das categorias
      return res.json(categorias);
    } else {
      return res.json([]);
    }
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return res.status(500).send("Erro ao buscar categorias.");
  }
});

app.get('/listar-subcategorias', async (req, res) => {
  try {
    const categoria = req.query.categoria; // Obtém a categoria da query string

    if (!categoria) {
      return res.status(400).json({ error: "O parâmetro 'categoria' é obrigatório." });
    }

    const subcategoriasRef = db.ref(`Categorias/${categoria}`); // Caminho para a categoria informada
    const snapshot = await subcategoriasRef.once('value');
    const data = snapshot.val();

    if (data) {
      const subcategorias = Object.keys(data); // Obtém os nomes das subcategorias
      return res.json(subcategorias);
    } else {
      return res.json([]);
    }
  } catch (error) {
    console.error("Erro ao buscar subcategorias:", error);
    return res.status(500).send("Erro ao buscar subcategorias.");
  }
});

app.get('/teste', async (req, res) => {
  res.sendFile(__dirname + '/public/teste.html');
});

// Inicializa o servidor na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});