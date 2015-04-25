var amqp = require('amqp')
, util = require('util');

var checkpoint = require('./services/checkpoint');

var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on login_queue");

	cnn.queue('check_point_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

			if(message.method == "addCheckPoint")
			{
				checkpoint.addCheckPoint(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method == "updateCheckPoint")
			{
				checkpoint.updateCheckPoint(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method == "removeCheckPoint")
			{
				checkpoint.removeCheckPoint(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method == "getCheckPointForBuilding")
			{
				checkpoint.getCheckPointForBuilding(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method == "getCheckPoint")
			{
				checkpoint.getCheckPoint(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
		});
	});
});