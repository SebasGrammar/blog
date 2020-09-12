const express = require("express"),
    app = express();

const mongoose = require("mongoose")

const methodOverride = require("method-override")

const articleRouter = require("./controllers/articles")

const Article = require("./models/article")

mongoose.connect("mongodb://localhost/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

// app.use("/articles", articleRouter)

// app.get("/articles", (req, res) => {
//     res.send("LOLLS")
// })

app.get("/", async (req, res) => {
    // const articles = [{
    //     title: "Title",
    //     createdAt: new Date(),
    //     description: "Description"
    // }]
    const articles = await Article.find().sort({ createdAt: "desc" })
    res.render("articles/index", {articles})
})

app.use("/articles", articleRouter)


app.listen(3000)
