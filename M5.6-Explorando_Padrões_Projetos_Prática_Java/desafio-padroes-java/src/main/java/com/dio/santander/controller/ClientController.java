package com.dio.santander.controller;

import com.dio.santander.exceptions.ResourceNotFoundException;
import com.dio.santander.models.Client;
import com.dio.santander.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping("/clients")
    public List<Client> getInstructors() {
        return clientRepository.findAll();
    }

    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> getClientById(
            @PathVariable(value = "id") Long clientId) throws ResourceNotFoundException {
        Client user = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado -> " + clientId));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/clients")
    public Client createUser(@Valid @RequestBody Client client) {
        return clientRepository.save(client);
    }

    @PutMapping("/clients/{id}")
    public ResponseEntity < Client > updateClient(
            @PathVariable(value = "id") Long clientId,
            @Valid @RequestBody Client clientDetails) throws ResourceNotFoundException {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado -> " + clientId));
        client.setAddress(clientDetails.getAddress());
        client.setPhone(clientDetails.getPhone());
        client.setAccount(clientDetails.getAccount());
        final Client updatedClient = clientRepository.save(client);
        return ResponseEntity.ok(updatedClient);
    }

    @DeleteMapping("/clients/{id}")
    public Map< String, Boolean > deleteClient(
            @PathVariable(value = "id") Long clientId) throws ResourceNotFoundException {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado -> " + clientId));

        clientRepository.delete(client);
        Map < String, Boolean > response = new HashMap< >();
        response.put("Removido", Boolean.TRUE);
        return response;
    }
}