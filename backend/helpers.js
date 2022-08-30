import fs from "fs/promises";

async function readFrom(file) {
	const data = await fs.readFile(file, "utf-8");
	const res = JSON.parse(data);
	return res
}

export async function getTodosFromDb() {
	const data = await readFrom("backend/db.json");
	return data;
}

export async function addTodoToDb(text) {
	const data = await getTodosFromDb();
	let currentId = data.nextTodoId;
	const modified = {...text, "id": currentId};
	data.todos.push(modified);
	try {
		fs.writeFile("backend/db.json", JSON.stringify({...data, "nextTodoId": currentId += 1}, undefined, 2))
	} catch(err) { res.status(500).json({message: err.message}) }
}

export async function deleteToDoById(id) {
	const data = await getTodosFromDb();
	const newData = data.todos.filter(item => {
		return item.id !== id;
	})
	try {
		fs.writeFile("backend/db.json", JSON.stringify({"todos" : newData, "nextTodoId": data.nextTodoId}, undefined, 2))
	} catch(err) {res.status(500).json({message: err.message})}
}

export async function updateTodoById(req, res, id) {
	let data = "";
	req.on("data", (chunk) => {
		data += chunk;
	})
	req.on("end", () => {
	})

	const todos = await readFrom("backend/db.json");
	const dValue = JSON.parse(data);
	const mapped = todos.todos.map(item => {
		if(item.id === id) {
			item.isCompleted = dValue.isCompleted;
			return item
		} else {
			return item
		}
	})
	fs.writeFile("backend/db.json", JSON.stringify({"todos" : mapped, "nextTodoId": data.nextTodoId}, undefined, 2))
}

function postHandler(res, req, data) {
	return new Promise((resolve) => {
		req.on('data', (chunk) => {
			data += chunk;
		})
		req.on('end', () => {
			addTodoToDb(JSON.parse(data)).then(data => res.end(resolve(data)))
		})
	})
}

export function postNewTodo(req, res) {
			let data = ""
			try {
				postHandler(res, req, data);
			} catch(err) {
				res.status(400).json({message: err.message});
			}
}

export async function getTodoById(req, res, id) {
	const data = await getTodosFromDb();
	const current = data.todos.find(item => {
		return item.id === id;
	})
	const forSend = JSON.stringify(current);
	res.end(forSend)
}