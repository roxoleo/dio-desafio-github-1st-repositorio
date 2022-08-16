package com.dio.santander.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long idTransaction;

    private float value;
    private LocalDateTime dateTransaction;
    private float idAccount;

    public Transaction(float value, LocalDateTime dateTransaction, float idAccount) {
        this.value = value;
        this.dateTransaction = dateTransaction;
        this.idAccount = idAccount;
    }

    public Long getIdTransaction() {
        return idTransaction;
    }

    public void setIdTransaction(Long idTransaction) {
        this.idTransaction = idTransaction;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }

    public LocalDateTime getDateTransaction() {
        return dateTransaction;
    }

    public void setDateTransaction(LocalDateTime dateTransaction) {
        this.dateTransaction = dateTransaction;
    }

    public float getIdAccount() {
        return idAccount;
    }

    public void setIdAccount(float idAccount) {
        this.idAccount = idAccount;
    }
}

