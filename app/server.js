const config = require('./config/config');
const logger = require("./config/logger");

const mongoose = require('mongoose');

class Server {

  constructor(app) {
    this.app = app;
  }

  start() {
    mongoose.connect(config.mongo.url, { useMongoClient: true }).then(() => {

      logger.info(`Connected to mongo database at: ${config.mongo.url}`);

       this.app.listen(config.server.port, () => {
        logger.info(`Serice listening at port: ${config.server.port}`);
      });
    });
  }
}

module.exports = (app) => {
  return new Server(app);
};


