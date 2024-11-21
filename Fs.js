const fs = require('fs');
// Caminho para o arquivo (substitua pelo caminho real do seu arquivo)
const caminhoDoArquivo = 'tabuada.js';
// Lê o arquivo de forma assíncrona (recomendado)
fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return;
    }
    console.log(data); 
});