package com.server.repos;

import com.server.models.TransactionModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepo extends MongoRepository<TransactionModel, String>{
    TransactionModel findByUserId(String userId);

}