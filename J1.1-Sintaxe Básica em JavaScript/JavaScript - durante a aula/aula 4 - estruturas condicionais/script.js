//condicional IF
/* var jogador1 = 0;
var placar;
if(jogador1 > 0){
        console.log('Jogador1 marcou ponto!');
} */

// condicional ELSE
/* var jogador1 = 0;
var placar;

if (jogador1 > 0) {
    console.log('Jogador 1 marcou ponto!');
} else {
        console.log('Ninguém marcou ponto');
} */

// condicional ELSE IF
/* var jogador1 = 0;
var jogador2 = 0;
var placar;

if (jogador1 > 0) {
    console.log('Jogador 1 marcou ponto!');
} else if (jogador2 > 0) {
        console.log('Jogador 2 marcou ponto');
} else {
        console.log('Ninguém marcou ponto');
} */

/* // condicional NINHO de IF

var jogador1 = 0;
var jogador2 = 1;
var placar;

if (jogador1 != -1) {
        if (jogador1 > 0) {
                console.log('jogador1 marcou ponto!');
        } else if (jogador2 > 0) {
                console.log('jogador2 marcou ponto!')
        } else {
                console.log('ninguém marcou ponto!');
        }
} else {
        console.log('jogador inválido!');
} */

/* // condicional IF TERNÁRIO (IF subentendido em 1 linha só)
var jogador1 = -1;
var jogador2 = 1;
var placar;

jogador1 != -1 && jogador2 != -1 ? console.log('Os jogadores são válidos') : console.log('Jogadores Inválidos!'); 
if (jogador1 > 0) {
        console.log('jogador1 marcou ponto!');
} else if (jogador2 > 0) {
        console.log('jogador2 marcou ponto!')
} else {
        console.log('ninguém marcou ponto!');
} */

/* // condicional IF APRIMORADO
var jogador1 = -1;
var jogador2 = 0;
var placar;

// if ternário
jogador1 != -1 && jogador2 != -1 ? console.log('Os jogadores são válidos') : console.log('Jogadores Inválidos!'); 

// usando if
if (jogador1 > 0 && jogador2 == 0) {
        console.log('jogador1 marcou ponto!');
        placar = jogador1 > jogador2;
} 
// usando else if
else if (jogador2 > 0 && jogador1 == 0) {
        console.log('jogador2 marcou ponto!')
        placar = jogador2 > jogador1;
} 
// usando else
else {
        console.log('ninguém marcou ponto!');
}

// condicional SWITCH/CASE
switch (placar) {
        case placar = jogador1 > jogador2:
                console.log('jogador1 ganhou!');
                break;
        case placar = jogador2 > jogador1:
                console.log('jogador2 ganhou!');
                break;
        default:
                console.log('ninguém ganhou!');
} */

/* // repetição FOR
let array = ['valor1', 'valor2', 'valor3', 'valor4', 'valor5'];
let object = {propriedade1: 'valor1', propriedade2: 'valor2', propriedade3: 'valor3'};        
        for (let indice = 0; indice < array.length; indice++) {
        console.log(indice);
        } */

/* // repetição FOR-IN com array
let array = ['valor1', 'valor2', 'valor3', 'valor4', 'valor5'];
let object = {propriedade1: 'valor1', propriedade2: 'valor2', propriedade3: 'valor3'}; 
for (let i in array) {
        console.log(i);
}        

// FOR-IN com Object
for (i in object) {
        console.log(i);
} */        

/* // repetição FOR-OF com array
let array = ['valor1', 'valor2', 'valor3', 'valor4', 'valor5'];
let object = {propriedade1: 'valor1', propriedade2: 'valor2', propriedade3: 'valor3'}; 
for (let i of array) {
        console.log(i);
}        

// FOR-OF com Object ==não convencional==
for (i of object.propriedade1) {
        console.log(i);
} */

/* // WHILE
var a = 0;
while(a < 10){
        a++;
        console.log(a);
} */

/* // DO-WHILE
var a = 0;
do{
        a++;
        console.log(a);
}while(a < 15) */