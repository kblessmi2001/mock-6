const express=require("express");
const cors=require("cors");
const { connection } = require("./db");

const app=express();

app.use(express.json());
app.use(cors());

app.get("",(req,res)=>{
    res.send("BACKEND IS RUNNING->>>")
})

app.listen(8080,async()=>{
    try {
        await connection;
        console.log("DB is connected")
        console.log("Server is running at 3000")
    } catch (error) {
        console.log(error);
    }
   
})