var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017',(err,db)=>{
    if(err){
        return console.log("Unable to connect to mongo server")
    }
 
    var dbo = db.db("test");
    // dbo.collection('Users').deleteOne({name : "fida"}).then((result)=>{
    //     console.log(result);
    // });
    dbo.collection('Users').findOneAndDelete({name:"areyen"}).then((result)=>{
console.log(result);
    })



})