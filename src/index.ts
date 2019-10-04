import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { buildSchema } from 'type-graphql';
import depthLimit from 'graphql-depth-limit';

import ListResolver from './resolvers/list.resolver';
import MovieResolver from './resolvers/movie.resolver';
import PersonResolver from './resolvers/person.resolver';
import {DataSources} from "./datasources/datasources";

const app = express();

async function init() {

  // Parse the GraphQL schema
  const schema = await buildSchema({
    resolvers: [
      MovieResolver,
      PersonResolver,
      ListResolver
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
        accountId: '8608087', // account in themoviedb
        token: '1b9096a58ddab245a4018afc0a66ef89', // api-key
        sessionId: '01b62b5d80fdee681668b6fdd86599576a780e93' // session for app poc-grapql

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