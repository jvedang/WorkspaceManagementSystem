var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.addCheckPoint = function(req, res)
{
	var TABLE_NAME = 'check_point';
	var buildingId = req.param("building_id");
	var guardId = req.param("guard_id");
	var clientId = req.param("client_id");
	var startLatitude = req.param("start_latitude");
	var endLatitude = req.param("end_latitude");
	var startLongitude = req.param("start_longitude");
	var endLongitude = req.param("end_longitude");
	var timeFromStartToEnd = req.param("time_from_start_to_end"); // this time is in minutes

//	if(req.session.userId)
//	{
		var msg_payload = { "buildingId": buildingId,"guardId":guardId,"clientId":clientId,"startLatitude":startLatitude,
				"endLatitude":endLatitude,"startLongitude":startLongitude,"endLongitude":endLongitude,"timeFromStartToEnd":timeFromStartToEnd,"method":"addCheckPoint" };
		console.log(msg_payload+" msg_payload");
		mq_client.make_request('check_point_queue',msg_payload, function(err,results){

			console.log(results);
			if(err){
				throw err;
			}
			else 
			{
				if(results.statusCode == 200){	
					console.log(results+" results in addCheckPoint");
					res.send(JSON.stringify(results));
				}
				else {    

					console.log("Invalid Login");
					res.send(JSON.stringify(results));
				}
			}  
		});
	//}
};

exports.updateCheckPoint = function(req, res)
{
	var TABLE_NAME = 'check_point';
	var check_point_id = req.param("check_point_id");
	var buildingId = req.param("building_id");
	var guardId = req.param("guard_id");
	var clientId = req.param("client_id");
	var startLatitude = req.param("start_latitude");
	var endLatitude = req.param("end_latitude");
	var startLongitude = req.param("start_longitude");
	var endLongitude = req.param("end_longitude");
	var timeFromStartToEnd = req.param("time_from_start_to_end"); // this time is in minutes
	
	var msg_payload = {"check_point_id":check_point_id, "buildingId": buildingId,"guardId":guardId,"clientId":clientId,"startLatitude":startLatitude,
			"endLatitude":endLatitude,"startLongitude":startLongitude,"endLongitude":endLongitude,"timeFromStartToEnd":timeFromStartToEnd,"method":"updateCheckPoint" };
	console.log(msg_payload+" msg_payload");
	mq_client.make_request('check_point_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.statusCode == 200){	
				console.log(results+" results in addCheckPoint");
				res.send(JSON.stringify(results));
			}
			else {    

				console.log("Invalid Login");
				res.send(JSON.stringify(results));
			}
		}  
	});
};

exports.removeCheckPoint = function(req, res)
{
	var TABLE_NAME = 'check_point';
	var check_point_id = req.param("check_point_id");
	var msg_payload = {"check_point_id":check_point_id,"method":"removeCheckPoint" };
	console.log(msg_payload+" msg_payload");
	mq_client.make_request('check_point_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.statusCode == 200){	
				console.log(results+" results in addCheckPoint");
				res.send(JSON.stringify(results));
			}
			else {    

				console.log("Invalid Login");
				res.send(JSON.stringify(results));
			}
		}  
	});

};

exports.getCheckPointForBuilding = function(req, res)
{
	var TABLE_NAME = 'check_point';
	var building_id = req.param("building_id");
	var msg_payload = {"building_id":building_id,"method":"getCheckPointForBuilding" };
	console.log(msg_payload+" msg_payload");
	mq_client.make_request('check_point_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.statusCode == 200){	
				console.log(results+" results in getCheckPointForBuilding");
				res.send(JSON.stringify(results));
			}
			else {    

				console.log("Invalid Login");
				res.send(JSON.stringify(results));
			}
		}  
	});
};


exports.getCheckPoint = function(req, res)
{
	var TABLE_NAME = 'check_point';
	var check_point_id = req.param("check_point_id");
	var msg_payload = {"check_point_id":check_point_id,"method":"getCheckPoint" };
	console.log(msg_payload+" msg_payload");
	mq_client.make_request('check_point_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.statusCode == 200){	
				console.log(results+" results in getCheckPoint");
				res.send(JSON.stringify(results));
			}
			else {    

				console.log("Invalid Login");
				res.send(JSON.stringify(results));
			}
		}  
	});
};