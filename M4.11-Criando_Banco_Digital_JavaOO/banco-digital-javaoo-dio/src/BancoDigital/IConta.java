package BancoDigital;

public interface IConta {

   void imprimirExtrato ();

    void sacar(float valor, String arquivo);

    void depositar(float valor, String arquivo);

    void transferir(float valor, Conta contaDestino, String arquivo);
}
