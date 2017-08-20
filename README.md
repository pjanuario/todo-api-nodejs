
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

# Security

Both users and tasks endpoints are secured, so you need to set the x-access-token header with a valid token on every request.
In order to get token, you have to do a POST request to the /auth endpoint, providing your email and your password as a JSON object.

1. Auth 

curl --request POST \
  --url 'http://ec2-54-77-44-77.eu-west-1.compute.amazonaws.com
/auth' \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '    {
        "email": "test6.user6@gmail.com",
        "password" : "secret"
    }'
    
2. Using the token

curl --request GET \
  --url 'http://ec2-54-77-44-77.eu-west-1.compute.amazonaws.com
/tasks' \
  --header 'accept: application/json' \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNTk5OTU3NWExZTY2NDAzM2Q4YzQzMjBlIiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwibGFzdE5hbWUiOiJpbml0IiwiZmlyc3ROYW1lIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsImFkbWluIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImFkbWluIjp0cnVlLCJlbWFpbCI6dHJ1ZSwibGFzdE5hbWUiOnRydWUsImZpcnN0TmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiYWRtaW4iOmZhbHNlLCJfX3YiOjAsImVtYWlsIjoidGVzdDYudXNlcjZAZ21haWwuY29tIiwibGFzdE5hbWUiOiJVc2VyNiIsImZpcnN0TmFtZSI6IlRlc3Q2IiwicGFzc3dvcmQiOiJzaGExJGMzYzFjNTRmJDEkMDBkMWEwNGExNzRhNTlmMDFkNjBjZTNlODJhMmE4MTVkY2U1Mjg2OSIsIl9pZCI6IjU5OTk1NzVhMWU2NjQwMzNkOGM0MzIwZSJ9LCIkaW5pdCI6dHJ1ZSwiaWF0IjoxNTAzMjI1Nzg4LCJleHAiOjE1MDM1ODU3ODh9.ABI4pWVJZXEYL7VtK5i0Bz8nUoUJlbYv93765j_OJXQ'

# Docs
1. Postman: https://documenter.getpostman.com/view/2598716/kpn-todo-api/6n8wrPP
2. Swagger spec: http://ec2-54-77-44-77.eu-west-1.compute.amazonaws.com/docs


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
