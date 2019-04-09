var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";

MongoClient.connect('mongodb://localhost:27017',(err,db)=>{
  if(err){
    return console.log("unable to connect to mongo server");
  }
  console.log("connected to mongo server");

  var dbo = db.db("test");
  dbo.collection('Users').insertOne({
    name:"fida",
    age:'25',
    location:'Banani'
  },(err,result)=>{
    if(err){
      return console.log("unable to insert  user",err)
    }
    console.log(result.ops);
  })
  db.close();
})
