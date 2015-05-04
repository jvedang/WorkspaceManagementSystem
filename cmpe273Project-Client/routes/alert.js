var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.signup= function (request,response)
{
	var msg_payload = {};
	mq_client.make_request('list_alert_q',msg_payload, function(err,results){
		if (err) {
			console.log("ERROR: " + err.message);

		} else {
			console.log("Success find");
			if(results.code == 200)
			{
				console.log("success in getting alert");
				//response.redirect('/createProfile');
			}
			else
			{
				console.log("failure in getting alert");
				//response.render('index', { title: 'LinkedInPrototype' });
			}
		}

	});
};

exports.list_alert= function (request,response)
{
	var msg_payload = {"service":"list_alert"};
	mq_client.make_request('list_alert_q',msg_payload, function(err,results){
		if (err) {
			console.log("ERROR: " + err.message);

		} else {
			console.log("Success find");
			if(results.code == 200)
			{
				var result = results.value;		// you may need to parse the value
				console.log("success in getting alert");
				response.render();				// render something
			}
			else
			{
				console.log("failure in getting alert");
			}
		}

	});
};

exports.create_alert = function(request, response) {
	var alert1 = request.param("alert");
	var severity = request.param("severity");
	var status = request.param("status");
	var client_id_fk= request.param("client_id_fk");
	var building_id_fk = request.param("building_id_fk");
	var guard_id_fk = request.session.guard_id_fk;	
	//create session variable
	//request.session.userName=first_name;
	//request.session.email =  email_id;
	//var uid = request.session.email;

	var msg_payload = { 
			"alert": alert1, 
			"severity": severity,
			"status":status,
			"client_id_fk":client_id_fk,
			"building_id_fk": building_id_fk,
			"guard_id_fk": guard_id_fk
	};

	//rpc call
	mq_client.make_request('create_alert_q',msg_payload, function(err,results){
		if (err) {
			console.log("ERROR: " + err.message);

		} else {
			console.log("Success find");
			if(results.code == 200)
			{
				console.log("success in creating alert");
				//response.redirect('/createProfile');
			}
			else
			{
				console.log("failure in creating alert");
				//response.render('index', { title: 'LinkedInPrototype' });
			}
		}

	});
};
