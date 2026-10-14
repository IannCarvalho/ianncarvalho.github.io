
// MUI: Icons
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


// Data for both languages. The App picks `data[lang]` based on the language
// toggle. Each language block has the same shape (profile + projects), so the
// Resume/Projects components stay language-agnostic.
const data = {
    // ─────────────────────────────── ENGLISH ───────────────────────────────
    en: {
        profile: {
            name: "Iann Barbosa",
            address: "AI/ML Engineer · LLM Specialist · M.Sc. in Computer Science",
            summary: "Senior AI Engineer with a Master's in Computer Science (UFCG) and 5+ years of experience bridging Data Science and Software Engineering. Expert in building scalable AI-driven products — from architecting LLM pipelines, RAG systems, and autonomous agents to deploying production-ready full-stack applications. Proven track record of reducing operational costs by 85% through in-house LLM ecosystems that eliminated 3rd-party API dependencies, cutting processing turnaround time from hours to minutes. Deep expertise in LLMOps, model quantization, and cloud-native AI infrastructure (AWS).",
            summaryShort: "AI Engineer bridging Data Science and Software Engineering — LLM pipelines, RAG and autonomous agents, shipped to production.",
            avatar: "/avatar.jpg",
            languages: [
                { label: "Portuguese", level: "Native" },
                { label: "English", level: "Intermediate / Advanced" },
                { label: "Spanish", level: "Basic" },
            ],
            publications: [
                {
                    title: "Lexical and semantic representations for similar bug report detection: A TF-IDF and frozen T5 comparative study",
                    venue: "Software Quality Journal · Springer, 2026",
                    href: "https://link.springer.com/article/10.1007/s11219-026-09768-1",
                },
            ],
            contacts: [
                { icon: EmailIcon, label: "Email", value: "iann.barbosa@copin.ufcg.edu.br", href: "mailto:iann.barbosa@copin.ufcg.edu.br" },
                { icon: LinkedInIcon, label: "LinkedIn", value: "linkedin.com/in/iann-carvalho", href: "https://www.linkedin.com/in/iann-carvalho" },
                { icon: HomeIcon, label: "Location", value: "Campina Grande, Paraíba, Brazil" }
            ],
            skills: [
                { category: "LLM & GenAI", skills: ["LLMs", "RAG", "Prompt Engineering", "Autonomous Agents", "LangChain", "LangGraph", "LlamaIndex", "Model Context Protocol (MCP)", "Jailbreak Defense"] },
                { category: "NLP & ML", skills: ["Transformers", "NER & Relationship Extraction", "Text Classification", "Fine-tuning", "Recommendation Systems", "PyTorch", "TensorFlow", "scikit-learn", "spaCy", "NLTK"] },
                { category: "Vector Search", skills: ["Pinecone", "Chroma", "pgvector", "MongoDB Atlas Vector Search"] },
                { category: "Model Serving & MLOps", skills: ["AWS SageMaker", "Hugging Face", "Ollama"] },
                { category: "Languages", skills: ["Python", "Java", "JavaScript", "TypeScript", "Go"] },
                { category: "Frameworks & APIs", skills: ["FastAPI", "Flask", "Spring Boot", "React", "Vue.js", "Node.js"] },
                { category: "Data & Infrastructure", skills: ["Pandas", "Kafka", "Power BI", "AWS Lambda", "Docker", "CI/CD", "Git"] },
                { category: "Databases", skills: ["MongoDB", "PostgreSQL", "MySQL"] },
            ],
            socialMedia: [
                { icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/iann-carvalho" },
                { icon: GitHubIcon, label: "GitHub", href: "https://github.com/IannCarvalho" },
            ],
            education: [
                {
                    degree: "M.Sc. in Computer Science",
                    date: "August 2021 - November 2024",
                    school: "Universidade Federal de Campina Grande (UFCG) - Campina Grande, PB",
                    gpa: "",
                },
                {
                    degree: "B.Sc. in Computer Science",
                    date: "June 2016 - December 2021",
                    school: "Universidade Federal de Campina Grande (UFCG) - Campina Grande, PB",
                    gpa: "",
                },
            ],
            experience: [
                {
                    title: "Senior AI Engineer / Lee, Brock, Camargo Advogados",
                    date: "Aug 2024 - Present (2 yrs 3 mos) · São Paulo, Brazil",
                    bullets: [
                        "Architected an in-house Large Language Model (LLM) document-processing engine that eliminated 3rd-party API dependencies, cutting operational costs by an estimated ~85% and reducing document turnaround from hours to minutes.",
                        "Shipped the engine to production, where it processes hundreds of legal documents per day and is used daily by the firm's attorneys.",
                        "Designed Retrieval-Augmented Generation (RAG) pipelines and autonomous agents for large-scale legal classification and Named Entity Recognition (NER).",
                        "Built prompt-engineering (chain-of-thought, few-shot) and jailbreak-defense layers, orchestrating low-latency pipelines on Python (FastAPI), React and AWS.",
                    ],
                    stack: ["Python", "FastAPI", "React", "LLMs", "Prompt Engineering", "NLP", "Kafka", "CI/CD"],
                },
                {
                    title: "Team Leader (Data Analysis) / Software Practices Laboratory",
                    date: "Sep 2022 - Aug 2023 (1 yr) · Campina Grande, PB",
                    bullets: [
                        "Led a 5+ person Data Analysis team evolving the GtiPlug platform and architecting the LetStore web system from conception to production.",
                        "Delivered a personalized recommendation engine, driving measurable improvements in customer engagement and retention.",
                        "Optimized MySQL schemas and indexing for a 25% storage reduction, and built FastAPI/Flask APIs feeding real-time Power BI dashboards.",
                    ],
                    stack: ["Java", "Spring Boot", "Python", "FastAPI", "Flask", "Power BI", "MySQL", "CI/CD"],
                },
                {
                    title: "Team Leader (NLP for Brazilian Federal Police) / Software Practices Laboratory",
                    date: "Sep 2021 - Aug 2022 (1 yr) · Campina Grande, PB",
                    bullets: [
                        "Led an 8-person team building a Natural Language Processing (NLP) solution for Brazil's Federal Police, managing the full cycle from R&D to production.",
                        "Developed Transformer-based classification reaching >90% accuracy, processing thousands of forensic documents in a single large-scale backfill over the historical case archive.",
                        "Designed a scalable, high-throughput architecture for mass-document processing with low latency, cutting manual investigative effort.",
                    ],
                    stack: ["Flask", "React", "Docker", "Transformers", "Python", "MongoDB", "SQL", "CI/CD"],
                },
                {
                    title: "System Quality Assurance Analyst / Partnership with Hewlett Packard Enterprise (HPE)",
                    date: "Jul 2021 - Sep 2021 (3 mos) · Campina Grande, PB",
                    bullets: [
                        "Designed and executed exploratory test suites for a mission-critical static code-analysis platform, probing edge cases to surface defects before release.",
                        "Validated the platform's ML-driven issue classification against SonarQube and verified its CI/CD pipeline integrations, raising code-quality standards across the HPE ecosystem.",
                    ],
                    stack: ["Go", "Docker", "React", "JavaScript", "CI/CD", "RESTful APIs"],
                },
                {
                    title: "Full Stack Developer / Elife",
                    date: "Oct 2020 - Mar 2021 (6 mos) · São Paulo, Brazil",
                    bullets: [
                        "Built multiplatform conversational AI solutions (Web, Messenger, WhatsApp) for 5+ enterprise clients, including Domino's, Scania and Royal Canin.",
                        "Engineered multilingual conversational architectures in Node.js and TypeScript, deploying bots across international markets (Spain, Mexico, Brazil).",
                        "Automated support workflows at scale, cutting response times for high-traffic enterprise customers.",
                    ],
                    stack: ["Vue", "Node.js", "TypeScript", "MongoDB", "Messaging APIs", "CI/CD"],
                },
                {
                    title: "Data Scientist / Laboratório de Computação Inteligente Aplicada (LACINA)",
                    date: "Jan 2020 - Dec 2020 (1 yr) · Campina Grande, PB",
                    bullets: [
                        "Developed advanced NLP systems for Named Entity Recognition (NER) and relationship analysis across news portals and social media, powering competitive-intelligence insights.",
                        "Fine-tuned Transformer models (BERT, RoBERTa) for complex entity and relationship extraction, optimizing large-scale text-processing workflows for real-time insights.",
                    ],
                    stack: ["Python", "Falcon", "Pandas", "scikit-learn", "NLTK", "spaCy", "Transformers", "CI/CD"],
                },
                {
                    title: "Undergraduate Student Researcher / Laboratório Analytics",
                    date: "Aug 2018 - Jul 2019 (1 yr) · Campina Grande, PB",
                    bullets: [
                        "Investigated urban-vitality indicators by integrating datasets from multiple public-service institutions.",
                        "Performed comprehensive exploratory data analysis (EDA) to map service distribution and infrastructure gaps, synthesizing findings into technical reports.",
                    ],
                    stack: ["Python", "R"],
                },
                {
                    title: "Teaching Assistant Tutor / Universidade Federal de Campina Grande",
                    date: "May 2017 - Apr 2018 (1 yr) · Campina Grande, PB",
                    bullets: [
                        "Mentored 50+ students in Python fundamentals — data structures, algorithms and software logic.",
                        "Authored exercise sets and coding challenges, ran code reviews and debugging sessions, and instilled Pythonic best practices (PEP 8) and clean-code principles.",
                    ],
                    stack: ["Python"],
                },
            ],
        },

        // Personal projects, grouped by category.
        projects: [
            {
                title: "VetFlow — Multi-Service Veterinary Platform",
                category: "Software Engineering",
                period: "2025",
                highlights: [
                    "Architected a four-service system — React 19 SPA, Go (chi) REST backend, a Python MCP server and a Python agent — as independently deployable repositories, each with its own CI and tests.",
                    "Designed the backend as the single source of truth: it owns MongoDB and enforces JWT auth with per-tenant data scoping, so every other service reaches data only through its authenticated HTTP API.",
                    "Defined explicit boundaries and contracts between the frontend, backend and AI layer, keeping each component buildable, reviewable and shippable in isolation (Vercel for the SPA, Render for the Go and Python services).",
                ],
                tech: ["React 19", "Go", "chi", "MongoDB", "JWT", "Vercel", "Render"],
                repo: "https://github.com/IannCarvalho/vetflow",
                demo: "https://vetflow-frontend-demo.vercel.app/",
            },
            {
                title: "League of Legends Explorer — Full-Stack App",
                category: "Software Engineering",
                period: "2025",
                highlights: [
                    "Built a full-stack app to browse League of Legends champions and regions: a vanilla HTML/CSS/JS frontend (native ES Modules, no framework) and a Node.js/Express REST API.",
                    "Engineered the frontend as a hand-rolled single-page app with History-API routing, a cached data layer and keyboard navigation — no bundler.",
                    "Deployed the frontend to Vercel (continuous deploy on push) and the Express + Mongoose API to Render, backed by MongoDB Atlas.",
                ],
                tech: ["JavaScript", "Node.js", "Express", "MongoDB", "Vercel", "Render"],
                repo: "https://github.com/IannCarvalho/lol_front",
                demo: "https://lolfront.vercel.app",
            },
            {
                title: "VetFlow — Conversational AI Agent & MCP Server",
                category: "AI / Machine Learning",
                period: "2025",
                highlights: [
                    "Built a multi-provider LLM agent (Claude, GPT, Gemini, Amazon Bedrock via LiteLLM) that answers natural-language questions over a vet clinic's real data by running a tool-use loop — grounded in the system, never hallucinated.",
                    "Engineered a standalone Model Context Protocol (MCP) server that exposes the Go backend as reusable tools, so any MCP client (including Claude Desktop) drives the product through its authenticated HTTP API — never the database directly.",
                    "Designed BYOK (bring-your-own-key): the user's LLM key lives only in the browser and is used per request, so the deployed service holds no third-party credentials and carries no LLM cost.",
                    "Implemented JWT pass-through so the assistant acts strictly as the logged-in user, and solved a 512MB free-tier OOM by running the MCP in-process with per-request isolation via contextvars.",
                ],
                tech: ["Python", "FastAPI", "LiteLLM", "MCP", "LLM Agents", "AWS Bedrock"],
                repo: "https://github.com/IannCarvalho/vetflow",
                demo: null,
            },
            {
                title: "AI Engineering Study — RAG, Agents & Observability",
                category: "AI / Machine Learning",
                period: "2026",
                highlights: [
                    "Built a hands-on reference for modern LLM engineering: RAG pipelines, embeddings and chunking strategies over a single unified dataset.",
                    "Implemented hybrid keyword + semantic search with Reciprocal Rank Fusion, plus agentic patterns (ReAct, tool use) on LangGraph.",
                    "Ran everything locally and key-free with Ollama + Mistral, across Chroma (local) and Pinecone (cloud), with LangSmith / LangFuse tracing for observability.",
                ],
                tech: ["Python", "LangGraph", "RAG", "Chroma", "Pinecone", "Ollama"],
                repo: "https://github.com/IannCarvalho/llm-study",
                demo: null,
            },
            {
                title: "AluMind Feedback Analyzer",
                category: "AI / Machine Learning",
                period: "2025",
                highlights: [
                    "Built an AI system that classifies user feedback by sentiment (positive / negative / inconclusive) and flags spam.",
                    "Extracted requested product features from free-text feedback using an LLM, surfacing them for the product team.",
                    "Served a Flask dashboard with statistics and visualizations, plus automated weekly email summaries.",
                ],
                tech: ["Python", "Flask", "LLMs", "NLP"],
                repo: "https://github.com/IannCarvalho/alumind-feedback-analyzer",
                demo: null,
            },
        ]
    },

    // ─────────────────────────────── PORTUGUÊS ──────────────────────────────
    pt: {
        profile: {
            name: "Iann Barbosa",
            address: "Engenheiro de IA/ML · Especialista em LLMs · Mestre em Ciência da Computação",
            summary: "Engenheiro de IA Sênior, Mestre em Ciência da Computação (UFCG) e com 5+ anos de experiência unindo Ciência de Dados e Engenharia de Software. Especialista em construir produtos de IA escaláveis — da arquitetura de pipelines de LLM, sistemas RAG e agentes autônomos até a implantação de aplicações full-stack prontas para produção. Histórico comprovado de redução de 85% nos custos operacionais por meio de ecossistemas de LLM internos que eliminaram dependências de APIs de terceiros, reduzindo o tempo de processamento de horas para minutos. Profundo domínio de LLMOps, quantização de modelos e infraestrutura de IA cloud-native (AWS).",
            summaryShort: "Engenheiro de IA unindo Ciência de Dados e Engenharia de Software — pipelines de LLM, RAG e agentes autônomos, levados à produção.",
            avatar: "/avatar.jpg",
            languages: [
                { label: "Português", level: "Nativo" },
                { label: "Inglês", level: "Intermediário / Avançado" },
                { label: "Espanhol", level: "Básico" },
            ],
            publications: [
                {
                    title: "Lexical and semantic representations for similar bug report detection: A TF-IDF and frozen T5 comparative study",
                    venue: "Software Quality Journal · Springer, 2026",
                    href: "https://link.springer.com/article/10.1007/s11219-026-09768-1",
                },
            ],
            contacts: [
                { icon: EmailIcon, label: "E-mail", value: "iann.barbosa@copin.ufcg.edu.br", href: "mailto:iann.barbosa@copin.ufcg.edu.br" },
                { icon: LinkedInIcon, label: "LinkedIn", value: "linkedin.com/in/iann-carvalho", href: "https://www.linkedin.com/in/iann-carvalho" },
                { icon: HomeIcon, label: "Localização", value: "Campina Grande, Paraíba, Brasil" }
            ],
            skills: [
                { category: "LLM & GenAI", skills: ["LLMs", "RAG", "Engenharia de Prompt", "Agentes Autônomos", "LangChain", "LangGraph", "LlamaIndex", "Model Context Protocol (MCP)", "Defesa contra Jailbreak"] },
                { category: "PLN & ML", skills: ["Transformers", "Extração de Entidades e Relações (NER)", "Classificação de Texto", "Fine-tuning", "Sistemas de Recomendação", "PyTorch", "TensorFlow", "scikit-learn", "spaCy", "NLTK"] },
                { category: "Busca Vetorial", skills: ["Pinecone", "Chroma", "pgvector", "MongoDB Atlas Vector Search"] },
                { category: "Model Serving & MLOps", skills: ["AWS SageMaker", "Hugging Face", "Ollama"] },
                { category: "Linguagens", skills: ["Python", "Java", "JavaScript", "TypeScript", "Go"] },
                { category: "Frameworks & APIs", skills: ["FastAPI", "Flask", "Spring Boot", "React", "Vue.js", "Node.js"] },
                { category: "Dados & Infraestrutura", skills: ["Pandas", "Kafka", "Power BI", "AWS Lambda", "Docker", "CI/CD", "Git"] },
                { category: "Bancos de Dados", skills: ["MongoDB", "PostgreSQL", "MySQL"] },
            ],
            socialMedia: [
                { icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/iann-carvalho" },
                { icon: GitHubIcon, label: "GitHub", href: "https://github.com/IannCarvalho" },
            ],
            education: [
                {
                    degree: "Mestrado em Ciência da Computação",
                    date: "Agosto 2021 - Novembro 2024",
                    school: "Universidade Federal de Campina Grande (UFCG) - Campina Grande, PB",
                    gpa: "",
                },
                {
                    degree: "Bacharelado em Ciência da Computação",
                    date: "Junho 2016 - Dezembro 2021",
                    school: "Universidade Federal de Campina Grande (UFCG) - Campina Grande, PB",
                    gpa: "",
                },
            ],
            experience: [
                {
                    title: "Engenheiro de IA Sênior / Lee, Brock, Camargo Advogados",
                    date: "Ago 2024 - Atual (2 anos 3 meses) · São Paulo, Brasil",
                    bullets: [
                        "Arquitetei um motor interno de processamento de documentos com Large Language Models (LLMs) que eliminou dependências de APIs de terceiros, reduzindo custos operacionais em ~85% e o tempo de processamento de documentos de horas para minutos.",
                        "Coloquei o motor em produção, onde processa centenas de documentos jurídicos por dia e é usado diariamente pelos advogados da firma.",
                        "Projetei pipelines de Geração Aumentada por Recuperação (RAG) e agentes autônomos para classificação jurídica em larga escala e Reconhecimento de Entidades Nomeadas (NER).",
                        "Construí camadas de engenharia de prompt (chain-of-thought, few-shot) e defesa contra jailbreak, orquestrando pipelines de baixa latência em Python (FastAPI), React e AWS.",
                    ],
                    stack: ["Python", "FastAPI", "React", "LLMs", "Engenharia de Prompt", "PLN", "Kafka", "CI/CD"],
                },
                {
                    title: "Líder de Equipe (Análise de Dados) / Laboratório de Práticas de Software",
                    date: "Set 2022 - Ago 2023 (1 ano) · Campina Grande, PB",
                    bullets: [
                        "Liderei uma equipe de 5+ pessoas de Análise de Dados evoluindo a plataforma GtiPlug e arquitetando o sistema web LetStore da concepção à produção.",
                        "Entreguei um motor de recomendação personalizada, gerando melhorias mensuráveis no engajamento e na retenção de clientes.",
                        "Otimizei esquemas e índices MySQL para 25% de redução de armazenamento e construí APIs FastAPI/Flask alimentando dashboards Power BI em tempo real.",
                    ],
                    stack: ["Java", "Spring Boot", "Python", "FastAPI", "Flask", "Power BI", "MySQL", "CI/CD"],
                },
                {
                    title: "Líder de Equipe (PLN para a Polícia Federal) / Laboratório de Práticas de Software",
                    date: "Set 2021 - Ago 2022 (1 ano) · Campina Grande, PB",
                    bullets: [
                        "Liderei uma equipe de 8 pessoas construindo uma solução de Processamento de Linguagem Natural (PLN) para a Polícia Federal do Brasil, gerindo o ciclo completo de P&D à produção.",
                        "Desenvolvi classificação baseada em Transformers alcançando >90% de acurácia, processando milhares de documentos forenses em um único backfill de larga escala sobre o acervo histórico de casos.",
                        "Projetei uma arquitetura escalável e de alta vazão para processamento massivo de documentos com baixa latência, reduzindo o esforço investigativo manual.",
                    ],
                    stack: ["Flask", "React", "Docker", "Transformers", "Python", "MongoDB", "SQL", "CI/CD"],
                },
                {
                    title: "Analista de Garantia de Qualidade de Software / Parceria com a Hewlett Packard Enterprise (HPE)",
                    date: "Jul 2021 - Set 2021 (3 meses) · Campina Grande, PB",
                    bullets: [
                        "Projetei e executei suítes de testes exploratórios para uma plataforma crítica de análise estática de código, investigando casos extremos para expor defeitos antes do release.",
                        "Validei a classificação de problemas por ML da plataforma contra o SonarQube e verifiquei suas integrações de pipeline CI/CD, elevando o padrão de qualidade de código no ecossistema da HPE.",
                    ],
                    stack: ["Go", "Docker", "React", "JavaScript", "CI/CD", "APIs RESTful"],
                },
                {
                    title: "Desenvolvedor Full Stack / Elife",
                    date: "Out 2020 - Mar 2021 (6 meses) · São Paulo, Brasil",
                    bullets: [
                        "Construí soluções de IA conversacional multiplataforma (Web, Messenger, WhatsApp) para 5+ clientes corporativos, incluindo Domino's, Scania e Royal Canin.",
                        "Desenvolvi arquiteturas conversacionais multilíngues em Node.js e TypeScript, implantando bots em mercados internacionais (Espanha, México, Brasil).",
                        "Automatizei fluxos de atendimento em escala, reduzindo tempos de resposta para clientes corporativos de alto tráfego.",
                    ],
                    stack: ["Vue", "Node.js", "TypeScript", "MongoDB", "APIs de Mensageria", "CI/CD"],
                },
                {
                    title: "Cientista de Dados / Laboratório de Computação Inteligente Aplicada (LACINA)",
                    date: "Jan 2020 - Dez 2020 (1 ano) · Campina Grande, PB",
                    bullets: [
                        "Desenvolvi sistemas avançados de PLN para Reconhecimento de Entidades Nomeadas (NER) e análise de relações em portais de notícias e redes sociais, gerando insights de inteligência competitiva.",
                        "Fiz fine-tuning de modelos Transformer (BERT, RoBERTa) para extração complexa de entidades e relações, otimizando fluxos de processamento de texto em larga escala para insights em tempo real.",
                    ],
                    stack: ["Python", "Falcon", "Pandas", "scikit-learn", "NLTK", "spaCy", "Transformers", "CI/CD"],
                },
                {
                    title: "Pesquisador de Iniciação Científica / Laboratório Analytics",
                    date: "Ago 2018 - Jul 2019 (1 ano) · Campina Grande, PB",
                    bullets: [
                        "Investiguei indicadores de vitalidade urbana integrando bases de dados de múltiplas instituições de serviço público.",
                        "Realizei análise exploratória de dados (EDA) abrangente para mapear a distribuição de serviços e lacunas de infraestrutura, sintetizando os achados em relatórios técnicos.",
                    ],
                    stack: ["Python", "R"],
                },
                {
                    title: "Monitor / Universidade Federal de Campina Grande",
                    date: "Mai 2017 - Abr 2018 (1 ano) · Campina Grande, PB",
                    bullets: [
                        "Orientei 50+ estudantes em fundamentos de Python — estruturas de dados, algoritmos e lógica de software.",
                        "Elaborei listas de exercícios e desafios de código, conduzi revisões de código e sessões de depuração, e cultivei boas práticas Pythônicas (PEP 8) e princípios de código limpo.",
                    ],
                    stack: ["Python"],
                },
            ],
        },

        // Projetos pessoais, agrupados por categoria.
        projects: [
            {
                title: "VetFlow — Plataforma Veterinária Multi-Serviço",
                category: "Engenharia de Software",
                period: "2025",
                highlights: [
                    "Arquitetei um sistema de quatro serviços — SPA React 19, backend REST em Go (chi), um servidor MCP em Python e um agente em Python — como repositórios implantáveis de forma independente, cada um com CI e testes próprios.",
                    "Projetei o backend como a única fonte de verdade: ele é dono do MongoDB e aplica autenticação JWT com escopo de dados por tenant, de modo que todo serviço acessa os dados apenas pela API HTTP autenticada.",
                    "Defini fronteiras e contratos explícitos entre frontend, backend e camada de IA, mantendo cada componente construível, revisável e implantável isoladamente (Vercel para a SPA, Render para os serviços Go e Python).",
                ],
                tech: ["React 19", "Go", "chi", "MongoDB", "JWT", "Vercel", "Render"],
                repo: "https://github.com/IannCarvalho/vetflow",
                demo: "https://vetflow-frontend-eight.vercel.app/",
            },
            {
                title: "League of Legends Explorer — Aplicação Full-Stack",
                category: "Engenharia de Software",
                period: "2025",
                highlights: [
                    "Construí uma aplicação full-stack para explorar campeões e regiões de League of Legends: um frontend em HTML/CSS/JS puro (ES Modules nativos, sem framework) e uma API REST Node.js/Express.",
                    "Desenvolvi o frontend como uma single-page app feita à mão, com roteamento via History API, camada de dados em cache e navegação por teclado — sem bundler.",
                    "Implantei o frontend na Vercel (deploy contínuo a cada push) e a API Express + Mongoose no Render, com MongoDB Atlas.",
                ],
                tech: ["JavaScript", "Node.js", "Express", "MongoDB", "Vercel", "Render"],
                repo: "https://github.com/IannCarvalho/lol_front",
                demo: "https://lolfront.vercel.app",
            },
            {
                title: "VetFlow — Agente de IA Conversacional & Servidor MCP",
                category: "IA / Machine Learning",
                period: "2025",
                highlights: [
                    "Construí um agente LLM multi-provedor (Claude, GPT, Gemini, Amazon Bedrock via LiteLLM) que responde perguntas em linguagem natural sobre os dados reais de uma clínica veterinária executando um loop de uso de ferramentas — ancorado no sistema, nunca alucinado.",
                    "Projetei um servidor Model Context Protocol (MCP) autônomo que expõe o backend Go como ferramentas reutilizáveis, de modo que qualquer cliente MCP (inclusive o Claude Desktop) opere o produto pela API HTTP autenticada — nunca pelo banco direto.",
                    "Projetei o BYOK (traga sua própria chave): a chave de LLM do usuário vive só no navegador e é usada por requisição, então o serviço implantado não guarda credenciais de terceiros nem tem custo de LLM.",
                    "Implementei pass-through de JWT para o assistente agir estritamente como o usuário logado, e resolvi um OOM no free tier de 512MB rodando o MCP in-process com isolamento por requisição via contextvars.",
                ],
                tech: ["Python", "FastAPI", "LiteLLM", "MCP", "Agentes LLM", "AWS Bedrock"],
                repo: "https://github.com/IannCarvalho/vetflow",
                demo: null,
            },
            {
                title: "AI Engineering Study — RAG, Agentes & Observabilidade",
                category: "IA / Machine Learning",
                period: "2026",
                highlights: [
                    "Construí uma referência prática de engenharia de LLMs moderna: pipelines RAG, embeddings e estratégias de chunking sobre um único dataset unificado.",
                    "Implementei busca híbrida (palavra-chave + semântica) com Reciprocal Rank Fusion, além de padrões agênticos (ReAct, uso de ferramentas) no LangGraph.",
                    "Rodei tudo localmente e sem chaves com Ollama + Mistral, entre Chroma (local) e Pinecone (nuvem), com tracing LangSmith / LangFuse para observabilidade.",
                ],
                tech: ["Python", "LangGraph", "RAG", "Chroma", "Pinecone", "Ollama"],
                repo: "https://github.com/IannCarvalho/llm-study",
                demo: null,
            },
            {
                title: "AluMind — Analisador de Feedback",
                category: "IA / Machine Learning",
                period: "2025",
                highlights: [
                    "Construí um sistema de IA que classifica o feedback dos usuários por sentimento (positivo / negativo / inconclusivo) e sinaliza spam.",
                    "Extraí funcionalidades de produto solicitadas a partir de feedback em texto livre usando um LLM, trazendo-as à tona para o time de produto.",
                    "Servi um dashboard Flask com estatísticas e visualizações, além de resumos semanais automatizados por e-mail.",
                ],
                tech: ["Python", "Flask", "LLMs", "PLN"],
                repo: "https://github.com/IannCarvalho/alumind-feedback-analyzer",
                demo: null,
            },
        ]
    },
};

// Exporting the bilingual data object so that App.js can pick data[lang].
export default data;
