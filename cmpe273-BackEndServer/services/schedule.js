var mysql = require('./mysql');

function search_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.searchname);
	var searchUser="select check_point_id,guard_id,building_id,start_date,end_date from schedule where schedule_id ='"+msg.searchname+"'";
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
				console.log("Can I get firstname"+results[0].check_point_id);
				console.log("Can I get lastname"+results[0].guard_id);
				res.check_point_id=results[0].check_point_id;
				res.guard_id=results[0].guard_id;
				res.building_id=results[0].building_id;
				res.start_date=results[0].start_date;
				res.end_date=results[0].end_date;
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
	var addUser="insert into schedule (check_point_id,guard_id,building_id,start_date,end_date) values('"+msg.check_point_id+"'"+","+"'"+msg.guard_id+"'"+","+"'"+msg.building_id+"'"+","+"'"+msg.start_date+"'"+","+"'"+msg.end_date+"'"+")";
	console.log("Query is:"+addUser);
	
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
	},addUser);
}


function edit_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.searchname);
	var searchUser="update schedule set check_point_id = "+msg.check_point_id+",guard_id = "+msg.guard_id+" ,building_id = " +msg.building_id+ ", start_date = "+msg.start_date+",end_date = "+msg.end_date+"where schedule_id = "+msg.schedule_id;

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
				console.log("Can I get firstname"+results[0].check_point_id);
				console.log("Can I get lastname"+results[0].guard_id);
				res.code = "200";
				res.value = "Succes Login";
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
	console.log("In handle request:"+ msg.searchname);
	var searchUser="delete from schedule where schedule_id ='"+msg.searchname+"'";
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