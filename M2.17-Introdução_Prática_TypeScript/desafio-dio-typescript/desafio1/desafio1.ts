/*
DESAFIO 1:

Como rodar isso em um arquivo .ts sem causar erros?

 let employee = {};
employee.code = 10;
employee.name = "John";
*/

//RESPOSTA: explicitando os tipos das variáveis e
//          garantindo os parâmetros conforme os tipos

let funcionario:{codigo:number,nome:string} = {
    codigo:53,      //number sem ' '
    nome:'LéoRoxo'  //string entre ' '
};

console.log(`${funcionario.nome}´s code is ${funcionario.codigo}.`);