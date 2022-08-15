package BancoDigital;

public class ContaPoupanca extends Conta {

    private Double juros;

    public ContaPoupanca(Cliente cliente) {
        super(cliente);
    }

    public Double getJuros() {
        return juros;
    }

    public void setJuros(Double juros) {
        this.juros = juros;
    }

    @Override
    public void imprimirExtrato() {
        System.out.println("******************************");
        System.out.println("*** Extrato Conta Poupança ***");
        System.out.println("*******************************");
        super.imprimirInfosComuns();
        System.out.println("*******************************");
        Transacao.leitor("poupanca.txt");
        System.out.printf("Saldo: %.2f%n", calculaSaldo("poupanca.txt"));
    }
}
