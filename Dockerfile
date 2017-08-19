FROM node:8

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install

# Bundle app source
COPY . /src

ENV PORT=8081

EXPOSE  8081

CMD ["node", "/src/app/app.js"]