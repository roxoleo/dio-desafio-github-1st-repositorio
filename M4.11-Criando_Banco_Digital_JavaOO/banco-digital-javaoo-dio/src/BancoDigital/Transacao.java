package BancoDigital;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.Scanner;

public class Transacao {

    public static void leitor(String arquivo) {
        try {
            FileReader reader = new FileReader(arquivo);
            BufferedReader bufferedReader = new BufferedReader(reader);

            String line;

            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
            }
            reader.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void escritor(String valor, String arquivo) {
        try {
            FileWriter writer = new FileWriter(arquivo, true);
            BufferedWriter bufferedWriter = new BufferedWriter(writer);
            LocalDateTime data = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
            bufferedWriter.append(data.format(formatter) + " => R$" + valor + "\n");
            bufferedWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void imprimirCliente(){
        try {
            FileReader reader = new FileReader("clientes.txt");
            BufferedReader bufferedReader = new BufferedReader(reader);

            String line;
            Scanner in = new Scanner(System.in);
            System.out.print("Conta do cliente (x para todos): ");
            String conta = in.nextLine();
            System.out.println("*************");
            while ((line = bufferedReader.readLine()) != null) {
                if (line.equals(conta)) {
                    for (int i = 0; i < 3;i++){
                        System.out.println(bufferedReader.readLine());
                    }
                } else if (Objects.equals(conta, "x")) {
                    System.out.println(bufferedReader.readLine());
                }
                System.out.println(bufferedReader.readLine());
            }
            System.out.println("*************");
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
