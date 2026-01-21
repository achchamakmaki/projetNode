const express = require('express');
const app = express();
const monDb = require('mongoose');

const Article = require('./models/Article');


//mongodb+srv://machchamakmaki_db_user:C94F8D9zQggVxusF@projettest1.4qx4svo.mongodb.net/?appName=projetTest1
monDb.connect('mongodb+srv://machchamakmaki_db_user:C94F8D9zQggVxusF@projettest1.4qx4svo.mongodb.net/?appName=projetTest1')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});
app.use(express.json());


app.get('/hello', (req, res) => {
    res.send('hello hello');
});

app.get('/numbers', (req, res) => {
    let numbers = "";
    for (let i = 1; i <= 100; i++) {
        numbers += i + " - ";
    }
    //res.send(`The numbers are: ${numbers}`);
    //res.sendFile(__dirname + '/views/test.html');
    res.render('test.ejs', {
        name : 'John',
        numbersList: numbers,

        
        });
})

app.get('/test', (req, res) => {
    res.send('Hello test');
});

app.get('/somme/:num1/:num2', (req, res) => {
    const num1 = req.params.num1;
    const num2 = req.params.num2;

    const sum = parseFloat(num1) + parseFloat(num2);
    res.send(`La somme de ${num1} et ${num2} est ${sum}`);
});

app.put('/teste', (req, res) => {
    res.send('Hello test');
});

app.post('/testes', (req, res) => {
    res.send('Hello test');
});

app.get('/sayHello', (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send(`My name is ${req.body.name} -- ${req.body.lastName} -- Age is ${req.query.age} years`);
});

app.get('/', (req, res) => {
    res.send('Welcome to The Postman');
});


// == Articles Routes ==
app.post('/articles',async (req, res) => {
    const newArticle = new Article;

        const artTitle = req.body.articleTitle;
        const artContent = req.body.articleContent;
        
        newArticle.title = artTitle;
        newArticle.content = artContent;
        newArticle.numberOfLikes = 0;
    
        await newArticle.save()
    res.json(newArticle);

});

app.get('/articles', async (req, res) => {
    const articles = await Article.find();
    console.log("hello " , articles);
    res.json(articles);
});

app.get('/articles/:articleId', async (req, res) => {
    const id = req.params.articleId;
    try{
        const articles = await Article.findById(id);
        res.json(articles);
        return;
    }catch(err){
        res.status(404).json({message: "Article not found"});
        return;
    }
    
    
});

app.delete('/articles/:articleId', async (req, res) => {
    const id = req.params.articleId;
    try{
        const articles = await Article.findByIdAndDelete(id);
        res.json(articles);
        return;
    }catch(err){
        res.status(404).json({message: "Article not found"});
        return;
    }
    
    
});

app.get('/showArticles', async (req, res) => {
    const articles = await Article.find();
    
    res.render('articles.ejs', {
        articlesList: articles,
    });
});

app.listen(3000, () => {
    console.log('Serveur lancé sur port 3000');
});