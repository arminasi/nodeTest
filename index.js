 import { createServer } from "http";
import { todosHandler } from "./requestHandlers/todosHandler.js";

 
 createServer(async (req, res) => {
	 res.setHeader("Access-Control-Allow-Origin", "*")
	 res.writeHead(200, {"Content-type" : "application/json"})
	 if(req.url.startsWith("/todos")) {
		req.url = req.url.slice(7);
		todosHandler(req, res);
	} else {
		 res.end("End of work")
	 }
 }).listen(3000)
