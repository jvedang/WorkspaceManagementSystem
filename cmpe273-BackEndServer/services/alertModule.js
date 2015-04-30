
var mysqlQuery = require("./dbConnectivity/mysqlQuery");

function list_alert(msg, callback){
	var res = {};
	console.log("In handle request:"+ msg.username);
	var sqlstmt = "select * from alert";  

	mysqlQuery.execQuery(sqlstmt,function(err, rows, fields){
		if (err) {
			// throw err;
			console.log("Error in db");
		}else
		{
			if(rows.length > 0)
			{
				console.log("Rows exists");
				res.code="200";
				res.value=JSON.stringify(rows);
			}
			callback(null, res);        	
		}	

	});	
}
function create_alert(msg, callback){
	var res = {};
	var flag=0;
	var space="";
	console.log("Creating alert:"+ msg.alert);
	var sqlstmt="";
	var alert1 = msg.alert;
	var severity = msg.severity;
	var status = msg.status;
	var date = msg.date;
	var client_id_fk=msg.client_id_fk;
	var building_id_fk = msg.building_id_fk;
	var guard_id_fk = msg.guard_id_fk;

	// sql query
	sqlstmt = "insert into alert (alert,severity,status,date,client_id_fk,building_id_fk,guard_id_fk) values ('"+alert1+"','"+severity+"','"+status+"',NOW(),'"+client_id_fk+"','"+building_id_fk+"','"+guard_id_fk+"')";
	mysqlQuery.execQuery(sqlstmt,function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log("Success in insertion");		
		}
	});
};

exports.handle_request = handle_request;
