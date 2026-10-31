import type { Project } from "../../domain/entities/project";

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
    <section id="projetos" className="border-b border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold tracking-widest text-brand-olive uppercase">
              Clean Architecture • Query Side
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-gold sm:text-4xl">
              Projetos de Destaque
            </h2>
            <p className="max-w-2xl text-sm text-gray-300 sm:text-base">
              Soluções reais em produção, MVPs premiados e arquiteturas de backend/frontend
              alimentadas pelo repositório de domínio.
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {availableTechs.map((tech) => {
            const isActive = selectedTech === tech;
            return (
              <button
                key={tech}
                type="button"
                onClick={() => onSelectTech(tech)}
                className={`cursor-pointer rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-brand-primary text-white shadow-md"
                    : "border border-white/15 bg-brand-surface/60 text-gray-300 hover:border-brand-gold/50 hover:text-white"
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>

        {loading && (
          <div className="rounded-2xl border border-white/10 bg-brand-surface/50 p-10 text-center text-sm text-gray-300">
            Carregando projetos do domínio...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/40 bg-red-950/30 p-6 text-sm text-red-200">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 shadow-lg transition-all hover:translate-y-[-2px] ${
                  project.isHighLight
                    ? "border-brand-gold/40 bg-brand-surface/90"
                    : "border-white/10 bg-brand-surface/60"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {project.badge ? (
                      <span className="rounded-full border border-brand-gold/50 bg-brand-dark/80 px-3 py-1 font-mono text-xs font-semibold text-brand-gold">
                        {project.badge}
                      </span>
                    ) : (
                      <span className="rounded-full border border-white/15 bg-brand-dark/60 px-3 py-1 font-mono text-xs text-gray-300">
                        Repositório GitHub
                      </span>
                    )}

                    {project.period && (
                      <span className="font-mono text-xs text-gray-400">{project.period}</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white">{project.title}</h3>

                  <p className="text-sm leading-relaxed text-gray-200">{project.description}</p>
                </div>

                <div className="mt-6 space-y-5 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-brand-olive/30 bg-brand-dark/70 px-2.5 py-1 font-mono text-xs font-medium text-brand-olive"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                      >
                        <span>
                          {project.liveUrl.includes("lnkd.in") ||
                          project.liveUrl.includes("linkedin")
                            ? "Ver Post da Premiação"
                            : "Acessar Aplicação"}
                        </span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-brand-gold/40 bg-brand-dark/60 px-4 py-2 text-xs font-semibold text-brand-gold transition-colors hover:border-brand-gold hover:text-white"
                    >
                      <span>Repositório GitHub</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
