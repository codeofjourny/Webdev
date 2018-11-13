var bodyParser = require('body-parser');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb2"
});
var con1= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",

});

module.exports = function(app)
{
    con1.connect(function(err) {
        if (err) throw err;
       // console.log("Connected!");
        var sql = "CREATE DATABASE IF NOT EXISTS mydb2";

        con1. query(sql, function (err, result) {
            if (err) throw err;
            //console.log("Database created");
        });
    });


    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE IF NOT EXISTS c2(title VARCHAR(255), start VARCHAR(255))";

        con. query(sql, function (err, result) {
            if (err) throw err;
           // console.log("table created");
        });
    });
    var urlencodedParser = bodyParser.urlencoded({ extended: false });
    app.post('/senddb',urlencodedParser, function (req, res) {

        console.log(req.body.date);
        console.log(req.body.task1);
         var sql = "INSERT INTO c2 VALUES("+mysql.escape(req.body.task1)+","+mysql.escape(req.body.date)+")";
     //   var sql = "INSERT INTO student  VALUES ( "+ mysql.escape(req.body.name) +","+mysql.escape(req.body.email)+","+ mysql.escape(req.body.password)  +")";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("ii");
            var sql = 'SELECT * FROM c2'  ;

            con.query(sql, function (err, result) {
               // console.log(result);
                res.redirect('/');

            });




       });

    });
    app.get('/',function(req,res)
    {

        var sql = 'SELECT * FROM c2'  ;

        con.query(sql, function (err, result) {
            console.log(result);

            res.render('calander',{todo:result});
        });

      //  res.render('add',{todo:data});
    });


}

