FROM node:8

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install

# Bundle app source
COPY . /src

ENV PORT=8081
ENV MONGO_URL=mongodb://todo-api:todo-api@ds145193.mlab.com:45193/todo-api
ENV JWT_SECRET=supersecret
ENV JWT_EXPIRATION=100h
ENV LOGGING_FILE=/var/log/todo-api.log
ENV LOGGING_LEVEL=debug

EXPOSE  8081

VOLUME ["/var/log"], 

CMD ["node", "/src/app/app.js"]