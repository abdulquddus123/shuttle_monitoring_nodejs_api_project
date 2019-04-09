var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017',(err,db)=>{
    if(err){
        return console.log("unable to connect with mongo server");
    }
    var dbo = db.db("test");
    dbo.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5ca86353b68ae02c6c548424')
    },{
        $set:{
            name:"mozumder"
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    })

})