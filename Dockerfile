FROM node:8

# Install app dependencies
COPY package.json /package.json
RUN  npm install

# Bundle app source
COPY . /

ENV NODE_ENV=production

EXPOSE 8081

CMD ["node", /app/app.js"]