const express = require("express"),
    router = express.Router();

const Article = require("../models/article")

router.get("/new", (req, res) => {
    // const articleId = req.params.id
    // const article = Article.findById(articleId)
    res.render("articles/new", { article: new Article() })
})

// router.get("/panel", async (req, res) => {
//     let articles = await Article.find()
//     res.render("articles/show", { articles })
// })

router.get("/panel", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc" })
    // res.render("articles/index", { articles })

    // res.render("index") -> articles is not defined!
    res.render("articles/index", { articles })
})

router.get("/edit/:id", async (req, res) => {
    // const articleId = req.params.id
    // const article = Article.findById(articleId)
    const article = await Article.findById(req.params.id)
    res.render("articles/edit", { article })
})

// router.get("/:slug", async (req, res) => {
//     // const articleId = req.params.id
//     // const article = await Article.findById(articleId)

//     const slug = req.params.slug
//     const article = await Article.findOne({ slug })
//     if (article == null) {
//         res.redirect("/")
//     }
//     res.render("articles/show", { article })
// })

router.get("/:slug", async (req, res) => {
    // const articleId = req.params.id
    // const article = await Article.findById(articleId)

    const slug = req.params.slug
    const article = await Article.findOne({ slug })
    if (article == null) {
        res.redirect("/")
    }
    res.render("articles/test", { article })
})

// router.post("/", async (req, res) => {
//     let article = new Article({
//         title: req.body.title,
//         description: req.body.description,
//         markdown: req.body.markdown
//     })

//     try {
//         article = await article.save()
//         // res.redirect(`articles/${article.id}`)
//         res.redirect(`articles/${article.slug}`)
//     } catch (error) {
//         console.log(`Error: ${error}`)
//         res.render("articles/new", { article })
//     }
// })

router.post("/", async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect("new"))

router.put("/:id", async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect("edit"))


// router.put("/:id", (req, res) => {

// })

router.delete("/:id", async (req, res) => {
    const articleId = req.params.id
    await Article.findByIdAndDelete(articleId)
    res.redirect("/")
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article

        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown


        try {
            article = await article.save()
            // res.redirect(`articles/${article.id}`)
            res.redirect(`articles/${article.slug}`)
        } catch (error) {
            res.render(`articles/${path}`, { article })
        }
    }
}

module.exports = router