import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Middleware para adicionar cabeçalhos de CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

server.use(jsonServer.bodyParser);

// Endpoint customizado para login
server.post('/usuarios/login', (req, res) => {
  const { email, senha } = req.body;

  // Busca no banco de dados simulado
  const usuarios = router.db.get('usuarios').value();
  const usuario = usuarios.find(
    (u) => u.email === email && u.senha === senha
  );

  if (usuario) {
    res.json({
      papel: usuario.papel,
      primeiroNome: usuario.primeiroNome,
    });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
