# Desafios-Typescript-SantanderDIO

## Desafio 3 - O código abaixo tem alguns erros e não funciona como deveria. Você pode identificar quais são e corrigí-los em um arquivo _TS_?
~~~javascript
let botaoAtualizar = document.getElementById('atualizar-saldo');
let botaoLimpar = document.getElementById('limpar-saldo');
let soma = document.getElementById('soma');
let campoSaldo = document.getElementById('campo-saldo');

campoSaldo.innerHTML = 0

function somarAoSaldo(soma) {
    campoSaldo.innerHTML += soma;
}

function limparSaldo() {
    campoSaldo.innerHTML = '';
}

botaoAtualizar.addEventListener('click', function () {
    somarAoSaldo(soma.value);
});

botaoLimpar.addEventListener('click', function () {
    limparSaldo();
});
~~~
### _resposta nos arquivos do repositório._

_by roxoleo_
