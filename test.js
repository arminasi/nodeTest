async function getData() {
	const response = await fetch("http://127.0.0.1:3000/todos");
	const data = response.json()
	return data;
}



getData().then(res => console.log(res))
