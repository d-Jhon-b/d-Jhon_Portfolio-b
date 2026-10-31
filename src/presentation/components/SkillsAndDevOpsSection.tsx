import type { SkillCategoryProps } from "../../domain/entities/profile";

interface SkillsAndDevOpsSectionProps {
  skillCategories: SkillCategoryProps[];
}

export function SkillsAndDevOpsSection({ skillCategories }: SkillsAndDevOpsSectionProps) {
  return (
    <section id="skills" className="border-b border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 space-y-2">
          <p className="font-mono text-xs font-semibold tracking-widest text-brand-olive uppercase">
            Stack Tecnológica, Infraestrutura & Inteligência Artificial
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-brand-gold sm:text-4xl">
            Habilidades Técnicas & DevOps
          </h2>
          <p className="max-w-2xl text-sm text-gray-300 sm:text-base">
            Domínio técnico em desenvolvimento Full-Stack, containerização com Docker, arquitetura
            DDD e soluções voltadas para IA, LLMs e estruturação de dados.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-brand-surface/80 p-6 shadow-lg"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-brand-gold">{category.title}</h3>
                <p className="text-xs leading-relaxed text-gray-300 sm:text-sm">
                  {category.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-brand-olive/35 bg-brand-dark/80 px-2.5 py-1 font-mono text-xs font-medium text-brand-olive"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-brand-primary/40 bg-brand-surface/60 p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                Arquitetura deste Portfólio (Enterprise DDD + Container + CI/CD)
              </h3>
              <p className="text-xs text-gray-300 sm:text-sm">
                Construído em camadas isoladas (Domain, Application, Infrastructure, Presentation),
                padronizado com Biome Linter, empacotado em container Docker Multi-stage (Nginx) e
                publicado via GitHub Actions no GitHub Pages.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 font-mono text-xs">
              <span className="rounded-md bg-brand-primary/30 px-3 py-1.5 text-white">
                Docker + Nginx
              </span>
              <span className="rounded-md bg-brand-primary/30 px-3 py-1.5 text-white">
                GitHub Actions
              </span>
              <span className="rounded-md bg-brand-primary/30 px-3 py-1.5 text-white">
                Biome Lint
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
