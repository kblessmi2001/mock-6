const express=require("express");
const cors=require("cors");
const { connection } = require("./db");
const  {userRouter}  = require("./Routes/user.route");
const { blogRouter } = require("./Routes/blog.route");
const { authmiddleware } = require("./middleware/auth.middleware");

const app=express();

app.use(express.json());
app.use(cors({"origin":"*"}));


app.use("/user",userRouter)
app.use("/blog",authmiddleware,blogRouter)


app.listen(8080,async()=>{
    try {
        await connection;
        console.log("DB is connected")
        console.log("Server is running at 3000")
    } catch (error) {
        console.log(error);
    }
   
})


// {
//     "name":"Blessmi",
//     "email":"kblessmi@gmail.com",
//     "avatar":"https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kh2cootvig68ngfcu948.jpeg",
//     "password":"12345"
// }