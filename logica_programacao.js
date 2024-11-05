const idade = 15;
if (idade >= 18) {
  console.log("Você é maior de idade.");
} else {
  console.log("Você é menor de idade.");
}

const nota = 4.5;
if (nota >= 7) {
  console.log("Aprovado");
} else if (nota >= 5) {
  console.log("Recuperação");
} else if (nota >= 3) {
  console.log("final");
} else {
  console.log("Reprovado");
}

const peso = 77;
const altura = 1.74;
if (peso/(altura*altura) >= 40) {
    console.log("Obersidade grau 3");
} else if (peso/(altura*altura) >= 35) {
    console.log("Obesidade graus 2");
} else if (peso/(altura*altura) >= 30) {
    console.log("Obesidade graus 1");
} else if (peso/(altura*altura) >= 25) {
    console.log("sobrepeso");
} else if (peso/(altura*altura) >= 18.5) {  
    console.log("Peso normal");
} else {
    console.log("Abaixo do peso");
}
