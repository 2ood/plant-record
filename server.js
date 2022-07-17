const express = require('express');
const app = express();

const plantRouter = require('./router/plantRouter.js');

app.use('/',express.static(__dirname));
app.use('/img',express.static(__dirname+"/img"));
app.use('/mobile',express.static(__dirname+"/mobile"));
app.use('/plant-profile',express.static(__dirname+"/plant-profile"));
app.use('/posts',express.static(__dirname+"/posts"));
app.use('/router',express.static(__dirname+"/router"));
app.use('/script',express.static(__dirname+"/script"));
app.use('/style',express.static(__dirname+"/style"));

app.use('/profile',plantRouter);


app.get('/',(req,res)=>{
  res.sendFile("./index.html");
});

app.listen(8080,()=>{
  console.log("listening at port 8080");
});
