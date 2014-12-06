var formidable = require('formidable');
var httpObj = require("http");
var urlObj = require("url");

function startHttpServer(routerUrl, handle){
	function onRequest(request, response){
		var postData = "";
		var pathname = urlObj.parse(request.url).pathname;
		console.log("Request for "+ pathname +" received");

		routerUrl(handle,pathname,response, request);
	}

	httpObj.createServer(onRequest).listen(8888);
}

exports.startHttpServer = startHttpServer;