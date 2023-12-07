
const mongoose = require("mongoose")

const blogsSchema = mongoose.Schema({
    username:String,
    title:String,
    content:String,
    category:String,
    date:String,
    likes:Number,
    comments:Array

},
{
    versionKey:false
})

const BlogsModel = mongoose.model("blogs",blogsSchema)
module.exports = {BlogsModel}



