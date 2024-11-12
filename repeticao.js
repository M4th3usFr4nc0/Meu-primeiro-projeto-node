const compras = ['leite',
  'pão',
  'queijo',
  'ovos',
  [ 'frango', 'peixe', ["picanha", "cupim"]],
  "coca"
];
for (let i = 0; i < compras.length; i++) {
  console.log(`Comprar: ${compras[i]}`);
}

  console.log(`Comprar: ${compras[0]}, ${compras[1]}, ${compras[2]}, ${compras[3]}`);

  console.log(compras[4][1][3]);
  console.log(compras[4][2][1][2]);

  const compras2 = {
    laticinios: 'leite',
    padaria: 'pão',
    frios: 'queijo',
    outros: 'ovos',
    carnes: [ {frango: ["coxa", "asa", "peito"]}, 'peixe', 'boi' ]
  }
console.log(compras2.frios);
console.log(compras2.carnes[0]);
console.log(compras2.carnes[0].frango[1][2]);

let vidas = 3;
while (vidas > 0) {
  console.log(`Jogando... Vidas restantes: ${vidas}`);
  // Simulação de perda de vida (remover quando o jogo real for implementado)
  vidas--;
}
console.log("Game Over!");

const tabela = [
    [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ];
  for (let i = 0; i < tabela.length; i++) { // Percorre as linhas
    let linha = "";
    for (let j = 0; j < tabela[i].length; j++) { // Percorre as colunas
      linha += tabela[i][j] + " ";
    }
    console.log(linha);
  }