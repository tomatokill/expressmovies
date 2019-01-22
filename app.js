const express = require('express');
const app = express();
const PORT = 3000;

app.set('views','./views');
app.set('view engine','ejs');

app.get('/movies',function(req,res)
{
    res.send("Bientôt des films!");    
})

app.get('/movies/add',(req,res)=>{
    res.send("prochainement un formulaire d\'ajout");
})

// (req,res) => Equivalent de function(req,res)
app.get('/movies/:id',(req,res)=>{
    const id=req.params.id;
    res.send(`Film numéro ${id}`)
})

app.get('/',(req,res)=>
{    
    // res.send("Helllo <b>world!!!</b>");
    res.render('index');
})

app.listen(PORT, ()=>{
    console.log(`listening port ${PORT}`);
})