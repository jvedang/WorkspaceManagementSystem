var con = require("./mysql.js");
var crypto = require("crypto");
function signIn_request(msg,callback)
{
	var res = {};
	console.log("In handle request heryyyyy:"+ msg.username);
  var qsi = "select * from user where username = '"+msg.username+"'";
  console.log("Query is:"+qsi);
  con.querycon(function(err,result){
	  if(err)
		  {
		  
		  console.log(err);
		  
		  }
	  else
		  {
		  if(result.length>0)
			  {
			   var salt = result[0].salt;
			   var inpass = msg.password;
			   
			   var password = crypto.pbkdf2Sync(inpass, salt, 10000, 128,'sha256').toString('base64');
			   
			   var qsi1 = "select * from user where username='"+msg.username+"' and password='"+password+"'";
			   
			   con.querycon(function(err,result1){
				   if(err)
					   {
					   console.log(err);
					   }
				   else
					   {
					     if(result1.length>0)
					    	 {
					    	 var d = new Date();
     						 var date = d.getDate();
     						 var month = d.getMonth() + 1;
     						 var year = d.getFullYear();
     						 var fd = month + "/" + date + "/" + year ;
     						 var qlog = "update user set last_logged_in='"+fd+"' where username ='"+msg.username+"'";
     						 myconnect.postData(function(err,result2){
     							 if(err){
     								 console.log(err);
     							 }
     							 else
     								 {
     								 res.signin='Success';
     						    	 
     						    	 callback(null,result1);
     								 }
     							 
     						 },qlog);
     						 
					    	 
					    	 
					    	
					    	 }
					     else
					    	 {
					    	 console.log("password no match");
					    	 }
					   
					   }
				   
			   },qsi1);
			  }
		  else
			  {
			   console.log("username no match");
			  }
		  
		  
		  }
	  
	  
  },qsi);

}

exports.signIn_request = signIn_request ;