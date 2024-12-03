import { readFileSync } from 'fs';

// Middleware de login
export default (req, res, next) => {
  if (req.method === 'POST' && req.url === '/login/usuario') {
    const { email, senha } = req.body;
    const usuarios = JSON.parse(readFileSync('./db.json')).usuarios; // Lê o arquivo JSON

    // Verifique se o usuário existe
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    // Retorne as informações relevantes
    return res.status(200).json({
      id: usuario.id,
      email: usuario.email,
      papel: usuario.papel,
    });
  }

  // Continue para outras requisições
  next();
};
