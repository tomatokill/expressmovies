const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const multer=require('multer');
const upload = multer();

let frenchMovies = [];

app.use('/public',express.static('public'));


app.set('views','./views');
app.set('view engine','ejs');

app.get('/movies',function(req,res)
{
    const title = "Films français des 30dernières années";

    frenchMovies = [
        {title: "Le fabuleux destin d'Amélie Poulain", year: 2001},
        {title: "Buffet fro", year: 1979},
        {title: "Le diner de cons", year: 1998},
        {title: "sdf sdfsdf", year: 2012}
    ]
    res.render('movies', {titleMovie:title, frenchMovies: frenchMovies});
})

var urlencodedParser = bodyParser.urlencoded({extended:false});

// app.post('/movies', urlencodedParser,(req,res) =>{
//     console.log(req.body);
//     console.log("movie title",req.body.movieTitle);
//     const newMovie = {title: req.body.movieTitle, year: parseInt(req.body.movieYear)};
//     frenchMovies = [...frenchMovies,newMovie];
//     console.log(frenchMovies);
//     res.sendStatus(201);
// })

app.post('/movies', upload.fields([]), (req,res)=>{
    if (!req.body) {
        return res.status(500);
    } else {
        const formData = req.body;
        console.log ('formdata', formData);
        const newMovie = {title: req.body.movieTitle, year: parseInt(req.body.movieYear)};
        frenchMovies = [...frenchMovies,newMovie];
        res.sendStatus(201);
    }
})

/* app.get('/movies-details',function(req,res)
{
    res.render('movies-details');
}) */

app.get('/movies/add',(req,res)=>{
    res.send("prochainement un formulaire d\'ajout");
})

// (req,res) => Equivalent de function(req,res)
app.get('/movies/:id/:title',(req,res)=>{
    const id=req.params.id;
    const title=req.params.title;
    // res.send(`Film numéro ${id}`);
    res.render('movies-details.ejs',{movieid: id, movietitle:title});

})

app.get('/',(req,res)=>
{    
    // res.send("Helllo <b>world!!!</b>");
    res.render('index');
})

app.listen(PORT, ()=>{
    console.log(`listening port ${PORT}`);
})