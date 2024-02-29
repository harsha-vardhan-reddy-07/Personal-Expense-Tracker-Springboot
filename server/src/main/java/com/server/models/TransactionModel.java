package com.server.models;

import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document(collection = "transactions")
public class TransactionModel{
    public String _id;
    public String userId;
    public String title;
    public Integer amount;
    public String date;
    public String description;
    public String type;
    public String category;

    public TransactionModel() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "TransactionModel{" +
                "_id='" + _id + '\'' +
                ", title='" + title + '\'' +
                ", date='" + date + '\'' +
                ", description='" + description + '\'' +
                ", type='" + type + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
