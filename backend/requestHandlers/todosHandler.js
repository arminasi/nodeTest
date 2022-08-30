import { getTodosFromDb, deleteToDoById, postNewTodo, getTodoById, updateTodoById } from "../helpers.js"

export async function todosHandler(req, res) {
	const data = await getTodosFromDb();
	const path = req.url.split("/")
	if(req.url === "todos" || req.url === "/todos") {
		if(req.method === "GET") {
			res.end(JSON.stringify(data))
		} else if(req.method === "POST") {
			postNewTodo(req, res);
			res.end(JSON.stringify(data))
		}
	} else if(+path[path.length - 1]){
		if(req.method === "DELETE") {
				deleteToDoById(+path[path.length - 1])
		} else if(req.method === "GET") {
				getTodoById(req, res, +path[path.length - 1]);
		} else if(req.method === "PUT") {
			updateTodoById(req, res, +path[path.length - 1]);
			res.end(JSON.stringify(data));
		}
	} else {
		res.end("Nothing to do")
	}
}