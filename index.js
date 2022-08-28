 import { createServer } from "http";
 import { getTodosFromDb } from "./helpers.js";
import { todosHandler } from "./requestHandlers/todosHandler.js";

 
 createServer(async (req, res) => {
	 res.setHeader("Access-Control-Allow-Origin", "*")
	 res.writeHead(200, {"Content-type" : "application/json"})
	 if(req.url.startsWith("/todos")) {
		let strLen = req.url.length;
		req.url = req.url.slice(strLen);
		todosHandler(req, res);
	} else {
		 res.end("End of work")
	 }
 }).listen(3000)
