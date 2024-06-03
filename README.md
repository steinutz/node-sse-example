## Name
Server-Sent events sample app

## Description
Real time updates to clients for server events based on client ID. Adapted from tutorial at https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app

## Stack
- [ ] Node (using v16.20.2)
- [ ] Curl, Postman
- [ ] React
- [ ] npm (using 8.19.4)
- [ ] express (^4.17.1)

## Server
- cd sse-server
- npm init -y
- npm install express@4.17.1 body-parser@1.19.0 cors@2.8.5 --save
- run: node server.js

## Usage
- display events
	>curl -X GET http://localhost:3001/events
- status
	>curl -X GET http://localhost:3001/status
- add client stream
	>curl -H Accept:text/event-stream http://localhost:3001/sub/1
- post event to server
	- In Postman, POST http://localhost:3001/fact raw JSON
	- {"info": "Howdy 1 world.","source": "URL","id": "1"}
	- Post more
	- {"info": "Hello 2 world.","source": "URL","id": "2"}
	- The client stream updates for sub/1.
- curl may also work to post event
	- WINDOWS
	- Note double quotes \\\" escaping.
	- curl --header "Content-Type: application/json" --data "{\\\"info\\\": \\\"Shark teeth are constantly replaced.\\\", \\\"source\\\": \\\"https:\/\/en.wikipedia.org\/wiki\/Shark\\\", \\\"id\\\": \\\"1\\\"}" http://localhost:3001/fact
	- ET. AL.
	- curl --header "Content-Type: application/json" --data '{"info": "Shark teeth are constantly replaced.", "source": "https://en.wikipedia.org/wiki/Shark", "id": "1"}' http://localhost:3001/fact
- check status, clients are listed.
- display events
	

## Client
- cd sse-client
- npm start
- view app in browser.
- By default the simple app tracks sub/1.
- Change JS to test other clients.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
