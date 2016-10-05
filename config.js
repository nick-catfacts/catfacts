var path = require('path');

//base config object to append to
var config = {};


config.site = {
  title: "Cat Facts",
  description: "A Web 2.0 enabled resource for the most premium cat facts",
  author: {
    name: "Nick",
    contact: "NickKiermaier@gmail.com"
  }
}

config.stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
config.stripeSecretKey = process.env.STRIPE_SECRET_KEY;
config.schemaIoKey = process.env.SCHEMA_IO_KEY;
config.costPerMessage = parseInt(process.env.COST_PER_MESSAGE);
config.rootDir = path.resolve(__dirname);


module.exports = config;