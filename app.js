const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
});


app.post("/", (req, res) =>{
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us2.api.mailchimp.com/3.0/lists/83a0dd80c0";


  const options = {
    method: "POST",
    auth: "steverobin771:8718b1c33fb1c1c2425431ec371f5c68-us2"
  }

  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data){
    });
  });


  request.write(jsonData);
  request.end();

});


app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running in port 3000");
});


//API KEY
//8718b1c33fb1c1c2425431ec371f5c68-us2

//ID
//83a0dd80c0
