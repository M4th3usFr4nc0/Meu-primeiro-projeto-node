const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const crypto = require('crypto');
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const queryParameters = parsedUrl.searchParams;
  
  function gerarMD5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
  }

  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();  // Concatenando dados do corpo
    });

    req.on('end', () => {
      // Agora o corpo da requisição está completo, podemos processá-lo
      const postData = querystring.parse(body);
      const senha = postData.senha;
      
      if (senha === 'Felix') {
        console.log('logado no sistema');
        const senhaCriptografada = gerarMD5(senha);
        console.log(`Senha criptografada em MD5: ${senhaCriptografada}`);
      } else {
        console.log('senha incorreta');
      }
    });
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('calculadora.html', (err, data) => {
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
