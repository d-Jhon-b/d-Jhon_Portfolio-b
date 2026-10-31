# Modelo de Aplicação e Arquitetura Detalhada — Portfólio Jhon Deyvid

Este documento descreve de ponta a ponta o **Modelo de Aplicação**, a **Planificação Aprimorada em Domain-Driven Design (DDD) + Clean Architecture**, o **Mapeamento de Dados do Currículo**, a **Estratégia de Versionamento (GitFlow / Feature Branches)** e a **Esteira de Containerização & Deploy Contínuo (Docker + GitHub Actions + GitHub Pages)**.

---

## 1. Princípios Arquiteturais (DDD + Clean Architecture)

A aplicação segue estritamente a **Regra de Dependência** da Clean Architecture combinada com a modelagem tática do **Domain-Driven Design (DDD)**:

1. **Independência de Frameworks:** O núcleo de negócios (`src/domain` e `src/application`) é escrito em TypeScript puro, sem qualquer dependência de React, Tailwind CSS ou APIs de navegador.
2. **Testabilidade e Isolamento:** Como o acesso a dados passa por contratos (`Interfaces / Ports`) definidos no Domínio, a camada de Aplicação pode ser testada ou executada tanto com dados estáticos curados quanto com chamadas HTTP reais para a API do GitHub.
3. **Inversão de Dependência (DIP - SOLID):**
   * `Presentation` depende de `Application` (Use Cases) e `Domain` (Entities).
   * `Application` depende exclusivamente de `Domain` (Entities e Repository Interfaces).
   * `Infrastructure` depende de `Domain` (implementando as Interfaces de Repositório e convertendo payloads externos via `Mappers`).

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER (UI)                          │
│  Pages (HomePage) ──► Custom Hooks (useProjects, useProfile, useContact)│
│  Dumb Components (Hero, Experience, Projects, Skills, Education, Contact)│
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │ Invoca Use Cases / Consome Entities
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER (USE CASES)                       │
│   GetProjectsUseCase  │  GetProfileUseCase  │  SendContactMessageUseCase│
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │ Depende de Abstrações (Ports)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       DOMAIN LAYER (CORE PURO)                          │
│  Entities: Project, Profile (Experience, Education, SkillCategory),     │
│            ContactMessage                                               │
│  Repositories (Ports): IProjectRepository, IProfileRepository,          │
│                        IContactRepository                               │
└───────────────────────────────────▲─────────────────────────────────────┘
                                    │ Implementa Contratos (Adapters)
┌───────────────────────────────────┴─────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER (ADAPTERS)                      │
│  GithubProjectRepository + GithubMapper (Dados Curados + API GitHub)    │
│  ProfileRepository (Dados do Currículo de Jhon Deyvid)                  │
│  ContactRepository (Persistência Local + Integração Mailto/Webhook)     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Detalhamento de Cada Camada e Como É Aplicada

### 2.1. Camada de Domínio (`src/domain/`)
Responsável por concentrar as regras de negócio, invariantes e contratos da aplicação.

* **Entidade `Project` (`src/domain/entities/project.ts`):**
  * **Atributos:** `id`, `title`, `description`, `techStack`, `repoUrl`, `liveUrl`, `stars`, `badge` (opcional, ex.: `"🏆 1º Lugar Hackathon FATEC"`), `period` (opcional, ex.: `"Setembro 2026"`).
  * **Regras de Domínio (Invariantes):**
    * O `id` não pode ser vazio.
    * O `title` não pode ser vazio.
    * A `description` deve possuir no mínimo 10 caracteres válidos (`description.trim().length >= 10`).
  * **Comportamentos Calculados (Getters):**
    * `isHighLight`: retorna `true` quando `stars > 10` ou quando possui um `badge` de destaque/premiação.
    * `formatedTechStacks`: retorna as tecnologias unidas por `" • "`.

* **Entidade `Profile` e Objetos de Valor (`src/domain/entities/profile.ts`):**
  * Modela o currículo completo de **Jhon Deyvid Quispe Mamani** de forma tipada e validada:
    * `Experience`: cargo (`role`), organização (`company`), período (`period`), modalidade (`type`) e realizações (`achievements: string[]`).
    * `Education`: curso (`degree`), instituição (`institution`), localização (`location`) e status/período (`period`).
    * `SkillCategory`: categoria (`category`) e lista de competências (`skills: string[]`).
    * `Profile`: agrega dados pessoais, links sociais (GitHub, LinkedIn, E-mail, Telefone), resumo profissional, experiências, formações e categorias de habilidades.

