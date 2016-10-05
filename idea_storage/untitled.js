config.stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
config.stripeSecretKey = process.env.STRIPE_SECRET_KEY;
config.schemaIoKey = process.env.SCHEMA_IO_KEY;
config.costPerMessage = parseInt(process.env.COST_PER_MESSAGE);
config.rootDir = path.resolve(__dirname);
