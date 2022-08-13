/*
DESAFIO 2: Como melhorar o esse código usando TS?

let pessoa1 = {};
pessoa1.nome = "Suzana";
pessoa1.idade = 29;
pessoa1.profissao = "Designer"

let pessoa2 = {}
pessoa2.nome = "Leopoldo";
pessoa2.idade = 19;
pessoa2.profissao = "Aprendiz";

let pessoa3 = {
    nome: "Luiza",
    idade: 32,
    profissao: "Designer"
};

let pessoa4 = {
    nome = "Pedro",
    idade = 19,
    profissao = "Aprendiz"
}

*/

//RESPOSTA: - criando uma estrutura com enum e interface
//para definir um conjunto pré-definido de valores 
//          - explicitando os tipos e parâmetros adequados

enum Profissao{
    Aprendiz,
    Designer
}

interface Pessoa{
    nome:string,
    idade:number,
    profissao:Profissao
}

let pessoa1 : {nome:string, idade:number, profissao:Profissao} = {
    nome : "Suzana",
    idade : 29,
    profissao : Profissao.Designer
};

let pessoa2 : {nome:string, idade:number, profissao:Profissao} = {
    nome : "Leopoldo",
    idade : 19,
    profissao : Profissao.Aprendiz
};


let pessoa3 : Pessoa = {
    nome: "Luiza",
    idade: 32,
    profissao: Profissao.Designer
};

let pessoa4 : Pessoa = {
    nome : "Pedro",
    idade : 19,
    profissao : Profissao.Aprendiz
}