* **Entidade `ContactMessage` (`src/domain/entities/contact-message.ts`):**
  * **Atributos:** `name`, `email`, `subject`, `message`, `createdAt`.
  * **Regras de Domínio (Write Side Validation):**
    * Nome deve ter ao menos 3 caracteres.
    * E-mail deve respeitar formato válido (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
    * Assunto deve ter ao menos 3 caracteres.
    * Mensagem deve conter no mínimo 10 caracteres para evitar envios vazios/spam.

* **Contratos de Repositório / Ports (`src/domain/repositories/`):**
  * `IProjectRepository`: `findAll(): Promise<Project[]>` e `findById(id: string): Promise<Project | null>`.
  * `IProfileRepository`: `getProfile(): Promise<Profile>`.
  * `IContactRepository`: `send(message: ContactMessage): Promise<void>`.

---

### 2.2. Camada de Aplicação (`src/application/use-cases/`)
Orquestra o fluxo de dados entre a UI e os repositórios de domínio sem expor detalhes de infraestrutura.

1. **`GetProjectsUseCase` (`get-project-use-case.ts`):**
   * Recebe `IProjectRepository` via Injeção de Dependência no construtor.
   * Busca todos os projetos e aplica a ordenação de relevância: projetos premiados/destaques primeiro e, em seguida, por número de estrelas (`b.stars - a.stars`).
2. **`GetProfileUseCase` (`get-profile-use-case.ts`):**
   * Recebe `IProfileRepository` e retorna a entidade agregada `Profile` pronta para exibição nas seções Hero, Experiência, Formação e Habilidades.
3. **`SendContactMessageUseCase` (`send-contact-message-use-case.ts`):**
   * Recebe os dados brutos do formulário (DTO), instancia a entidade `ContactMessage` (disparando todas as validações de domínio antes de qualquer chamada externa) e invoca `contactRepository.send(contactMessage)`.

---

### 2.3. Camada de Infraestrutura (`src/infrastructure/`)
Implementa os adaptadores concretos para os contratos do domínio.

1. **`GithubMapper` (`src/infrastructure/mappers/github-repository-mapper.ts`):**
   * Converte o payload JSON da API pública do GitHub (`https://api.github.com/users/d-Jhon-b/repos`) em instâncias válidas da entidade `Project`, garantindo que descrições curtas ou ausentes recebam um fallback descritivo que respeite a invariante de 10 caracteres do domínio.
2. **`GithubProjectRepository` (`src/infrastructure/repositories/github-pages-repository.ts`):**
   * Mantém os **4 Projetos de Destaque do Currículo** curados com seus links oficiais de produção (Vercel), LinkedIn e GitHub:
     1. **1º Lugar - 1º Hackathon da FATEC Itaquera** (Firebase, Firestore NoSQL, MVP 12h)
     2. **App Carteirinha Digital (FATEC)** (React PWA, TypeScript, Next.js API REST, Python PDF Parsing)
     3. **Sistema Web de Agendamento - SalaFácil (FATEC)** (TypeScript, React, Microsoft Auth, Docker)
     4. **Sistema Web de Agendamento (Define Pilates)** (Python, FastAPI, JWT Auth)
   * Adicionalmente, consulta de forma resiliente (com fallback offline) a API pública do GitHub (`users/d-Jhon-b/repos`) usando o `GithubMapper` para enriquecer o portfólio com repositórios públicos adicionais sem duplicar os projetos de destaque.
3. **`ProfileRepository` (`src/infrastructure/repositories/profile-repository.ts`):**
   * Retorna os dados estruturados do currículo de **Jhon Deyvid Quispe Mamani** (Estágio na FATEC Itaquera, Formação em DSM na FATEC Itaquera e ADS na ETEC Albert Einstein, stack Full-Stack e interesses em IA/LLMs, LangChain, LlamaIndex e Bancos Vetoriais).
4. **`ContactRepository` (`src/infrastructure/repositories/contact-repository.ts`):**
   * Registra a mensagem validada no `localStorage` (histórico local de envio) e aciona a abertura estruturada de contato para `jhon.d.q.mamani@gmail.com`.

---

### 2.4. Camada de Apresentação (`src/presentation/`)
Construída com **React 19**, **TypeScript** e **Tailwind CSS v4** seguindo a paleta semântica definida no `SKILL.md`:

* **Tokens de Tema (`src/index.css` via `@theme` do Tailwind v4):**
  * `--color-brand-dark: #333245` (Fundo principal)
  * `--color-brand-surface: #454432` (Cards e superfícies)
  * `--color-brand-primary: #7771C4` (Ações primárias, botões e CTAs)
  * `--color-brand-gold: #C4AD72` (Títulos de destaque, badges de premiação e ícones)
  * `--color-brand-olive: #C4C172` (Tags de tecnologia e metadados)
* **Custom Hooks (`src/presentation/hooks/`):**
  * `useProjects.ts`: instancia `GithubProjectRepository` + `GetProjectsUseCase` e gerencia estados de `projects`, `loading`, `error` e filtro por tecnologia.
  * `useProfile.ts`: instancia `ProfileRepository` + `GetProfileUseCase` e fornece os dados do currículo para a view.
  * `useContactForm.ts`: encapsula o estado do formulário, erros de validação da entidade `ContactMessage` e feedback de envio via `SendContactMessageUseCase`.
* **Componentes Visuais (`src/presentation/components/`):**
  * `Navbar.tsx`: navegação fixa com links âncora para cada seção e link direto ao GitHub/LinkedIn.
  * `HeroSection.tsx`: apresentação de impacto, badge de Vencedor do 1º Hackathon FATEC Itaquera, resumo profissional e CTAs.
  * `ExperienceSection.tsx`: linha do tempo detalhando a atuação como Estagiário Desenvolvedor Full-Stack na FATEC Itaquera.
  * `ProjectsSection.tsx`: grid responsivo alimentado pelo `useProjects`, destacando o 1º Lugar no Hackathon, App Carteirinha Digital, Sistema SalaFácil e Define Pilates, com filtro por stack e links para Deploy e GitHub.
  * `SkillsAndDevOpsSection.tsx`: vitrine técnica dividida em Linguagens & Frameworks, Banco de Dados/Cloud/DevOps (Docker, CI/CD, Firebase) e IA & Engenharia de Dados (LLMs, LangChain, LlamaIndex, Extração de PDFs).
  * `EducationSection.tsx`: cards da FATEC Itaquera (DSM) e ETEC Albert Einstein (ADS).
  * `ContactSection.tsx`: formulário conectado ao `useContactForm` com validação de domínio em tempo real e cartões de contato direto.

---

## 3. Fluxo de Branches, Commits e Qualidade (Biome Lint)

1. **Padrão de Branches:** Toda feature é desenvolvida em uma branch isolada seguindo a nomenclatura `feat/[nome-da-feature]`:
   * `feat/base-infrastructure`: Preservação dos arquivos iniciais e `SKILL.md`.
   * `feat/domain-and-application`: Modelagem completa do Domínio, Entidades, Contratos, Casos de Uso e `ModeloDeAplicação.md`.
   * `feat/infrastructure-repositories`: Implementação do `GithubMapper`, `GithubProjectRepository`, `ProfileRepository` e `ContactRepository`.
   * `feat/presentation-ui`: Configuração do TypeScript (`tsconfig.json`), Design System no Tailwind v4 (`index.css`), Custom Hooks, Componentes e `HomePage`.
   * `feat/docker-and-github-pages`: Containerização (`Dockerfile`, `nginx.conf`, `.dockerignore`) e CI/CD (`.github/workflows/deploy.yml`).
2. **Padrão de Commits (Conventional Commits):**
   * `feat(escopo): descrição` para novas funcionalidades.
   * `fix(escopo): descrição` para correções de bugs/validações.
   * `refactor(escopo): descrição` para melhorias estruturais sem alterar comportamento.
   * `chore(escopo): descrição` para configurações de build, lint, Docker e CI/CD.
3. **Padronização de Código (Biome):**
   * Antes de cada commit, o comando `biome check --write .` é executado para assegurar formatação (indentação de 2 espaços, aspas duplas, ponto-e-vírgula) e ausência de variáveis não utilizadas ou erros de lint.

---

## 4. Containerização (Docker) e Deploy Automatizado (GitHub Pages)

1. **Container Docker Multi-Stage (`Dockerfile` + `nginx.conf`):**
   * **Stage 1 (`builder`):** Imagem `node:22-alpine`, instala dependências com `npm ci`, executa o linter (`npm run lint`) e gera o bundle estático otimizado com `npm run build` (`dist/`).
   * **Stage 2 (`production`):** Imagem `nginx:stable-alpine`, copia os artefatos estáticos de `dist/` para `/usr/share/nginx/html` e aplica configuração customizada de Nginx (`try_files $uri $uri/ /index.html`) com compressão Gzip e cache de assets estáticos, expondo a porta `80`.
2. **Workflow GitHub Actions (`.github/workflows/deploy.yml`):**
   * Disparado em `push` na branch `main` (ou via `workflow_dispatch`).
   * **Job 1 (`build-and-container-verify`):**
     * Faz checkout do código, instala Node.js, roda `npm ci`, valida o código com `npm run lint`, compila o projeto com `npm run build` (configurando `base: "/d-Jhon_Portfolio-b/"` para o GitHub Pages), constrói a imagem Docker para validar o container em CI e publica o artefato `dist/` para o GitHub Pages.
   * **Job 2 (`deploy-gh-pages`):**
     * Utiliza a action oficial `actions/deploy-pages@v4` para publicar automaticamente o portfólio no ambiente do **GitHub Pages**.
