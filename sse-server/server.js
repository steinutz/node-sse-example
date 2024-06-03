const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

function statusHandler(request, response) {
	const ret = clients.map(o => o.id);
	return response.json({clients: clients.length, list: ret});
}

app.get('/status', statusHandler);

const PORT = 3001;

let clients = [];
let facts = [];

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
  console.log()
})

function eventsHandler(request, response) {
  const data = `data: ${JSON.stringify(facts)}\n\n`;
  response.json(data);
}

app.get('/events', eventsHandler);

function subsHandler(request, response, next) {
	const headers = {
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive',
		'Cache-Control': 'no-cache'
	};
	response.writeHead(200, headers);

	const clientId = request.params.id;
	myfacts = facts.filter(fact => fact.id === clientId)
	const data = `data: ${JSON.stringify(myfacts)}\n\n`;
	response.write(data);

	const client = clients.find((i) => i.id === clientId);
	if (client) {
		console.log(`Now serving client ${clientId}`)
	} else {
		console.log(`New client ${clientId}`)
		const newClient = {
			id: clientId,
			response
		};
		clients.push(newClient);
		request.on('close', () => {
			console.log(`${clientId} Connection closed`);
			clients = clients.filter(client => client.id !== clientId);
		});				
	}
}

app.get('/sub/:id', subsHandler);


function sendEventsToAll(newFact) {
  clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
}

function sendEvent(newFact, clientId) {
	const client = clients.find((i) => i.id === clientId);
	console.log(`In sendEvent`);	
	if (client) {
		console.log(`I sent ${clientId} event.`);
		client.response.write(`data: ${JSON.stringify(newFact)}\n\n`);
	}
}

async function addFact(request, response, next) {
	const newFact = request.body;
	const clientId = request.body.id;
	console.log(`In addFact`);
	console.log(`Event for client ${clientId}`)
	facts.push(newFact);
	response.json(newFact)
	//sendEventsToAll(newFact)	
	return sendEvent(newFact, clientId);
}

app.post('/fact', addFact);