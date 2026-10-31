import type { ExperienceProps } from "../../domain/entities/profile";

interface ExperienceSectionProps {
  experiences: ExperienceProps[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experiencia" className="border-b border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 space-y-2">
          <p className="font-mono text-xs font-semibold tracking-widest text-brand-olive uppercase">
            Trajetória Profissional
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-brand-gold sm:text-4xl">
            Experiência Profissional
          </h2>
          <p className="max-w-2xl text-sm text-gray-300 sm:text-base">
            Atuação prática em desenvolvimento Full-Stack, construção de APIs REST e automação de
            processos institucionais com Python.
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="rounded-2xl border border-white/10 bg-brand-surface/80 p-6 shadow-lg transition-all hover:border-brand-gold/40 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">{exp.role}</h3>
                  <p className="text-sm font-medium text-brand-gold">
                    {exp.company} <span className="text-gray-400">({exp.type})</span>
                  </p>
                </div>
                <span className="inline-flex w-fit items-center rounded-lg border border-brand-primary/40 bg-brand-primary/20 px-3.5 py-1 font-mono text-xs font-semibold text-white">
                  {exp.period}
                </span>
              </div>

              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-gray-200 sm:text-base">
                {exp.achievements.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {exp.techUsed.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-brand-olive/30 bg-brand-dark/70 px-2.5 py-1 font-mono text-xs font-medium text-brand-olive"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
