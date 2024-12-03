import jsonServer from 'json-server';
import loginMiddleware from './login.js'; // Importe o middleware criado
import { fileURLToPath } from 'url';
import path from 'path';

// Obter o caminho do arquivo db.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json')); // Caminho correto para o db.json
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(loginMiddleware); // Use o middleware para a rota de login
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server está rodando na porta 3000');
});
