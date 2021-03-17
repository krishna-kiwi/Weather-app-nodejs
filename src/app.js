const express = require('express');
const path = require('path');
var hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();


// define path for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// set up handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);
// setup  static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('/',(req,res) => {
    res.render('index',{title:'weather app',name:'krishna' })
})

app.get('/about',(req,res) => {
    res.render('about',{title:'about the weather app',name:'krish' })
})


app.get('/weather',(req,res) => {
    if(!req.query.address){
        res.send({
            error:'you must provide an address'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
              return res.send(error);
            }
          
            forecast(latitude,longitude,(error,forecastData)=>{
              if(error){
                return res.send(error);
              }
                res.send({
                forecast:forecastData,
                location:location,
                address: req.query.address 
                })
            })
          })
        
    }
})

app.get('/products',(req,res) => {

    if(!req.query.search){
        res.send({
            error:'you must provide a search term'
        })
    }
    else{
        res.send({
            products:[]
        })
    }
        
})

app.get('/help',(req,res) => {
    res.send([{
        name:'krishna',
        age:32
    },{
        name:'anubhav',
        age:34 
    }])
})

app.get('*',(req,res) =>{
    res.render('404',{title:'No page found'})
})
app.get('/about/*',(req,res) => {
    res.render('404',{title:'No article found releated to about us'})
})




const port  = process.env.PORT || 4000;
app.listen(port,function(){
    console.log(`server started at port ${port}`)
})