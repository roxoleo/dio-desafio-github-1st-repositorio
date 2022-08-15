package BancoDigital;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public abstract class Conta implements IConta{

    private static final int AGENCIA_PADRAO = 1;
    private static int SEQUENCIAL = 1;

    public Conta(Cliente cliente) {
        this.agencia = Conta.AGENCIA_PADRAO;
        this.cliente = cliente;
    }

    protected int agencia;
    protected Cliente cliente;

    public int getAgencia() {
        return agencia;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public float calculaSaldo(String arquivo) {
        String saldo="";
        float transacaoFloat = 0;
        float saldoFloat = 0;
        String regex = "[\\-|\\+]{1}[0-9].?\\.[0-9].?";
        Pattern padrao = Pattern.compile(regex, Pattern.MULTILINE);
        try {
            FileReader reader = new FileReader(arquivo);
            BufferedReader bufferedReader = new BufferedReader(reader);
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                Matcher matcher = padrao.matcher(line);
                while (matcher.find())  {
                    saldo=(matcher.group());
                    transacaoFloat = Float.parseFloat(saldo);
                    saldoFloat += transacaoFloat;
                }
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return saldoFloat;
    }

    protected void imprimirInfosComuns() {
        System.out.printf("Agencia: %d%n", this.agencia);
        System.out.printf("Titular: %s%n", this.cliente.getNome());
        System.out.printf("Numero: %d%n", this.cliente.getNumeroConta());
        System.out.printf("Data: %tD%n", LocalDateTime.now());
    }

    @Override
    public void sacar(float valor, String arquivo) {
        Transacao.escritor("-" + valor, arquivo);
        calculaSaldo(arquivo);
    }

    @Override
    public void depositar(float valor, String arquivo) {
        Transacao.escritor("+" + valor, arquivo);
        calculaSaldo(arquivo);
    }

    @Override
    public void transferir(float valor, Conta contaDestino, String arquivo) {
        this.sacar(valor, arquivo);
        contaDestino.depositar(valor, arquivo);
    }
}
