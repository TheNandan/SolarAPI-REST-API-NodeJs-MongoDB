require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const ejs = require('ejs');
const path = require('path');



const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({extended:true}));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));

app.set('view engine','ejs');


app.get("/",(req,res)=>{
    res.render('index');
});






app.listen(PORT,()=>{console.log(`server @ http://127.0.0.1:${PORT}`);});