import { setupWorker, rest } from 'msw';

export const worker = setupWorker(
  rest.post('http://localhost:8080/login/usuario', (req, res, ctx) => {
    const { email, senha } = req.body;
    if (email === 'gerente@example.com' && senha === '1234') {
      return res(
        ctx.json({ id: 2, email, papel: 'Gerente' })
      );
    }
    return res(ctx.status(401), ctx.json({ error: 'Credenciais inválidas' }));
  })
);
