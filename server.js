require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


// server
const app = express();

// server port
const PORT = process.env.PORT || 8080;

// mongoose connection
const DB = process.env.DB || 'solarLDB';
mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`,{useNewUrlParser:true});

// collection schema`
const planetSchema = {
    'position':Number,
    'name':String,
    'velocity':Number,
    'distance':Number,
    'description':String
};
const Planet = mongoose.model("Planet",planetSchema);

// middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));

app.set('view engine','ejs');


app.get("/",(req,res)=>{
    res.render('index');
});

app.route('/planets')
// Fetching all planets using GET Method
.get((req,res)=>{
    Planet.find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data);
        }
    })
})
// Inserting a specific planet using POST Method
.post((req,res)=>{
    

    const newPlanet = new Planet({
    position : req.body.position,
	name : req.body.planetname,
	velocity : req.body.velocity,
	distance : req.body.distance,
	description : req.body.description
    })

    newPlanet.save((err)=>{
        if(!err){
            res.send('Inserted Planet Successfully');
        }else{
            res.send(err);
        }
    });
})
// Deleting all Planets from SolarDb using DELETE Method
.delete((req,res)=>{
    Planet.deleteMany((err)=>{
        if(!err){
            res.send('Deleted All Planets Successfully')
        }else{
            res.send(err);
        }
    });
});






app.listen(PORT,()=>{console.log(`server @ http://127.0.0.1:${PORT}`);});