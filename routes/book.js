const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Book = require("../models/Books.js");

const User = require("../models/User.js");

const router = express.Router();

const verifyToken = require("./verifyToken.js")

router.get("/", async(req,res)=>{
    try{
        const books = await Book.find();
        res.json(books);
    }catch(err){
        res.status(500).json({message:err});
    }
})

router.post("/", async(req,res)=>{

    const {title, isbn, author, description, published_date, publisher} = req.body;

    const book = new Book({_id: new mongoose.Types.ObjectId(),title, isbn, author, description, published_date, publisher});

    try{
        const savedBook = await book.save();
        res.json(savedBook);
    }catch(err){
        res.status(500).json({message:err});
    }
})

router.get("/:bookId",async(req,res)=>{
    try{
        const book = await Book.findById(req.params.bookId);
        res.json(book);
    }catch(err){
        res.status(500).json({message:err});
    }
})

router.put("/:bookId", async(req,res)=>{
    try{

        

        const book = await Book.findById(req.params.bookId);
        

        if(!book){
            return res.status(404).send("Book not found");
        }
        const{title, isbn, author, description, published_date, publisher} = req.body;

        book.title = title;
        book.isbn = isbn;
        book.author = author;
        book.description = description;
        book.published_date = published_date;
        book.publisher = publisher;

        const updatedBook = await book.save();
        
       

        
            
            res.status(200).json({
                updatedBook,message:"book updated successfully"});
            
    
        
    }catch(error){
        res.status(500).send(error.message);
    }
})

router.delete("/:id", async(req,res)=>{
    try{

        const {id} = req.params;

        
        
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook){
            return res.status(404).send("Book not found");
        }
        res.status(200).send("Book deleted");
    }catch(error){
        res.status(500).send(error.message);
    }
})

module.exports = router;