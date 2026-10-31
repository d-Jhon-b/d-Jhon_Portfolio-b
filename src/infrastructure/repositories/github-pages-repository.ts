import { Project } from "../../domain/entities/project";
import type { IProjectRepository } from "../../domain/repositories/IProjectRepository";

export class GithubProjectRepository implements IProjectRepository {
  async findAll(): Promise<Project[]> {
    const rawData = [
      {
        id: "1",
        title: "API Gateway com Docker",
        description:
          "Microsserviço de roteamento, proxy reverso e autenticação containerizado com Docker.",
        techStack: ["TypeScript", "Docker", "Node.js"],
        repoUrl: "https://github.com/seu-usuario/api-gateway",
        liveUrl: undefined,
        stars: 12,
      },
      {
        id: "2",
        title: "Portfólio Clean Architecture",
        description:
          "Aplicação frontend moderna construída com React 19, Vite, Tailwind e padrões de POO.",
        techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
        repoUrl: "https://github.com/seu-usuario/portfolio",
        liveUrl: "https://meuportfolio.com",
        stars: 25,
      },
    ];
    return rawData.map(
      (item) =>
        new Project(
          item.id,
          item.title,
          item.description,
          item.techStack,
          item.repoUrl,
          item.liveUrl,
          item.stars,
        ),
    );
  }
  async findById(id: string): Promise<Project | null> {
    const projects = await this.findAll();
    const found = projects.find((p) => p.id === id);
    return found || null;
  }
}
