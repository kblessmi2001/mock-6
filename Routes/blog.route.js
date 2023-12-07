const express = require("express")
const { authmiddleware } = require("../middleware/auth.middleware")
const { BlogsModel } = require("../models/blog.model")
const blogRouter = express.Router()

blogRouter.use(authmiddleware)

blogRouter.get("/", async (req, res) => {
    try {
        const blogs = await BlogsModel.find({ userId: req.body.userID })
        res.status(200).json(blogs)
    } catch (error) {
        res.status(400).json({ error })
    }
})

blogRouter.post("/add", async (req, res) => {
    const payload = req.body
    try {
        const blog = new BlogsModel(payload)
        await blog.save()
        res.status(200).json({ msg: "A new blog has been added" })
    } catch (error) {
        res.status(400).json({ error })
    }
})

blogRouter.patch("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        let blog = await BlogsModel.findById(id);

        if (blog.userId === req.body.userID) {
            await BlogsModel.findByIdAndUpdate(id, payload);
            res.status(200).json({ msg: `Note with ${id} updated` });
        } else {
            res.status(200).json({ error: "You don't have the access to update" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

blogRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let blog = await BlogsModel.findById(id);

        if (blog.userId === req.body.userID) {
            await BlogsModel.findByIdAndDelete(id);
            res.status(200).json({ msg: `Note with ${id} deleted` });
        } else {
            res.status(200).json({ error: "You don't have the access to delete" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});


module.exports = {blogRouter}



// {
//     "username":"Blessmi",
//     "title":"React",
//     "content":"Learn redux",
//     "category":"Tech",
//     "date":"07-12-2023",
//     "like":12,
//     "comments":[{"username" : "Jane", "content" : "Good One"}, {"username" : "Bob", "content" : "Loved It!"}]
// }