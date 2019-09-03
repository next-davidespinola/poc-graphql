import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { buildSchema } from 'type-graphql';
import depthLimit from 'graphql-depth-limit';

import MovieResolver from './resolvers/movie.resolver';
import PersonResolver from './resolvers/person.resolver';
import {DataSources} from "./datasources/datasources";

const app = express();

async function init() {

  // Parse the GraphQL schema
  const schema = await buildSchema({
    resolvers: [
      MovieResolver,
      PersonResolver
    ],
    emitSchemaFile: true,
  });

  // Initialize the Apollo server
  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    dataSources: () => DataSources.sources(),
    context: () => {
      return {
        token: '1b9096a58ddab245a4018afc0a66ef89',
      };
    }
  });
  server.applyMiddleware({ app, path: '/graphql' });

  const httpServer = createServer(app);
  httpServer.listen(
    { port: 3000 },
    (): void => console.log('GraphQL is now running on http://localhost:3000/graphql')
  );
}

init();