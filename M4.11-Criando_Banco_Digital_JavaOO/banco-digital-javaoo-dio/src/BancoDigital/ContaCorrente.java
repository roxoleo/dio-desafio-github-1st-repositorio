package BancoDigital;

public class ContaCorrente extends Conta {

    public ContaCorrente(Cliente cliente) {
        super(cliente);
    }

    @Override
    public void imprimirExtrato() {
        System.out.println("********************************");
        System.out.println("**** Extrato Conta Corrente ****");
        System.out.println("********************************");
        super.imprimirInfosComuns();
        System.out.println("********************************");
        Transacao.leitor("cc.txt");
        System.out.printf("Saldo: %.2f%n", calculaSaldo("cc.txt"));
    }
}
