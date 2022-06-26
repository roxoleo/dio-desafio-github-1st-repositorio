function calculadora() {
    const operacao = Number(prompt ('Escolha uma operação:\n 1 - Soma (+)\n 2 - Subtração (-)\n 3 - Multiplicação (*)\n 4 - Divisão real (/)\n 5 - Divisão inteira (%)\n 6 - Potenciação (**) '));
    
    if (!operacao || operacao >= 7){
        alert(`Erro - operação inválida!`);
        calculadora();
    }else {

        let n1 = Number(prompt('Insira o primeiro valor:'));
        let n2 = Number(prompt('Insira o segundo valor:'));
        let resultado;

        if (!n1 || !n2) {
            alert(`Erro - parâmetros inválidos!`)
            calculadora();
        }else {

            function soma() {
                resultado = n1 + n2;
                alert(`${n1} + ${n2} = ${resultado}`)
                novaOperacao();
            }
        
            function subtracao() {
                resultado = n1 - n2;
                alert(`${n1} - ${n2} = ${resultado}`)
                novaOperacao();
            }
        
            function multiplica() {
                resultado = n1 * n2;
                alert(`${n1} * ${n2} = ${resultado}`)
                novaOperacao();
            }
        
            function divideReal() {
                resultado = n1 / n2;
                alert(`${n1} / ${n2} = ${resultado}`)
                novaOperacao();
            }
            function divideInt() {
                resultado = n1 % n2;
                alert(`O resto da divisão entre ${n1} e ${n2} será ${resultado}`)
                novaOperacao();
            }
        
            function potencia() {
                resultado = n1 ** n2;
                alert(`${n1} elevado a ${n2} = ${resultado}`)
                novaOperacao();
            }
        
            function novaOperacao() {
                let opc = prompt('Deseja fazer outra operação?\n 1 - Sim\n 2 - Não');
            
                if (opc == 1){
                    calculadora();
                } else if (opc == 2) {
                    alert(`Até mais!`)
                } else {
                    alert(`Digite uma opção válida!`)
                    novaOperacao();
                }
            }
        }
    }
    
        // substitur if por switch
/*         if (operacao == 1) {
            soma();
        } else if (operacao == 2) {
            subtracao();
        } else if (operacao == 3){
            multiplica();
        } else if (operacao == 4){
            divideReal();
        } else if (operacao == 5){
            divideInt();
        } else if (operacao == 6){
            potencia();
        } */

        switch (operacao) {
            case 1:
                soma();
                break;
            case 2:
                subtracao();
                break;
            case 3:
                multiplica();
                break;
            case 4:
                divideReal();
                break;
            case 5:
                divideInt();
                break;
            case 6:
                potencia();
                break;
        }
}

calculadora();