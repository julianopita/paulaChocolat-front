import jsonServer from 'json-server';
import fileUpload from 'express-fileupload';
import express from 'express';
import path from 'path';

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Configura a pasta assets/images como estática
app.use('/assets', express.static(path.join(__dirname, 'assets')));


const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();



// Configuração para o upload de arquivos
server.use(fileUpload());

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

// Endpoint customizado para cadastro
server.post('/usuarios/cadastro', (req, res) => {
  console.log('Dados recebidos no cadastro:', req.body); // Verifica o que está sendo enviado
  const { primeiroNome, ultimoNome, email, senha, papel } = req.body;

  // Validação básica
  if (!primeiroNome || !ultimoNome|| !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Verifica se o email já está registrado
  const usuarios = router.db.get('usuarios').value();
  const usuarioExistente = usuarios.find((u) => u.email === email);
  console.log(usuarios);

  if (usuarioExistente) {
    return res.status(409).json({ error: 'Email já registrado' });
  }

  // Adiciona o novo usuário ao banco de dados
  const novoUsuario = {
    id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1, // Incrementa ID
    primeiroNome,
    ultimoNome,
    email,
    senha,    
    papel: papel || 'Cliente', // Define papel padrão como "Cliente"
  };
  console.log(novoUsuario);

  router.db.get('usuarios').push(novoUsuario).write();

  res.status(201).json(novoUsuario);
});

// Endpoint para upload de imagem

server.post('/produtos/upload', (req, res) => {
  if (!req.files || !req.files.imagem) {
    return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
  }

  const imagem = req.files.imagem;
  const uploadPath = `assets/images/${imagem.name}`;

  imagem.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
    res.json({ path: `assets/images/${imagem.name}` });
  });
});


server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
