const stocksUrl = 'ws://stocks.mnet.website/'

const urlConnectionMap = {};

export default function SocketService(id, url, callback) {
	let connection = urlConnectionMap[id];
	if(connection){
		return connection
	}

	connection = new WebSocket(url);
	connection.onmessage = (event) => {
		let result = JSON.parse(event.data);
		callback(result)
	};
	connection.onclose = ()=> {
		console.log('Connection to ', url, ' closed')
	};
	urlConnectionMap[id] = connection;

	return connection
}
