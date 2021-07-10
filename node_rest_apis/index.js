const express = require("express");
const app = express();

const mongoose = require("mongoose");
const helmet = require("helmet");
const morgon = require("morgan");
const dotenv = require("dotenv");
const userRoute= require("./routes/users");
const authRoute= require("./routes/auth");
//const nodemon = require("nodemon");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true},()=>
{
    console.log("connected to mongodB")




});

app.use(express.json());
app.use(helmet());
app.use(morgon());


app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);



app.listen(8800,()=>{
   console. log("backend server is running");
})