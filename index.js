const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.urlencoded({extended: true}));
app.use(cors());

const Blog = require('./models/blog');
const Product = require('./models/product');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(results => {
    console.log("running");
    app.listen(8800, () => { 
        console.log("app is up and running");
    })
})
.catch(error => {
    console.log(error);
})

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

//post a blog
app.get('/blogs/create', (req, res) => {
    const blog = new Blog ({
        title: "Hello world",
        categories: ["js", "java", "css"],
        desc: "Welcome to my website...have fun!"
    });

    blog.save()
    .then(results => {
        res.redirect('/blogs');
        res.send(results);
    })
    .catch(error => {
        console.log(error)
    })
})


//get all blogs
app.get('/blogs', (req, res) => {
    Blog.find()
    .then(results => {
        res.send(results)
    })
    .catch(error => {
        
        console.log(error)
    })
})

//get a single blog

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findById(id)
    .then(results => {
        res.send(results);
    })
    .catch(error => {
        console.log(error);
    });
});

//get all products
app.get('/products', (req, res) => {
    Product.find()
    .then(results => {
        res.send(results);
    })
    .catch(error => {
        console.log(error);
    })
})

app.get('/products/:id', (req, res) => {
    const id = req.params.id;

    Product.findById(id)
    .then(results => {
        res.send(results);
    })
    .catch(error => {
        console.log(error);
    })
})

//404 page
app.use((req, res) => {
    res.status(404);
})

