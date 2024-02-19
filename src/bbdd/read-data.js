// var MongoClient = require('mongodb').MongoClient;
import { MongoClient } from 'mongodb';

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("abysse");
  /*Return only the documents with the address "Park Lane 38":*/
//   var query = { address: /^S/ };
  var query = { id: "1" };
  dbo.collection("fishes").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

      