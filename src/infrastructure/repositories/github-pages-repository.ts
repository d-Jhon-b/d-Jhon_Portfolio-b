import { Project } from "../../domain/entities/project";
import type { IProjectRepository } from "../../domain/repositories/IProjectRepository";
import { GithubHttpClient } from "../http/github-http-client";
import { GithubMapper } from "../mappers/github-repository-mapper";

export class GithubProjectRepository implements IProjectRepository {
  private readonly httpClient: GithubHttpClient;
  private readonly mapper: GithubMapper;
  private readonly githubUsername = "d-Jhon-b";

  constructor(
    httpClient: GithubHttpClient = new GithubHttpClient(),
    mapper: GithubMapper = new GithubMapper(),
  ) {
    this.httpClient = httpClient;
    this.mapper = mapper;
  }

  private getCuratedProjects(): Project[] {
    const curatedData = [
      {
        id: "curated-hackathon-fatec",
        title: "1º Lugar — 1º Hackathon da FATEC Itaquera",
        description:
          "Desenvolvimento de MVP completo sob pressão (12 horas de projeto) com o tema 'Como a tecnologia pode ajudar na comunicação do estudante da FATEC', utilizando Firebase (BaaS) e banco NoSQL Firestore orientado a documentos.",
        techStack: ["Firebase", "Firestore NoSQL", "BaaS", "React", "TypeScript"],
        repoUrl: "https://github.com/d-Jhon-b",
        liveUrl: "https://lnkd.in/p/dfZhxJFH",
        stars: 50,
        badge: "🏆 1º Lugar Hackathon FATEC",
        period: "Setembro 2026",
      },
      {
        id: "curated-carteirinha-digital",
        title: "App Carteirinha Digital (FATEC Itaquera)",
        description:
          "Interface gráfica e aplicação PWA desenvolvida para alunos da FATEC Itaquera, com API REST estruturada em Next.js e automação em Python para leitura e parsing de PDFs de aprovação estudantil.",
        techStack: ["React PWA", "TypeScript", "Next.js", "Node.js", "Python"],
        repoUrl:
          "https://github.com/Carteirinha-Digital-Fatec-Itaquera/carteirinha-digital-front-end-aluno.git",
        liveUrl: "https://carteirinha-digital-front-end-aluno-alpha.vercel.app/",
        stars: 35,
        badge: "Em Produção • FATEC",
        period: "Fev 2026 - Ago 2026",
      },
      {
        id: "curated-salafacil-fatec",
        title: "Sistema Web de Agendamento — SalaFácil (FATEC)",
        description:
          "Sistema completo de gestão e reserva de ambientes acadêmicos e salas com TypeScript, React, autenticação integrada Microsoft e containerização com Docker.",
        techStack: ["TypeScript", "React", "Microsoft Auth", "Docker"],
        repoUrl: "https://github.com/AgendaFatec/SalaFacil.git",
        liveUrl: "https://front-end-pi-4-semestre-fq6w.vercel.app/login",
        stars: 28,
        badge: "Full-Stack & Docker",
        period: "2026",
      },
      {
        id: "curated-define-pilates",
        title: "Sistema Web de Agendamento (Define Pilates)",
        description:
          "Arquitetura de backend de alta performance para gestão de salas e agendamentos corporativos desenvolvido com Python, FastAPI e autenticação segura via JWT.",
        techStack: ["Python", "FastAPI", "JWT Auth", "REST API"],
        repoUrl: "https://github.com/d-Jhon-b/BackEnd_Projeto_Sistema_Empresa_Pillates.git",
        liveUrl: undefined,
        stars: 22,
        badge: "Backend Architecture",
        period: "2026",
      },
    ];

    return curatedData.map(
      (item) =>
        new Project(
          item.id,
          item.title,
          item.description,
          item.techStack,
          item.repoUrl,
          item.liveUrl,
          item.stars,
          item.badge,
          item.period,
        ),
    );
  }

  async findAll(): Promise<Project[]> {
    const curatedProjects = this.getCuratedProjects();
    const remoteRepos = await this.httpClient.fetchUserRepos(this.githubUsername);

    if (remoteRepos.length === 0) {
      return curatedProjects;
    }

    const knownRepoNames = new Set([
      "backend_projeto_sistema_empresa_pillates",
      "carteirinha-digital-front-end-aluno",
      "salafacil",
    ]);

    const mappedRemote = remoteRepos
      .filter((repo) => !knownRepoNames.has(repo.name.toLowerCase()))
      .slice(0, 4)
      .map((repo) => this.mapper.toDomain(repo));

    return [...curatedProjects, ...mappedRemote];
  }

  async findById(id: string): Promise<Project | null> {
    const projects = await this.findAll();
    const found = projects.find((p) => p.id === id);
    return found || null;
  }
}
