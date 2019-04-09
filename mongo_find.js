var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017',(err,db)=>{
  if(err){
    return console.log("unable to connect to mongo server");
  }
  console.log("connected to mongo server");

  var dbo = db.db("test");
//   dbo.collection('Users').insertOne({
//     name:"areyen",
//     age:'25',
//     location:'mirpur'
//   },(err,result)=>{
//     if(err){
//       return console.log("unable to insert  user",err)
//     }
//     console.log(result.ops);
//   })


dbo.collection('Users').find().toArray().then((docs)=>{
    console.log("Users");
    console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
    console.log("unable to fetch Users");
})
 // db.close();
})