package BancoDigital;
import java.util.Scanner;

import static BancoDigital.Transacao.imprimirCliente;

public class Main {
     public static void main(String[] args) {
         Cliente cliente = new Cliente();
         String opcao;
         Scanner in = new Scanner(System.in);
         do {
             System.out.print(
                "[1] Cadastrar um novo cliente \n" +
                 "[2] Imprimir extrato de conta corrente \n" +
                 "[3] Imprimir extrato de conta poupança \n" +
                 "[4] Imprimir cliente \n" +
                 "[5] Depositar conta corrente \n" +
                 "[6] Sacar conta corrente \n" +
                 "[7] Depositar poupança \n" +
                 "[8] Sacar poupança \n" +
                 "[9] Transferir CC para poupança \n" +
                 "[10] Transferir poupança para CC \n" +
                 "[11] Sair \n" +
                 "Escolha uma opção: "
             );
             opcao = in.nextLine();
             float valor;
             Conta cc = new ContaCorrente(cliente);
             Conta poupanca = new ContaPoupanca(cliente);
             switch (opcao) {
                 case "1":
                     cliente.criarCliente();
                     break;
                 case "2":
                     cc.imprimirExtrato();
                     break;
                 case "3":
                     poupanca.imprimirExtrato();
                     break;
                 case "4":
                     imprimirCliente();
                     break;
                 case "5":
                     System.out.print("Valor: ");
                     valor = in.nextFloat();
                     cc.depositar(valor, "cc.txt");
                     break;
                 case "6":
                     System.out.print("Valor: ");
                     valor = in.nextFloat();
                     cc.sacar(valor, "cc.txt");
                     break;
                 case "7":
                     System.out.print("Valor: ");
                     valor = in.nextFloat();
                     poupanca.depositar(valor, "poupanca.txt");
                     break;
                 case "8":
                     System.out.print("Valor: ");
                     valor = in.nextFloat();
                     poupanca.sacar(valor, "poupanca.txt");
                     break;
                 case "9":
                     valor = in.nextFloat();
                     System.out.print("Valor: ");
                     cc.transferir(valor, poupanca, "poupanca.txt");
                     break;
                 case "10":
                     valor = in.nextFloat();
                     System.out.print("Valor: ");
                     poupanca.transferir(valor, cc, "cc.txt");
                     break;
                 case "11":
                     break;
                 default:
                     System.out.println("Opção inválida");
                     break;
             }
         } while (!opcao.equals("11"));
     }
 }