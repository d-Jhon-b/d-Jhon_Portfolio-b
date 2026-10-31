import type { Project } from "../../domain/entities/project";
import type { IProjectRepository } from "../../domain/repositories/IProjectRepository";

export class GetProjectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(): Promise<Project[]> {
    const projects = await this.projectRepository.findAll();
    return projects.sort((a, b) => {
      if (a.badge && !b.badge) return -1;
      if (!a.badge && b.badge) return 1;
      return b.stars - a.stars;
    });
  }
}

export { GetProjectsUseCase as GetPRojectsUseCase };
