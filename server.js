const express = require('express');
const hbs=require('hbs');
const fs=require('fs')

var app = express();

hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine','hbs');



app.use((req,res,next)=>{
  debugger
  var now=new Date().toString();
  var log=`${now}:${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err)=>{
    if(err){
      console.log('Enable to append file server.log');
    }
  });
  next();
})

app.use((req,res,next)=>{
  res.render('maintenance.hbs')
})

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
  //return 'test'
})

hbs.registerHelper('scremIt',(text)=>{
  return text.toUpperCase();
  //return 'test'
})



app.get('/',(req,res)=>{
  //res.send('<h1>Hello World</h1>')

  res.render('home.hbs',{
    pageTitle:'homepage',
    message:'Welcome',
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'aboutpage',
  })
})

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Aleart'
  })
})



app.listen(3000)
