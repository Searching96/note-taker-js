import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import fakeData from './fakeData/index.js';

const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql
	type Folder {
		id: String,
		name: String,
		createdAt: String,
		author: Author,
	}

	type Author {
		id: String,
		name: String,
	}
	
  	type Query {
		folders: [Folder]
	}
`;

const resolvers = {
	Query: {
		folders: () => { return fakeData.folders; }
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
	],
	introspection: true,
	csrfPrevention: false
});

await server.start();

// Root route - redirect to GraphQL UI
app.get('/', (req, res) => {
	res.redirect('/graphql');
});

app.use(
	'/graphql',
	cors(),
	express.json(),
	expressMiddleware(server, {
		context: async ({ req, res }) => ({ req, res })
	})
);

await new Promise((resolve) => httpServer.listen({ port: 4001 }, resolve));
console.log('Server is running on http://localhost:4001');
