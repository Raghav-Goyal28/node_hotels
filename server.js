const express = require('express')
const app = express();
const db=require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body
const port = process.env.PORT || 3000; 

//const Person = require("./models/Person");
//const MenuItem=require("./models/MenuItem");

app.get('/', function (req, res) {
  res.send('Hello rl')
})




   //Import router files
   const personRoutes=require('./routes/personRoutes');
  const menuItemRoutes=require('./routes/menuItemRoutes');

   //use router
   app.use('/person',personRoutes);
  app.use('/menu',menuItemRoutes);


app.listen(3000,()=>{
    console.log('listening on port');
})
