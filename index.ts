import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { Schema } from './src/graphql';
import { resolvers } from './src/graphql/resolvers';

const app = express();
const port = 3000;

app.use(
  '/graphql',
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
    rootValue: resolvers,
  }),
);

app.listen(port, () => {
  console.log(`MovieDB API running on port ${port}.`);
});