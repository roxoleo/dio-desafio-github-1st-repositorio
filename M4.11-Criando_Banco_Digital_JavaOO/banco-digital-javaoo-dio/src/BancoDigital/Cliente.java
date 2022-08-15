package BancoDigital;

import java.io.*;
import java.util.Scanner;

public class Cliente {

    private String nome;
    private String endereco;
    private String telefone;
    private int numeroConta;

    public void criarCliente() {

        try {
            File file  = new File("clientes.txt");
            int count = 4;
            if(file.isFile()) {
                FileReader reader = new FileReader("clientes.txt");
                String line;
                BufferedReader bufferedReader = new BufferedReader(reader);
                while ((line = bufferedReader.readLine()) != null) {
                    count++;
                }
                reader.close();
            }

            FileWriter writer = new FileWriter("clientes.txt", true);
            BufferedWriter bufferedWriter = new BufferedWriter(writer);
            Scanner in = new Scanner(System.in);

            numeroConta = count/4;
            bufferedWriter.append (Integer.toString(numeroConta) + '\n');

            System.out.print("Nome: ");
            nome = in.nextLine();
            bufferedWriter.append(nome + '\n');

            System.out.print("Endereço: ");
            endereco = in.nextLine();
            bufferedWriter.append(endereco + '\n');

            System.out.print("Telefone: ");
            telefone = in.nextLine();
            bufferedWriter.append(telefone + '\n');
            bufferedWriter.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //Deixamos fixo para depois implementar
    public String getNome() {
        return "José Silva Santos";
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    //Deixamos fixo para depois implementar
    public int getNumeroConta() {
        return 1;
    }

    public void setNumeroConta(int numeroConta) {
        this.numeroConta = numeroConta;
    }
}
