import { getTodosFromDb, addTodoToDb, incrementId } from "../helpers.js"
import fs from "fs";
const id = incrementId();

export async function todosHandler(req, res) {
	if(req.url === "" || req.url === "/") {
		if(req.method === "GET") {
			const data = await getTodosFromDb();
			res.end(JSON.stringify(data))
		} else if(req.method === "POST") {
			fs.readFile("db.json", "utf-8", (err, re) => {
				if(err) {
					throw err;
				} else {
					res.end(re)
				}
			});
			let data = ""
			req.on('data', (chunk) => {
				data += chunk;
			})
			req.on('end', () => {
				const parsed = JSON.parse(data)
				addTodoToDb(parsed).then(data => res.end(data))
			})
		}
	}
}