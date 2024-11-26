const http = require('http');
const fs = require('fs'); // Importa o módulo fs para ler arquivos
const querystring = require('querystring');
const crypto = require('crypto');
const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`); // Cria um objeto URL

  const queryParameters = parsedUrl.searchParams;
  function gerarMD5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
  }
  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
      const postData= querystring.parse(body);
    const senha= postData.senha;
    if (senha == "Felix") {
    console.log("logado no sitema")
    const senhaCriptografada = gerarMD5(senha)
    console.log(`Senha criptografada em MD5: ${senhaCriptografada}`);
    } else { 
    console.log("senha incorreta")
    }
    });
    
}
res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('form.html', (err, data) => { // Lê o arquivo form.html
        res.end(data);
     });
});
server.listen(3000,"192.168.1.51", () => {
  console.log('Servidor ouvindo na porta 3000');
});