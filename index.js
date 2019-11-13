var express = require('express');
var request = require('request');
var {exec} = require('child_process');

var app = express();

var last_scene = null;

function needle_request() {
	if (!last_scene) return;

	exec("ssh -l pi -p 2222 localhost curl 'http://192.168.8.11/trigger/" + last_scene + "?conditions=0'" , (error, stdout, stderr) => {
		if (error) {
			    console.error(`exec error: ${error}`);
			    return;
			  }
		  console.log(`stdout: ${stdout}`);
		  console.error(`stderr: ${stderr}`);
	});
	last_scene = null;
}

app.get('/:scene', function(req, res) {
	last_scene = req.params.scene;
	res.send(req.params.scene);
});

setInterval(needle_request, 4000);

app.listen(3000, function() {});
