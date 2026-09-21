import type { Project } from "../../domain/entities/project";
import type { IProjectRepository } from "../../domain/repositories/IProjectRepository";

export class GetPRojectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(): Promise<Project[]> {
    const projects = await this.projectRepository.findAll();
    return projects.sort((a, b) => b.stars - a.stars);
  }
}
