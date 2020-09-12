const mongoose = require("mongoose"),
    { Schema } = mongoose;

const marked = require("marked"),
    slugify = require("slugify"),
    createDomPurify = require("dompurify"),
    { JSDOM } = require("jsdom"),
    dompurify = createDomPurify(new JSDOM().window);

const Article = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        required: true
    }
})

Article.pre("validate", function (next) {
    let title = this.title
    if (title) {
        this.slug = slugify(title, {
            lower: true,
            strict: true
        })
    }

    let markdown = this.markdown
    if (markdown) {
        this.sanitizedHTML = dompurify.sanitize(marked(markdown))
    }

    next()
})

module.exports = mongoose.model("Article", Article)