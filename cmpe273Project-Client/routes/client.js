var ejs = require("ejs");

var mq_client = require('../rpc/client');

exports.getClient = function(req,res){
	console.log("In Search Function");
	var searchid=req.param("client_id");
	var msg_payload = { "searchid":searchid, "service": "search" };
	
	console.log("In POST Request = UserName:"+" "+searchid);
	
	mq_client.make_request('client_queue',msg_payload, function(err,results){
		
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
				res.send({"client_number":results.client_number,"monthly_service_charge":results.monthly_service_charge,"Balance":results.Balance,"service_start_date":results.service_start_date,"service_end_date":results.service_end_date});
				console.log("valid search");
			}
		}  
	});
};

exports.addClient = function(req,res){
	console.log("In add Function");
	var client_id_no=req.param("client_id_no");
	var monthly_Service_charge=req.param("monthly_Service_charge");
	var service_start_date=req.param("service_start_date");
	var service_end_date=req.param("service_end_date");
	
    var msg_payload = { "client_id_no": client_id_no, "monthly_Service_charge":monthly_Service_charge, "service_start_date":service_start_date, "service_end_date":service_end_date, "service": "add" };
	
	console.log("In POST Request = client_id_no:"+ client_id_no+" ");
	
	mq_client.make_request('client_queue',msg_payload, function(err,results){
		
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


exports.updateClient = function(req,res){
	console.log("In edit Function");
	var searchid=req.param("client_id");
	var client_id_no=req.param("client_id_no");
	var monthly_Service_charge=req.param("monthly_Service_charge");
	var service_start_date=req.param("service_start_date");
	var service_end_date=req.param("service_end_date");
	var msg_payload = { "searchid":searchid, "client_id_no": client_id_no, "monthly_Service_charge":monthly_Service_charge, "service_start_date":service_start_date, "service_end_date":service_end_date, "service": "edit" };
	
	console.log("In POST Request = UserName:"+" "+searchid);
	
	mq_client.make_request('client_queue',msg_payload, function(err,results){
		
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
			else {    res.send({"login":"success"});
				console.log("valid search");
			}
		}  
	});
};

exports.deleteClient = function(req,res){
	console.log("In delete Function");
	var searchid=req.param("client_id");
	var msg_payload = { "searchid":searchid, "service": "delete" };
	
	console.log("In POST Request = UserName:"+" "+searchid);
	
	mq_client.make_request('client_queue',msg_payload, function(err,results){
		
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
			else {    res.send({"login":"success"});
				console.log("valid search");
			}
		}  
	});
};
