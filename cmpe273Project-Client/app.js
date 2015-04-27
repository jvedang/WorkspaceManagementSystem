
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , checkpoint = require('./routes/checkpoint')
  , http = require('http')
  , path = require('path');

var app = express();
var homepage = require('./routes/homepage');
var building = require('./routes/building');
var UserSignIn = require('./routes/UserSignIn');
var client = require('./routes/client');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/checkpoint', checkpoint.addCheckPoint);
app.put('/checkpoint/:check_point_id', checkpoint.updateCheckPoint);
app.del('/checkpoint/:check_point_id', checkpoint.removeCheckPoint);
app.get('/checkpoint/building/:building_id', checkpoint.getCheckPointForBuilding);
app.get('/checkpoint/:check_point_id', checkpoint.getCheckPoint);


app.get('/homepage/getSchedule', homepage.getSchedule);
app.post('/homepage/addSchedule', homepage.addSchedule);
app.put('/homepage/updateSchedule', homepage.updateSchedule);
app.get('/homepage/deleteSchedule', homepage.deleteSchedule);
app.get('/building/showBuilding', building.showBuilding);
app.post('/building/addBuilding', building.addBuilding);
app.put('/building/updateBuilding', building.updateBuilding);
app.get('/building/deleteBuilding', building.deleteBuilding);
app.post('/UserSignIn/signin', UserSignIn.signin);
app.post('/UserSignIn/signup', UserSignIn.signup);
app.post('/client/addclient', client.addclient);
app.get('/client/getclient', client.getclient);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
