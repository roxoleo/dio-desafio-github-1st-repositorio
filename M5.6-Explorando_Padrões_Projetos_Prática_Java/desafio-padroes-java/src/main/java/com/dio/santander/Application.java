package com.dio.santander;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}

//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//
//import Client;
//import Account;
//import ClientRepository;
//
//@SpringBootApplication
//public class Application implements CommandLineRunner {
//
//	public static void main(String[] args) {
//		SpringApplication.run(Application.class, args);
//	}
//
//	@Autowired
//    private ClientRepository clientRepository;
//
//    @Override
//    public void run(String...args) throws Exception {
//
//        Client client = new Client("Aakash", "Verma", "t_aakash.verma@india.nec.com");
//
//        Account clientDetail = new Account("Java Guides", "Taking Photographs");
//
//        // associate the objects
//        client.setclientDetail(clientDetail);
//
//        clientRepository.save(client);
//    }
//
//}
