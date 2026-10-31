# Documentação Técnica e Arquitetural — Portfólio de Engenharia de Software

Este documento detalha a arquitetura, padrões de design, estrutura de pastas, tecnologias e diretrizes visuais adotadas no desenvolvimento deste portfólio profissional. O projeto foi concebido sob uma ótica de engenharia de software de nível enterprise, unindo a performance do ecossistema Frontend moderno com princípios consolidados de **Domain-Driven Design (DDD)** e **Clean Architecture**.

---

## 1. Visão Geral da Arquitetura (Clean Architecture)

A regra fundamental da Clean Architecture é a **Regra de Dependência**: as dependências do código fonte devem apontar **sempre para dentro**, em direção aos níveis de alto nível (Domínio). O núcleo da aplicação não faz ideia de que o React, Vite ou o Tailwind CSS existem, garantindo portabilidade, testabilidade e isolamento de regras de negócio.

```text
┌────────────────────────────────────────────────────────┐
│                   Presentation Layer                   │
│         (React Components, Custom Hooks, UI)           │
├────────────────────────────────────────────────────────┤
│                   Application Layer                    │
│             (Use Cases / Application Services)         │
├────────────────────────────────────────────────────────┤
│                     Domain Layer                       │
│           (Entities, Value Objects, Ports)             │
├────────────────────────────────────────────────────────┤
│                 Infrastructure Layer                   │
│      (Adapters, API Clients, LocalStorage, Repos)      │
└────────────────────────────────────────────────────────┘
```

---

## 2. Estrutura de Diretórios Detalhada

A árvore de arquivos reflete rigorosamente a separação de responsabilidades das camadas arquiteturais:

```text
src/
├── @types/                    # Definições globais de tipos e interfaces TypeScript
├── domain/                    # 🟢 Camada de Domínio (Núcleo Puro)
│   ├── entities/              # Entidades ricas com validações encapsuladas (ex: Project.ts)
│   └── repositories/          # Interfaces / Contratos (Ports) de persistência e serviços
├── application/               # 🟡 Camada de Aplicação (Casos de Uso)
│   └── use-cases/             # Orquestradores de fluxo (ex: GetProjectsUseCase.ts)
├── infrastructure/            # 🟠 Camada de Infraestrutura (Adaptadores Externos)
│   └── repositories/          # Implementações reais dos ports (ex: GitHubProjectRepository.ts)
├── presentation/              # 🔵 Camada de Apresentação (Interface com o Usuário)
│   ├── components/            # Componentes visuais atômicos e burros (Dumb Components)
│   ├── hooks/                 # Custom Hooks que conectam a UI aos Casos de Uso
│   └── pages/                 # Visualizações principais de rotas
├── index.css                  # Estilos globais e mapeamento de tokens do Tailwind v4
└── main.tsx                   # Ponto de entrada da aplicação (Mount root)
```

---

## 3. Especificações Técnicas e Tech Stack

*   **Core:** React 19 (Componentes funcionais puros, concorrência otimizada)
*   **Build Tool & Bundler:** Vite (Altíssima performance de compilação com Hot Module Replacement instantâneo)
*   **Linguagem:** TypeScript (Tipagem estricta, assegurando contratos e eliminando erros em tempo de compilação)
*   **Estilização:** Tailwind CSS v4 (Design system utilitário configurado via variáveis de tema customizadas)
*   **Linter & Formatter:** Biome (Substituto moderno de alta performance para ESLint e Prettier, escrito em Rust)
*   **Containerização & DevOps:** Docker (Multi-stage build com Nginx otimizado para servidores de SPA estáticas) e GitHub (Versionamento e CI/CD)

---

## 4. Paleta de Cores e Design System Tokens

As cores do portfólio foram estrategicamente selecionadas para transmitir sobriedade técnica, elegância e modernidade, evitando o contraste agressivo do preto puro. O mapeamento semântico no Tailwind v4 (`src/index.css`) é configurado da seguinte forma:

| Hexadecimal | Nome do Token | Aplicação Semântica Principal |
| :--- | :--- | :--- |
| `#4B3F31` | `--bg` / `--color-brand-dark` | Fundo principal da aplicação (Dark Base), reduzindo fadiga visual. |
| `#906D35` | `--line` / `--color-brand-surface` | Linhas divisórias de 1px e estrutura sutil. |
| `#9C8520` | `--muted` / `--color-brand-primary` | Texto secundário, anos, metadados e tecnologias. |
| `#F9D27B` | `--ink` / `--color-brand-gold` | Texto principal e títulos de alto contraste. |
| `#FFF479` | `--accent` / `--color-brand-olive` | Único destaque interativo (hover de links, foco visível e estados ativos). |

---

## 5. Mapeamento de Funcionalidades do Portfólio

1.  **Hero Section:** Apresentação profissional de impacto, focada no perfil de transição/consolidação de Backend/Infraestrutura para desenvolvimento Frontend avançado.
2.  **Seção de Projetos (Query Side):** Listagem dinâmica alimentada pela Clean Architecture, consumindo repositórios estruturados e exibindo cards customizados com as tecnologias utilizadas.
3.  **Formulário de Contato (Write Side):** Validação estrita baseada em regras de domínio (`ContactMessage` entity), prevenindo envios com dados corrompidos ou incompletos.
4.  **Seção de Infraestrutura & DevOps:** Exibição clara das competências em Docker, CI/CD e arquitetura de sistemas.