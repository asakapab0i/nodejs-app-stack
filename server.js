var formidable = require('formidable');
var httpObj = require("http");
var urlObj = require("url");

function startHttpServer(routerUrl, handle){
	function onRequest(request, response){
		var postData = "";
		var pathname = urlObj.parse(request.url).pathname;
		console.log("Request for "+ pathname +" received");

		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Received POST data chunk '"+postDataChunk+"' .");

		});

		request.addListener("end", function(){
			routerUrl(handle,pathname,response, request);
		});
	}

	httpObj.createServer(onRequest).listen(8888);
}

exports.startHttpServer = startHttpServer;