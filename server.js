import jsonServer from 'json-server';
import fileUpload from 'express-fileupload';
import express from 'express';
import path from 'path';

/* const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Configura a pasta assets/images como estática
app.use('/assets', express.static(path.join(__dirname, 'assets'))); */


const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();


// Configuração para o upload de arquivos
server.use(fileUpload());
server.use(express.static('public')); // Certifique-se de que a pasta `public` está exposta

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
      email: usuario.email,
    });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

// Endpoint para listar pedidos por email
server.get('/orcamentos/pedidos', (req, res) => {
  const usuario = req.query.usuario; // Obtém o email do usuário a partir dos parâmetros da query
  
  if (usuario) {
    // Aqui você faz a consulta no banco de dados para encontrar os pedidos do usuário
    const pedidos = router.db.get('pedidos').filter({ usuario }).value();
    res.json(pedidos); // Retorna os pedidos encontrados
  } else {
    res.status(400).json({ message: 'Usuário não especificado' });
  }
});

// Endpoint customizado para atualizar um pedido
server.put('/orcamentos/pedidos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const pedidoExistente = router.db.get('pedidos').find({ id }).value();

  if (pedidoExistente) {
    // Atualiza os dados do pedido
    const pedidoAtualizado = { ...pedidoExistente, ...req.body };
    router.db.get('pedidos').find({ id }).assign(pedidoAtualizado).write();
    res.status(200).json(pedidoAtualizado);
  } else {
    res.status(404).json({ message: 'Pedido não encontrado' });
  }
});




// Endpoint para criar um novo pedido
server.post('/orcamentos/pedidos', (req, res) => {
  const { massa, recheio1, recheio2, cobertura, frase, data, usuario } = req.body;

  // Valida os dados do pedido
  if (!massa || !recheio1 || !recheio2 || !cobertura || !usuario) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  // Recupera os pedidos existentes
  const pedidos = router.db.get('pedidos').value();

  // Cria um novo pedido
  const novoPedido = {
    id: pedidos.length ? pedidos[pedidos.length - 1].id + 1 : 1,
    massa,
    recheio1,
    recheio2,
    cobertura,
    frase,
    data,
    usuario,
  };

  // Adiciona o novo pedido ao banco de dados
  router.db.get('pedidos').push(novoPedido).write();

  // Retorna o pedido criado como resposta
  res.status(201).json(novoPedido);
});

// Endpoint customizado para deletar um pedido
server.delete('/orcamentos/pedidos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); // Obtém o ID do pedido a ser deletado
  const pedido = router.db.get('pedidos').find({ id }).value();

  if (pedido) {
    // Remove o pedido do banco de dados
    router.db.get('pedidos').remove({ id }).write();
    res.status(200).json({ message: 'Pedido deletado com sucesso' });
  } else {
    res.status(404).json({ message: 'Pedido não encontrado' });
  }
});


// Endpoint customizado para items
server.get('/orcamentos/items', (req, res) => {
  // Acessa a lista de itens diretamente do banco de dados
  const items = router.db.get('items').value();
  res.json(items); // Retorna os itens como resposta
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
  const uploadPath = `public/static/${imagem.name}`;

  imagem.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
    res.json({ path: `/static/${imagem.name}` });
  });
});


server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
