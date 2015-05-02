var mysql = require('./mysql');

function search_request(msg, callback){
	
	var res = {};
	console.log("In handle request herrrrreee in client:"+ msg.searchBuilding);
	var searchUser="select client_number,user_id_fk,monthly_service_charge,Balance,service_start_date,service_end_date from client where client_id ='"+msg.searchid+"'";
	console.log("Query is:"+searchUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				console.log("fetchdata");
				//res.redirect('/home');
				console.log("Can I get firstname"+results[0].client_number);
				console.log("Can I get lastname"+results[0].Balance);
				res.client_number=results[0].client_number;
				res.user_id_fk=results[0].user_id_fk;
				res.monthly_service_charge=results[0].monthly_service_charge;
				res.Balance=results[0].Balance;
				res.service_start_date=results[0].service_start_date;
				res.service_end_date=results[0].service_end_date;
			}
			else {    
				console.log("Invalid search");
				res.firstname = "401";
				res.lastname = "Invalid search";
			}
		}  
		callback(null, res); 
	},searchUser);
}


function add_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.check_point_id);
	var addClient="insert into client (client_number,user_id_fk,monthly_service_charge,Balance,service_start_date,service_end_date) values('"+msg.client_id_no+"'"+","+"'"+msg.user_id_fk+"'"+","+"'"+msg.monthly_service_charge+"'"+", '0' ,"+"'"+msg.service_start_date+"'"+","+"'"+msg.service_end_date+"'"+")";
	console.log("Query is:"+addClient);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{		
			res.code = "200";
			res.value = "Succes Login";
		}  
		callback(null, res); 
	},addClient);
}


function edit_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.searchname);
	
	var searchUser="Update client set client_number = "+msg.client_id_no+",user_id_fk = "+msg.user_id_fk+", monthly_service_charge = "+msg.monthly_service_charge+",Balance = "+msg.Balance+",service_start_date = "+msg.service_start_date+",service_end_date = "+msg.service_end_date+"where client_id = "+msg.client_id;
	console.log("Query is:"+searchUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				console.log("fetchdata");
				//res.redirect('/home');
				res.firstname="200";
				res.lastname="Valid Search";
			}
			else {    
				console.log("Invalid search");
				res.firstname = "401";
				res.lastname = "Invalid search";
			}
		}  
		callback(null, res); 
	},searchUser);
}

function delete_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.searchid);
	var searchUser="delete from client where client_id ='"+msg.searchid+"'";
	console.log("Query is:"+searchUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				console.log("fetchdata");
				//res.redirect('/home');
			
			//	res.firstname=results[0].check_point_id;
				//res.lastname=results[0].guard_id;
			}
			else {    
				console.log("Invalid search");
				res.firstname = "401";
				res.lastname = "Invalid search";
			}
		}  
		callback(null, res); 
	},searchUser);
}


exports.add_request = add_request;
exports.search_request = search_request;
exports.edit_request = edit_request;
exports.delete_request = delete_request;
