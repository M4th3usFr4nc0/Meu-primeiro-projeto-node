const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
readline.question('Digite seu nome: ', (nome) => {
    console.log(`Olá, ${nome}!`);
    readline.question('Digite sua idade: ', (idade) => {
        // Converter a idade para número, pois readline retorna string
        const idadeNumero = parseInt(idade); 
        if (isNaN(idadeNumero)) {
            console.log("Idade inválida. Por favor, digite um número.");
        } else {
            console.log(`Você tem ${idadeNumero} anos.`);
        }
        if (idadeNumero < 18){
           console.log("Voce é menor de idade");
        } else {
            console.log("Voce é maior de idade");
        }
        readline.close();
    });
});