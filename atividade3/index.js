const express = require('express');
const app = express();
const PORT = 3000;

let estoque = [];


app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Estoque API</title>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap" rel="stylesheet"/>
      <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0a0a0f;
          --surface: #13131a;
          --border: #2a2a3a;
          --accent: #00f5a0;
          --accent2: #00c9ff;
          --text: #e8e8f0;
          --muted: #6b6b8a;
          --danger: #ff4b6e;
          --warn: #ffb830;
        }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          padding: 3rem 2rem;
        }
        .grid-bg {
          position: fixed; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(0,245,160,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,160,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .container { max-width: 860px; margin: 0 auto; position: relative; z-index: 1; }
        header { margin-bottom: 3rem; }
        .badge {
          display: inline-block;
          background: var(--accent);
          color: #000;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: 2px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        h1 span { color: var(--accent); }
        .subtitle {
          margin-top: 0.75rem;
          color: var(--muted);
          font-size: 1rem;
        }
        .routes { display: flex; flex-direction: column; gap: 1rem; }
        .route {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .route:hover { border-color: var(--accent); }
        .route-header {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border);
        }
        .method {
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          background: rgba(0,245,160,0.15);
          color: var(--accent);
          letter-spacing: 0.05em;
        }
        .path {
          font-family: 'Space Mono', monospace;
          font-size: 0.95rem;
          color: var(--text);
        }
        .path .param { color: var(--accent2); }
        .route-body { padding: 1rem 1.25rem; }
        .desc { color: var(--muted); font-size: 0.9rem; margin-bottom: 0.75rem; }
        .example {
          background: #0a0a0f;
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 0.6rem 1rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          color: var(--accent2);
        }
        .example span { color: var(--muted); }
        footer {
          margin-top: 3rem;
          text-align: center;
          color: var(--muted);
          font-size: 0.85rem;
          font-family: 'Space Mono', monospace;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 2rem 0;
        }
        .section-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--muted);
          margin-bottom: 1rem;
        }
      </style>
    </head>
    <body>
      <div class="grid-bg"></div>
      <div class="container">
        <header>
          <div class="badge">REST API</div>
          <h1>ESTOQUE<span>.</span>API</h1>
          <p class="subtitle">Gerenciamento de produtos via rotas HTTP — Node.js + Express</p>
        </header>

        <p class="section-title">Rotas disponíveis</p>
        <div class="routes">

          <div class="route">
            <div class="route-header">
              <span class="method">GET</span>
              <span class="path">/adicionar/<span class="param">:id/:nome/:qtd</span></span>
            </div>
            <div class="route-body">
              <p class="desc">Adiciona um novo produto ao estoque com ID, nome e quantidade.</p>
              <div class="example"><span>ex:</span> /adicionar/1/Notebook/10</div>
            </div>
          </div>

          <div class="route">
            <div class="route-header">
              <span class="method">GET</span>
              <span class="path">/listar</span>
            </div>
            <div class="route-body">
              <p class="desc">Retorna todos os produtos cadastrados no estoque em formato JSON.</p>
              <div class="example"><span>ex:</span> /listar</div>
            </div>
          </div>

          <div class="route">
            <div class="route-header">
              <span class="method">GET</span>
              <span class="path">/remover/<span class="param">:id</span></span>
            </div>
            <div class="route-body">
              <p class="desc">Remove um produto do estoque pelo seu ID.</p>
              <div class="example"><span>ex:</span> /remover/1</div>
            </div>
          </div>

          <div class="route">
            <div class="route-header">
              <span class="method">GET</span>
              <span class="path">/editar/<span class="param">:id/:qtd</span></span>
            </div>
            <div class="route-body">
              <p class="desc">Atualiza a quantidade de um produto existente pelo ID.</p>
              <div class="example"><span>ex:</span> /editar/1/25</div>
            </div>
          </div>

        </div>

        <div class="divider"></div>
        <footer>porta ${PORT} &nbsp;·&nbsp; estoque em memória &nbsp;·&nbsp; dados resetados ao reiniciar</footer>
      </div>
    </body>
    </html>
  `);
});


app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
  const { id, nome, qtd } = req.params;

  const quantidade = parseInt(qtd);
  if (isNaN(quantidade) || quantidade < 0) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Quantidade inválida. Deve ser um número inteiro não negativo.'
    });
  }

  const existe = estoque.find(p => p.id === id);
  if (existe) {
    return res.status(409).json({
      sucesso: false,
      mensagem: `Produto com ID "${id}" já existe no estoque.`
    });
  }

  const produto = { id, nome, quantidade };
  estoque.push(produto);

  res.status(201).json({
    sucesso: true,
    mensagem: 'Produto adicionado com sucesso.',
    produto
  });
});


app.get('/listar', (req, res) => {
  res.json({
    sucesso: true,
    total: estoque.length,
    estoque
  });
});


app.get('/remover/:id', (req, res) => {
  const { id } = req.params;

  const index = estoque.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({
      sucesso: false,
      mensagem: `Produto com ID "${id}" não encontrado.`
    });
  }

  const [removido] = estoque.splice(index, 1);

  res.json({
    sucesso: true,
    mensagem: 'Produto removido com sucesso.',
    produto: removido
  });
});


app.get('/editar/:id/:qtd', (req, res) => {
  const { id, qtd } = req.params;

  const novaQtd = parseInt(qtd);
  if (isNaN(novaQtd) || novaQtd < 0) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Quantidade inválida. Deve ser um número inteiro não negativo.'
    });
  }

  const produto = estoque.find(p => p.id === id);
  if (!produto) {
    return res.status(404).json({
      sucesso: false,
      mensagem: `Produto com ID "${id}" não encontrado.`
    });
  }

  const qtdAnterior = produto.quantidade;
  produto.quantidade = novaQtd;

  res.json({
    sucesso: true,
    mensagem: 'Quantidade atualizada com sucesso.',
    produto,
    alteracao: { de: qtdAnterior, para: novaQtd }
  });
});


app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`\nRotas disponíveis:`);
  console.log(`  GET  http://localhost:${PORT}/adicionar/:id/:nome/:qtd`);
  console.log(`  GET  http://localhost:${PORT}/listar`);
  console.log(`  GET  http://localhost:${PORT}/remover/:id`);
  console.log(`  GET  http://localhost:${PORT}/editar/:id/:qtd\n`);
});