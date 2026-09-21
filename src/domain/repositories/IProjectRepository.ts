import type { Project } from "../entities/project";

export interface IProjectRepository {
  findAll(): Promise<Project[]>;
  findById(): Promise<Project | null>;
}
