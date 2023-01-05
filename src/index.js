// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// http://expressjs.com/en/starter/static-files.html
app.use('/public', express.static(process.cwd()+'/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/whoami', function (req, res) {
  let ipActual = (req.socket.remoteAddress).replace(/\:{2}(ffff\:)?/, "");
  let ipProxy = req.get('x-forwarded-for');
  let ipaddress = ipProxy ? ipProxy : (ipActual == 1) ? '127.0.0.1' : ipActual;
   
  res.render('result', {ipaddress: `${ipaddress}`, language:`${req.get('accept-language')}`, software:`${req.get('User-Agent')}`});
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
