import jsonServer from 'json-server'; // Continua válido para ES Modules

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Certifique-se de que o arquivo db.json existe
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server está rodando em http://localhost:${PORT}`);
});
