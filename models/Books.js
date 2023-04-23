const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title:{type:String, required: true},
    isbn:{type:String, required:true},
    author:{type:String},
    description:{type:String},
    published_date:{type:Date},
    publisher:{type:String},
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const Book = mongoose.model("Book",BookSchema);

module.exports = Book;