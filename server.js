const cors = require('cors'); 
const express = require('express');
const bodyParser = require("body-parser");
const app = express();app.use(cors());
app.set('port', 3002)


const sqlite3 = require('sqlite3').verbose();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

var server = app.listen(app.get('port'), function() {
	console.log("Server started...")
})

app.get("/", function(req, res, next){
    res.send("Server Running...");
});

app.get("/api/homeRandomizer.json", function(req, res, next){
      // open the database
let db = new sqlite3.Database('./database/projects.db');

let sql = `SELECT * FROM project WHERE id IN (SELECT id FROM project ORDER BY RANDOM() LIMIT 8)`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log(rows);
  res.json(rows);
});

// close the database connection
db.close();
    
});


app.post('/api/search/', function(req, res){
      // open the database
      let db = new sqlite3.Database('./database/projects.db');

      let sql = `SELECT * FROM project WHERE name LIKE '%${req.body}%' OR description LIKE '%${req.body}%'`;
      
      db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        res.json(rows);
        console.log("Data sent...");
        console.log('Got body:', req.body);
      });
      
      // close the database connection
      db.close();
  });