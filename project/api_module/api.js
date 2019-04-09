const express = require("express");
const bodyParser = require("body-parser");
const camera_api=express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mysql = require("mysql");
var multer=require("multer")

var server_connection=require("../server_connection/connection")


 

//bus location information api

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  // filename: function (req, file, cb) {

  //   cb(null, file.fieldname + '-' + Date.now()+'.jpg')

  // }

  filename: function(request, file, cb) {
    let fileName = "",
      postName;
    if (typeof request.body.postName !== "undefined") {
      postName = request.body.postName.toLowerCase().replace(/ /g, "-");
      filename += postName;
    }
    fileName += new Date().getTime();
    fileName += ".png";
    cb(null, fileName);
  }
});

var upload = multer({ storage: storage }).single("profileImage");
//var upload = multer({ dest: 'uploads/'});
camera_api.post("/bus_information_api", function(req, res) {
  const con = mysql.createConnection({
    host: server_connection.hostname,
    user: server_connection.user,
    database: server_connection.database_name
  });

  con.connect(function(err) {
    if (err) {
      var json = JSON.stringify({
        status: "200",
        result: server_connection.database_connection_error
      });
      res.end(json);
    } else {
      upload(req, res, function(err, result) {
        if (err) {
          console.log(err)
          res.json({
            status:true,
            message:"upload failed"
          })
          // An unknown error occurred when uploading.
        } else {

          try{


            var originalFileName = req.file.filename;
            console.log("file--"+originalFileName)
  
            var date = req.body.date;
            var time=req.body.time;
            var bus_id=req.body.bus_id;
            var lat=req.body.lat;
            var lon=req.body.lon;
               
           
            if((date.trim().length>0) && (time.trim().length>0) && (bus_id.trim().length>0) && (lat.trim().length>0))
            {
              var queryString =
              "INSERT bus_information (location_image_name,date,time,bus_id,lat,lon) VALUES(?,?,?,?,?,?)";
            con.query(queryString, [originalFileName, date,time,bus_id,lat,lon], function( error,results) {
              if (error) {
                console.log(errror)
                res.json({
                  status: false,
                  message: "Image Upload failed"
                });
              } else {
                var json=JSON.stringify({
                  status:true,
                  data:results,
                  message:"Data Submit Successfully"
              });
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
              res.end(json);
              }
            });
   
            }
            else{
              // res.json({
              //   success: true,
              //   message: "Image Upload failed"
              // });    
              var json=JSON.stringify({
                status:"200",
                result:"sorry !!  ",
                message:"require field"
            });
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
            res.end(json);
            }
  
  
  
  
          }
          catch(err){

          }

        }

        // Everything went fine.
      });
    }
  });
});




camera_api.post("/user_login" , (req, res) => {
 
    const con = mysql.createConnection({
        host : "localhost",
        user : "root",
        database : "camera_nodejs_api"
      });
    con.connect(function(err){
        if(err){
            
            var json=JSON.stringify({
                status:"200",
                result:"sorry !! database connection error"
            });
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
            res.end(json);
        }
        else{
            console.log("succes")
  
          
               var phone_number=req.body.phone_number;
              var password=req.body.password;
            const queryString="SELECT * FROM usser WHERE usser.phone_number=? AND usser.password=?"
            
            con.query(queryString,[phone_number,password] ,function(error,result){
              console.log(result.length)
              if(result.length>0){
                var json=JSON.stringify({
                  status:true,
                  results:"  user  found",
                  data: result
              });
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
              res.end(json);

                

              }
              else{
                var json=JSON.stringify({
                  status:false,
                  results:"sorry !! user not found"
              });
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
              res.end(json);

              }
            })

           


        }
       
    })
})



camera_api.post("/user_password_check" , (req, res) => {
 
  const con = mysql.createConnection({
      host : "localhost",
      user : "root",
      database : "camera_nodejs_api"
    });
  con.connect(function(err){
      if(err){
          
          var json=JSON.stringify({
              status:"200",
              result:"sorry !! database connection error"
          });
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
          res.end(json);
      }
      else{
          console.log("succes")
        //   var user_name = req.body.fdsd;
        
              
            var password=req.body.password;
          const queryString="SELECT * FROM usser WHERE  usser.password=?"
          
          con.query(queryString,[password] ,function(error,result){
            console.log(result.length)
            if(result.length>0){
              var json=JSON.stringify({
                status:true,
                results:"  user  found",
                data: result
            });
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
            res.end(json);

              

            }
            else{
              var json=JSON.stringify({
                status:false,
                results:"sorry !! user not found"
            });
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
            res.end(json);

            }
          })

         


      }
     
  })
})




module.exports=camera_api