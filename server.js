const express = require('express');
const app = express();

const plantRouter = require('./router/plantRouter.js');

app.use('/',express.static(__dirname));

app.use('/plant-profile',plantRouter);

app.get('/',(req,res)=>{
  res.sendFile("./index.html");
});

app.listen(8080,()=>{
  console.log("listening at port 8080");
});
