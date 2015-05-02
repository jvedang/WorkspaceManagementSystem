var mysql = require('./mysql');

function search_request(msg, callback){
	
	var res = {};
	console.log("In handle request herrrrreee:"+ msg.searchBuilding);
	var searchUser="select client_id_fk,address,location_latitude,location_longitude,service_fee,release_date from building where building_id ='"+msg.searchBuilding+"'";
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
				console.log("Can I get firstname"+results[0].client_id_fk);
				console.log("Can I get lastname"+results[0].address);
				res.client_id_fks=results[0].client_id_fk;
				res.guard_id=results[0].address;
				res.location_latitude=results[0].location_latitude;
				res.location_longitude=results[0].location_longitude;
				res.service_fee=results[0].service_fee;
				res.release_date=results[0].release_date;
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
	console.log("In handle request:");
	var addUser="insert into building (building_id,client_id_fk,address,location_latitude,location_longitude,service_fee, release_date) values('NULL"+"'"+","+"'"+msg.client_id+"'"+","+"'"+msg.address+"'"+","+"'"+msg.location_latitude+"'"+","+"'"+msg.location_longitude+"'"+","+"'"+msg.service_fee+"'"+","+"'"+msg.release_date+"'"+")";
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
	var searchUser="update building set client_id_fk ="+msg.client_id+",address = "+msg.address+", service_fee = "+msg.service_fee+", release_date ="+msg.release_date+" where building_id = "+msg.building_id;
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
	console.log("In handle request:"+ msg.searchname);
	var searchUser="delete from building where building_id ='"+msg.searchname+"'";
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
