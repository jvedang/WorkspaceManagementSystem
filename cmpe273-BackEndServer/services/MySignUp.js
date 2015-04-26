var con = require('./mysql');
var crypto = require('crypto');

function signUp_request(msg,callback)
{
	console.log("first step");
	console.log("In handle request herrrrreee:"+ msg.username);
	var res = {};
var q1 = "select user_id from user where username='"+msg.username+"'";
console.log("Query is:"+q1);
con.querycon(function(err,result){
	if(err)
		{
		console.log(err);
		}
	else
		{
		if(result.length>0)
			{
			 res.send({"signup":"Exists"});
			}
		else
			{
			 var qmx = "select max(user_id) from user";
			 
			 con.querycon(function(err,result1){
				 if(err)
					 {
					 console.log(err);
					 }
				 else
					 {
					  if(result1.length>0)
						  {
						   var uid = result1[0].user_id +1;
						   var salt =  crypto.randomBytes(64).toString('base64');
						   var pass = crypto.pbkdf2Sync(msg.password, salt, 10000, 128,'sha256').toString('base64');
						   var qins = "insert into user(user_id, username, password, role, salt) values ("+uid+", '"+msg.username+"', '"+pass+"', '"+msg.role+"')";
						   con.postData(function(err,result2){
							   if(err)
								   {
								   console.log(err);
								   }
							   else
								   {
								   res.username = msg.username;
								   res.password = pass;
								   res.id = uid;
								   res.signup="Success";
								    res.signup="Success";
								    callback(null,res);
								   }
							   
						   },qins);
						  }
					  else
						  {
						  console.log("uid:1");
						  var userid =1 ;
						  var saltPass =  crypto.randomBytes(64).toString('base64');
						   var password = crypto.pbkdf2Sync(msg.password, saltPass, 10000, 128,'sha256').toString('base64');
						   var signupquery = "insert into user(user_id, username, password, role) values ("+userid+", '"+msg.username+"', '"+password+"', '"+msg.role+"')";
						   console.log("Query is:"+signupquery);
						   con.postData(function(err,result2){
							   if(err)
								   {
								   console.log(err);
								   }
							   else
								   {
								   console.log("success insert");
								   res.username = msg.username;
								   res.password = pass;
								   res.id = uid;
								   res.signup="Success";
								   callback(null,res);
								   }
							   
						   },signupquery);
						  }
					 }
				 
			 },qmx);
			}
		}
	
	
	
},q1);

}


exports.signUp_request = signUp_request ;