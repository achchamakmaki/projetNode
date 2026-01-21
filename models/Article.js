const monDb = require('mongoose');
const Schema = monDb.Schema;

const articleSchema = new Schema({
    title: String,
    content: String,
    numberOfLikes: Number,
});

const Article = monDb.model('Article', articleSchema);

module.exports = Article;