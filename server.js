const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");
const port = 5000;  


const app = express();

app.use(cors());
app.use(express.json());


const url = "mongodb+srv://1thejusjoshi:booklist@cluster0.1rwc46f.mongodb.net/?retryWrites=true&w=majority";

const userRouter = require("./routes/user.js");

const bookRouter = require("./routes/book.js");

app.use("/auth", userRouter);
app.use("/books", bookRouter);

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(err);
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})