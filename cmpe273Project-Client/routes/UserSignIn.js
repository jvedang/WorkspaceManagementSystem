var ejs = require("ejs");

var mq_client = require('../rpc/client');

function signin(req,res)
{
  var username = req.param('username');
  var password = req.param('password');
  var msg_payload = {"username":username,"password":password,"service":"signin"};
  
  mq_client.make_request('sign_queue', msg_payload,function(err,response){
	 if(err){
		 throw err;
	 } 
	 else
		 {
		 if(response.length>0)
			 {
			 req.session.username=response[0].username;
			 req.session.prof=response[0].pid;
			 req.session.check=response[0].passw;
			 res.send({"signin":"Success"});
			 }
		 else
			 {
			  res.send({"signin":"Fail"});
			 }
		 }
  });

}

function signup(req,res)
{
 console.log("signup enteredc"); 
 var username = req.param('username');
 var password = req.param('password');
 var role = req.param('role');
 //var lname = req.param('lname');
 //var email = req.param('email');
 
 var msg_payload = {"username":username,"password":password, "role":role, "service":"signup"};
 //console.log(msg_payload);
 mq_client.make_request('sign_queue', msg_payload,function(err,response){
	 if(err){
		 console.log(err);
		 throw err;
	 } 
	 else
		 {
		 if(response.code=="200")
			 {
			 req.session.username = response.username;
			 req.session.check = response.password;
			 req.session.prof = response.prof;
			 console.log(response.prof);
			 res.send({"signup":"Success"});
			 }
		 else
			 {
			  res.send({"signup":"Fail"});
			 }
		 }
 });

}




exports.signin = signin;
exports.signup = signup;