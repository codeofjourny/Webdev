var express = require('express');
var app=express();
var bodyParser = require('body-parser');
var calandercontroller=require('./controllers/calandercontroller');
var data ={events :[{title: 'All Day Evenaasasdt',start: '2016-12-01'},{title: 'All Day Event',start: '2018-11-01'}]};
//var calandercontroller = require('./controllers/calandercontroller');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine','ejs');
app.use(express.static('./'));



app.get('/add',function(req,res)
{
    res.render('add',{todo:data});
});
calandercontroller(app);
app.listen(4400);