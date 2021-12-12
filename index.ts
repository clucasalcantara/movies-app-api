import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { Schema } from './src/graphql';
import { resolvers } from './src/graphql/resolvers';

const app = express();
const { PORT = 3001 } = process.env;

app.use(
  '/graphql',
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
    rootValue: resolvers,
  }),
);

app.listen(PORT, () => {
  console.log(`MovieDB API running on port ${PORT}.`);
});