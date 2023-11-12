import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './routes/router';

const server = Server.instance;

// Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

// CORS
server.app.use( cors({ origin: true, credentials: true }));

// Routes
server.app.use('/', router );

server.start(() => {
    console.log(`Server running on port ${server.port}`);
});