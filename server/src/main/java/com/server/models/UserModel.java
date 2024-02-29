package com.server.models;

import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document(collection = "users")
public class UserModel {
    public String _id;
    public String username;
    public String email;
    public String password;
    public Integer balance = 0;
    public Integer income = 0;
    public Integer expense = 0;
    public Integer minIncome = 0;
    public Integer maxIncome = 0;
    public Integer minExpense = 0;
    public Integer maxExpense = 0;

    public UserModel() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public Integer getIncome() {
        return income;
    }

    public void setIncome(Integer income) {
        this.income = income;
    }

    public Integer getExpense() {
        return expense;
    }

    public void setExpense(Integer expense) {
        this.expense = expense;
    }

    public Integer getMinIncome() {
        return minIncome;
    }

    public void setMinIncome(Integer minIncome) {
        this.minIncome = minIncome;
    }

    public Integer getMaxIncome() {
        return maxIncome;
    }

    public void setMaxIncome(Integer maxIncome) {
        this.maxIncome = maxIncome;
    }

    public Integer getMinExpense() {
        return minExpense;
    }

    public void setMinExpense(Integer minExpense) {
        this.minExpense = minExpense;
    }

    public Integer getMaxExpense() {
        return maxExpense;
    }

    public void setMaxExpense(Integer maxExpense) {
        this.maxExpense = maxExpense;
    }
}