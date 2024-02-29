package com.server.controller;

import com.server.models.TransactionModel;
import com.server.models.UserModel;
import com.server.repos.TransactionRepo;
import com.server.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Controller
public class RouteController {

    @Autowired
    UserRepo userRepo;

    @Autowired
    TransactionRepo transactionRepo;

    @PostMapping("/register")
    public UserModel registerMethod(@RequestBody UserModel userData) {
        try {
            UserModel user = userRepo.save(userData);
            return user;
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/login")
    public UserModel loginMethod(@RequestBody UserModel userData) {
        try {
            UserModel user = userRepo.findByEmail(userData.getEmail());

            if (user.getPassword().equals(userData.getPassword())) {

                return user;
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/fetch-user/{id}")
    public UserModel fetchUserMethod(@PathVariable("id") String id){
        try {

            Optional<UserModel> user = userRepo.findById(id);
            UserModel userData = user.get();
            System.out.println(id);
            return userData;

        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/fetch-transactions")
    public List<TransactionModel> fetchTransactionsMethod(){
        try {

            List<TransactionModel> transactions = transactionRepo.findAll();
            return transactions;

        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/add-income")
    public TransactionModel addIncomeMethod(@RequestBody TransactionModel transaction){
        try {

            transactionRepo.save(transaction);

            Optional<UserModel> userData = userRepo.findById(transaction.getUserId());
            UserModel user = userData.get();

            user.setIncome(user.getIncome() + transaction.getAmount());

            if(user.getMinIncome() > transaction.getAmount() || user.getMinIncome() == 0 ){
                user.setMinIncome(transaction.getAmount());
            }

            if(user.getMaxIncome() < transaction.getAmount()){
                user.setMaxIncome(transaction.getAmount());
            }

            user.setBalance(user.getBalance() + transaction.getAmount());

            userRepo.save(user);

            return transaction;

        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/add-expense")
    public TransactionModel addExpenseMethod(@RequestBody TransactionModel transaction){
        try {

            transactionRepo.save(transaction);

            Optional<UserModel> userData = userRepo.findById(transaction.getUserId());
            UserModel user = userData.get();

            user.setExpense(user.getExpense() + transaction.getAmount());

            if(user.getMinExpense() > transaction.getAmount() || user.getMinExpense() == 0){
                user.setMinExpense(transaction.getAmount());
            }

            if(user.getMaxExpense() < transaction.getAmount()){
                user.setMaxExpense(transaction.getAmount());
            }

            user.setBalance(user.getBalance() - transaction.getAmount());

            userRepo.save(user);

            return transaction;

        } catch (Exception e) {
            return null;
        }
    }


    @GetMapping("/delete-transaction/{id}")
    public TransactionModel deleteTransaction(@PathVariable("id") String id){

        Optional<TransactionModel> trans = transactionRepo.findById(id);
        TransactionModel transaction = trans.get();

        Optional<UserModel> userData = userRepo.findById(transaction.getUserId());
        UserModel user = userData.get();

        if(Objects.equals(transaction.getType(), "income")){
               user.setBalance(user.getBalance() - transaction.getAmount());
               user.setIncome(user.getIncome() - transaction.getAmount());
        }else{
            user.setBalance(user.getBalance() + transaction.getAmount());
            user.setExpense(user.getExpense() - transaction.getAmount());
        }
        userRepo.save(user);
        transactionRepo.deleteById(id);

        return transaction;

    }



}
