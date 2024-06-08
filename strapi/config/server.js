module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ['Fd04LfTPaocFuckfgrFeT9X7xNf5fEW/UDzvx8VVQ1M=', '98Nj01kIYoICBxE6mzA+H1hoWwLLPpJIMbnJ++aWGTw=']),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
