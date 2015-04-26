
var ejs = require("ejs");

var mq_client = require('../rpc/client');

exports.showBuilding = function(req,res){
	console.log("In Search Function of Building");
	var searchBuilding=req.param("building_id");
	var msg_payload = { "searchBuilding":searchBuilding, "service": "searchBuild" };
	
	console.log("In POST Request = UserName:"+" "+searchBuilding);
	
	mq_client.make_request('building_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.firstname == 401){
				
				console.log("Invalid search");
				res.send({"login":"Fail"});
			}
			else {    
				console.log("Can I get firstname"+results.check_point_id);
				console.log("Can I get lastname"+results.guard_id);
				res.send({"firstname":results.check_point_id,"lastname":results.guard_id});
				console.log("valid search");
			}
		}  
	});
};

exports.addBuilding = function(req,res){
	console.log("In add Function");
	var building_id=req.param("building_id");
	var client_id=req.param("client_id");
	var address=req.param("address");
	var service_fee=req.param("service_fee");
	var release_date=req.param("release_date");
    var msg_payload = { "building_id": building_id, "client_id":client_id, "address":address, "service_fee":service_fee, "release_date":release_date, "service": "addBuilding" };
	
	console.log("In POST Request = building_id:"+ building_id+" "+client_id);
	
	mq_client.make_request('building_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				res.send({"login":"success"});
				
			}
			else {    
				console.log("Invalid search");
				res.send({"login":"Fail"});
			}
		}  
	});
	
};


exports.updateBuilding = function(req,res){
	console.log("In edit Function");
	var searchid=req.param("building_id");
	var client_id=req.param("client_id");
	var address=req.param("address");
	var service_fee=req.param("service_fee");
	var release_date=req.param("release_date");
	var msg_payload = { "searchname":searchid,"client_id":client_id, "address":address, "service_fee":service_fee, "release_date":release_date, "service": "edit" };
	
	console.log("In POST Request = UserName:"+" "+searchid);
	
	mq_client.make_request('building_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.firstname == 401){
				
				console.log("Invalid search");
				res.send({"login":"Fail"});
			}
			else {    
			
				res.send({"login":"success"});
				console.log("valid search");
			}
		}  
	});
};

exports.deleteBuilding = function(req,res){
	console.log("In delete Function");
	var searchid=req.param("building_queue");
	var msg_payload = { "searchname":searchid, "service": "delete" };
	
	console.log("In POST Request = UserName:"+" "+searchid);
	
	mq_client.make_request('building_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.firstname == 401){
				
				console.log("Invalid search");
				res.send({"login":"Fail"});
			}
			else {    
				console.log("Can I get firstname"+results.check_point_id);
				console.log("Can I get lastname"+results.guard_id);
				res.send({"firstname":results.check_point_id,"lastname":results.guard_id});
				console.log("valid search");
			}
		}  
	});
};
