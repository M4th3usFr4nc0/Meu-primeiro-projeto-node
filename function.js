/*
function nomeFuncao(parametro1, parametro2, parametron) {
    codigo
    codigo
      return resultado;
    }
*/


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
}); /*
function areaDoRetangulo(largura, altura) {
    const area = largura * altura;
    return area;
}
readline.question('largura: ', (largura) => {
    readline.question("altura:", (altura) => {
        console.log("Area do retangulo:", areaDoRetangulo(largura, altura),  "cm²");
        readline.close()
    });
});
*/

function areaDoCirculo(raio) {
    const area = 3.14 * raio * raio;
    return area;
}
readline.question('Raio: ', (raio) => {
        console.log("Area do Circulo:", areaDoCirculo(raio),  "cm²");
        readline.close();
});
