import { useEffect, useMemo, useState } from "react";
import { GetProjectsUseCase } from "../../application/use-cases/get-project-use-case";
import type { Project } from "../../domain/entities/project";
import { GithubProjectRepository } from "../../infrastructure/repositories/github-pages-repository";

const projectRepository = new GithubProjectRepository();
const getProjectsUseCase = new GetProjectsUseCase(projectRepository);

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string>("Todos");

  useEffect(() => {
    let active = true;
    getProjectsUseCase
      .execute()
      .then((data) => {
        if (active) {
          setProjects(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Erro ao carregar projetos.");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const availableTechs = useMemo(() => {
    const set = new Set<string>(["Todos"]);
    for (const project of projects) {
      for (const tech of project.techStack) {
        set.add(tech);
      }
    }
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTech === "Todos") {
      return projects;
    }
    return projects.filter((project) => project.techStack.includes(selectedTech));
  }, [projects, selectedTech]);

  return {
    projects: filteredProjects,
    allProjectsCount: projects.length,
    loading,
    error,
    selectedTech,
    setSelectedTech,
    availableTechs,
  };
}
