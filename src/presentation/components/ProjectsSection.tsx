import type { Project } from "../../domain/entities/project";
import { ArrowUpRightIcon } from "./icons/PhosphorIcons";

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  selectedTech: string;
  onSelectTech: (tech: string) => void;
  availableTechs: string[];
}

export function ProjectsSection({
  projects,
  loading,
  error,
  selectedTech,
  onSelectTech,
  availableTechs,
}: ProjectsSectionProps) {
  return (
    <section id="projetos" className="border-t border-line py-16 md:py-[120px]">
      <div className="mx-auto max-w-[44rem] px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[28px] leading-[1.25] font-medium text-ink">Projetos</h2>

          <div className="flex flex-wrap gap-3 text-sm">
            {availableTechs.slice(0, 6).map((tech) => {
              const isActive = selectedTech === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => onSelectTech(tech)}
                  className={`min-h-[44px] cursor-pointer px-1 text-sm ${
                    isActive
                      ? "text-accent underline decoration-accent decoration-1 underline-offset-4 font-medium"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>

        {loading && <p className="mt-8 text-sm text-muted">Carregando projetos...</p>}

        {error && <p className="mt-8 text-sm text-accent">{error}</p>}

        {!loading && !error && (
          <div className="mt-8 divide-y divide-line border-t border-b border-line">
            {projects.map((project) => {
              const primaryUrl = project.liveUrl ?? project.repoUrl;
              return (
                <article
                  key={project.id}
                  className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6"
                >
                  <div className="text-sm text-muted">{project.period ?? "2026"}</div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[20px] leading-[1.3] font-medium text-ink">
                        <a
                          href={primaryUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="minimal-link inline-flex items-center gap-1.5"
                        >
                          <span>{project.title}</span>
                          <ArrowUpRightIcon size={15} />
                        </a>
                      </h3>

                      {project.liveUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="minimal-link inline-flex items-center gap-1 text-sm text-muted"
                        >
                          <span>Código</span>
                          <ArrowUpRightIcon size={13} />
                        </a>
                      )}
                    </div>

                    <p className="max-w-[38rem] text-base leading-[1.6] text-ink/90">
                      {project.description}
                    </p>

                    <p className="text-sm text-muted">{project.techStack.join(" · ")}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
