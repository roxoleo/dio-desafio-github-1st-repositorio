//xxxxxxxxxxxxx
// ATENÇÃO - Remover este arquivo para versões em produção
//xxxxxxxxxxxxx

package com.dio.santander;

import com.dio.santander.models.Account;
import com.dio.santander.models.Client;
import com.dio.santander.repository.ClientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class LoadDb {

    private static final Logger log = LoggerFactory.getLogger(LoadDb.class);

    @Bean
    CommandLineRunner dbClient(ClientRepository clientRepository) {

        Client client = new Client("Jose Silva", "Rua A, 123", "11 1234 5678");
        Account account = new Account("123456", 100f);

        client.setAccount(account);

        return args -> {
            log.info("Pré-carregando " + clientRepository.save(client));
        };
    }
}
