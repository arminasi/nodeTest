import { getTodosFromDb, deleteToDoById, postNewTodo, getUserById } from "../helpers.js"

export async function todosHandler(req, res) {
	if(req.url === "" || req.url === "/") {
		if(req.method === "GET") {
			const data = await getTodosFromDb();
			res.end(JSON.stringify(data))
		} else if(req.method === "POST") {
			postNewTodo(req, res);
		}
 	} else if(+req.url){
		 if(req.method === "DELETE") {
			 try {
				 deleteToDoById(+req.url)
				} catch(err) {
					throw err;
				}
		} else if(req.method === "GET") {
			try {
				getUserById(req, res, +req.url);
			} catch(err) {
				throw err;
			}
		}
	} else {
		res.end("Nothing to do")
	}
}