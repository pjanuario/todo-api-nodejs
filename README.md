
[![Build Status](https://secure.travis-ci.org/armandorvila/todo-api-nodejs.png)](http://travis-ci.org/armandorvila/todo-api-nodejs) 

# Build sources
1. git clone https://github.com/armandorvila/todo-api-nodejs
2. cd todo-api-nodejs
3. npm install
4. npm test
5. npm start

# Run it with docker
1. docker pull armandorvila/todo-api
2. docker run -d -p<host_free_port>:8081 armandorvila/todo-api:latest

# AWS deployed endpoints
1. http://ec2-54-77-44-77.eu-west-1.compute.amazonaws.com/health
2. http://ec2-54-77-44-77.eu-west-1.compute.amazonaws.com/tasks
3. http://ec2-54-77-44-77.eu-west-1.compute.amazonaws.com/tasks/59993fd5f36d286f16670832

# TODO REST API

Create a REST API to manage user tasks list.

To implement the REST API just fork the repository and open a new pull request for each feature (just on you personal repo please).

# Notes and considerations
* The API needs to be built in Node.js
* Preferable using express framework and mongodb
* Give particular attention in building the API with good design and user experience and good test coverage

# Feature list

1. As a user I should list my todo items.
2. As a user I should be able to add a new item.
3. As a user I should be able to remove a new item.
4. As a user I should be able to modify a existent item.
5. As a user I should be able to set a priority on a item.
6. As a user I should be able to set a due date on a item.
7. As a user I should be able to sort my todo list by due date.
8. As a user I should be able to sort my todo list by priority.
9. As a user I should be able to set a item as completed.
10. As a user I should be able to assign a task to another user using github id.
11. As a user I should be able to list tasks assigned to a github user
