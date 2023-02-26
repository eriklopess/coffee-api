import server from "./server";
import 'dotenv/config';

const port = process.env.PORT || 3001;

server.startServer(port);
