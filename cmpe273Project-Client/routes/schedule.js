
var ejs = require("ejs");

var mq_client = require('../rpc/client');

exports.getSchedule = function(req,res){
	console.log("In Search Function");
	var searchid=req.param("schedule_id");
	var msg_payload = { "searchname":searchid, "service": "search" };
	
	console.log("In POST Request = UserName:"+" "+searchid);
	
	mq_client.make_request('schedule_queue',msg_payload, function(err,results){
		
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
				res.send({"check_point_id":results.check_point_id,"guard_id":results.guard_id, "building_id":results.building_id, "start_date":results.start_date, "end_date":results.end_date});
				console.log("valid search");
			}
		}  
	});
};

exports.addSchedule = function(req,res){
	console.log("In add Function");
	var check_point_id=req.param("check_point_id");
	var guard_id=req.param("guard_id");
	var start_date=req.param("start_date");
	var end_date=req.param("end_date");
	var building_id=req.param("building_id");
    var msg_payload = { "check_point_id": check_point_id, "guard_id":guard_id, "building_id":building_id, "start_date":start_date, "end_date":end_date, "service": "add" };
	
	console.log("In POST Request = check_point_id:"+ check_point_id+" "+guard_id);
	
	mq_client.make_request('schedule_queue',msg_payload, function(err,results){
		
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


exports.updateSchedule = function(req,res){
	console.log("In edit Function");
	var check_point_id=req.param("check_point_id");
	var guard_id=req.param("guard_id");
	var start_date=req.param("start_date");
	var end_date=req.param("end_date");
	var building_id=req.param("building_id");
	//var searchid=req.param("schedule_id");
	var msg_payload = {"check_point_id": check_point_id, "guard_id":guard_id, "building_id":building_id, "start_date":start_date, "end_date":end_date, "service": "edit" };
	
	console.log("In POST Request = UserName:"+" "+check_point_id);
	
	mq_client.make_request('schedule_queue',msg_payload, function(err,results){
		
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

exports.deleteSchedule = function(req,res){
	console.log("In delete Function");
	var searchid=req.param("schedule_id");
	var msg_payload = { "searchname":searchid, "service": "delete" };
	
	console.log("In POST Request = UserName:"+" "+searchid);
	
	mq_client.make_request('schedule_queue',msg_payload, function(err,results){
		
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
