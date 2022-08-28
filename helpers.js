import fs from "fs";

async function readFrom(file) {
	const data = await fs.promises.readFile(file, "utf-8");
	const res = JSON.parse(data);
	return res.todos
}

export async function getTodosFromDb() {
	const data = await readFrom("db.json");
	return data;
}

export function incrementId() {
	let id = 0;
	return function() {
		return id++;
	}
}

const incId = incrementId()

export async function addTodoToDb(text) {
	const data = await getTodosFromDb();
	const newData = [...data, text];
	
	return fs.promises.writeFile("db.json", JSON.stringify({todos: newData}, "sad"))
}

export function getTodo(id) {
	
}
