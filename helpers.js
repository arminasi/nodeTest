import fs from "fs/promises";


const idFn = incrementId();

async function readFrom(file) {
	const data = await fs.readFile(file, "utf-8");
	const res = JSON.parse(data);
	return res
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

export async function addTodoToDb(text) {
	const data = await getTodosFromDb();
	const newData = {"todos": [...data.todos, text]};
	newData.todos.forEach(item => {
		item.id = idFn();
	})
	try {
		fs.writeFile("db.json", JSON.stringify(newData))
	} catch(err) {
		throw err
	}
}

export async function deleteToDoById(id) {
	const data = await getTodosFromDb();
	const newData = data.todos.filter(item => {
		return item.id !== id;
	})
	try {
		fs.writeFile("db.json", JSON.stringify({"todos": newData}))
	} catch(err) {
		throw err
	}
}

export function postNewTodo(req, res) {
	let data = ""
			try {
				fs.readFile("db.json", "utf-8");
			} catch(err) {
				throw err;
			}
			req.on('data', (chunk) => {
				data += chunk;
			})
			req.on('end', () => {
				const parsed = JSON.parse(data)
				addTodoToDb(parsed).then(data => res.end(data))
			})
}

export function updateIsCompletedState() {

}