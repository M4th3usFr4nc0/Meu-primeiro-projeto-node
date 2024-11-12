let x = 10;
let y = 5;
console.log(x + y);   // 15
console.log(x > y);    // true
console.log(x == "10"); // true (igualdade solta)
console.log(x === "10");// false (igualdade estrita - verifica tipo)
x += 5;              // Equivalente a x = x + 5
console.log(x);

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
readline.question('Preço Original: ', (preco) => {
    readline.question('Desconto: ', (desconto) => {
        preco = parseInt(preco);
        desconto = parseInt(desconto);
        const valorDesconto = preco * (desconto/100);
        const precoFinal = preco - valorDesconto;
        console.log("Valor do desconto:" + valorDesconto);
        console.log("Preço Final:" + precoFinal);
        readline.close();
    });
    readline.close();
});

let numero = 10;       // number
let texto = "Olá";     // string
let ligado = true;     // boolean
let valorNulo = null; // null
let indefinido;       // undefined
let pessoa = {         // object
  nome: "Maria",
  idade: 30       
};
let frutas = ["maçã", "banana"]; // object (array)

console.log (numero, texto, ligado, valorNulo, indefinido, pessoa.nome, pessoa.idade, frutas);
