# Portfólio — Iann Carvalho

Site pessoal de portfólio (AI/ML Engineer), construído em **React + MUI v5** e publicado no **GitHub Pages** em [ianncarvalho.github.io](https://ianncarvalho.github.io).

Single-page application com seções de resumo, experiência, skills, idiomas e projetos pessoais, com **internacionalização EN/PT** e deploy contínuo a cada push na `main`.

## Stack

- **React 18** com Create React App (`react-scripts`)
- **MUI v5** (Material-UI) para o design system
- **i18n EN/PT** — alternância de idioma em tempo real
- **GitHub Pages** + **GitHub Actions** para deploy automático

## Estrutura

```
src/
├── index.js         # entrypoint — importa os dados de TEMPLATE.js
├── App.js           # layout raiz e troca de idioma
├── i18n.js          # strings e labels traduzíveis (EN/PT)
├── TEMPLATE.js      # TODO o conteúdo do portfólio (dados por idioma)
└── components/
    ├── Resume.js        # cabeçalho / resumo
    ├── ResumeCard.js    # cartão de experiência
    ├── Projects.js      # grade de cards de projeto (botões Code/Demo)
    └── SocialFeed.js    # links sociais
```

> Todo o **conteúdo** (resumo, experiências, skills, idiomas, projetos) vive em `src/TEMPLATE.js`, separado por idioma. Para atualizar o portfólio, edita esse arquivo — não precisa tocar nos componentes.

## Rodando localmente

Requer **Node.js 20** (mesma versão do CI).

```bash
npm install
npm start
```

Abre em [http://localhost:3000](http://localhost:3000) com hot-reload.

> Os scripts usam `NODE_OPTIONS=--openssl-legacy-provider` (via `cross-env`) para compatibilidade do `react-scripts` com Node moderno.

## Build

```bash
npm run build
```

Gera a pasta `build/` com os arquivos estáticos de produção.

## Deploy

O deploy é **automático**: todo push na `main` dispara o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que builda o CRA com Node 20 e publica no GitHub Pages via `actions/deploy-pages`.

- Usa o `GITHUB_TOKEN` automático do repo — **não precisa de secret nem token manual**.
- Também pode ser disparado manualmente pela aba **Actions** (`workflow_dispatch`).
- `concurrency` garante um deploy de cada vez, cancelando o anterior em andamento.

Depois do deploy, o site atualiza em [ianncarvalho.github.io](https://ianncarvalho.github.io) em 1–2 minutos.

## Customização

Para adaptar o conteúdo, edite `src/TEMPLATE.js`. Cada card de projeto aceita:

```js
{
    title: "Nome do Projeto",
    category: "Software Engineering",   // agrupa os cards
    period: "2025",
    highlights: ["...", "..."],          // bullets
    tech: ["React", "Go", "..."],        // chips de tecnologia
    repo: "https://github.com/...",      // botão "Code" (opcional)
    demo: "https://...",                 // botão "Demo" (opcional; null = sem botão)
}
```

Para mudanças de layout ou estilo, edite os componentes em `src/components/` usando MUI.

## Créditos

Baseado no template [react-mui-resume](https://github.com/UMLCloudComputing/react-mui-resume) (UMass Lowell Cloud Computing Club), sob licença MIT.

## Licença

MIT — veja [LICENSE](LICENSE).
