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
        title: "MVP de comunicação estudantil (1º Lugar Hackathon FATEC)",
        description:
          "Plataforma construída em 12 horas para centralizar avisos e comunicação dos estudantes da FATEC Itaquera com sincronização em tempo real.",
        techStack: ["Firebase", "Firestore NoSQL", "React", "TypeScript"],
        repoUrl: "https://github.com/d-Jhon-b",
        liveUrl: "https://lnkd.in/p/dfZhxJFH",
        stars: 50,
        badge: "1º Lugar Hackathon",
        period: "2026",
      },
      {
        id: "curated-carteirinha-digital",
        title: "App Carteirinha Digital FATEC Itaquera",
        description:
          "Aplicação PWA para identificação estudantil com API REST em Next.js e scripts em Python que leem PDFs para aprovar cadastros automaticamente.",
        techStack: ["React PWA", "TypeScript", "Next.js", "Node.js", "Python"],
        repoUrl:
          "https://github.com/Carteirinha-Digital-Fatec-Itaquera/carteirinha-digital-front-end-aluno.git",
        liveUrl: "https://carteirinha-digital-front-end-aluno-alpha.vercel.app/",
        stars: 35,
        badge: "Produção",
        period: "2026",
      },
      {
        id: "curated-salafacil-fatec",
        title: "SalaFácil — Agendamento de salas acadêmicas",
        description:
          "Sistema web para reserva e controle de laboratórios e salas da FATEC com login institucional Microsoft e deploy em container Docker.",
        techStack: ["TypeScript", "React", "Microsoft Auth", "Docker"],
        repoUrl: "https://github.com/AgendaFatec/SalaFacil.git",
        liveUrl: "https://front-end-pi-4-semestre-fq6w.vercel.app/login",
        stars: 28,
        badge: "Produção",
        period: "2026",
      },
      {
        id: "curated-define-pilates",
        title: "API de agendamento Define Pilates",
        description:
          "Backend REST para gestão de horários, salas e alunos de estúdio de pilates, com controle de acesso via autenticação JWT.",
        techStack: ["Python", "FastAPI", "JWT", "REST API"],
        repoUrl: "https://github.com/d-Jhon-b/BackEnd_Projeto_Sistema_Empresa_Pillates.git",
        liveUrl: undefined,
        stars: 22,
        badge: "Backend",
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
      "d-jhon_portfolio-b",
    ]);

    const mappedRemote = remoteRepos
      .filter((repo) => !knownRepoNames.has(repo.name.toLowerCase()))
      .slice(0, 3)
      .map((repo) => this.mapper.toDomain(repo));

    return [...curatedProjects, ...mappedRemote];
  }

  async findById(id: string): Promise<Project | null> {
    const projects = await this.findAll();
    const found = projects.find((p) => p.id === id);
    return found || null;
  }
}
