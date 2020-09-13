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

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc" })
    // res.render("articles/index", { articles })

    // res.render("index") -> articles is not defined!
    res.render("index", { articles })
})

app.use("/articles", articleRouter)

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
