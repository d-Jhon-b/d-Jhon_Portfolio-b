import type { EducationProps } from "../../domain/entities/profile";

interface EducationSectionProps {
  education: EducationProps[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="formacao" className="border-b border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 space-y-2">
          <p className="font-mono text-xs font-semibold tracking-widest text-brand-olive uppercase">
            Base Acadêmica
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-brand-gold sm:text-4xl">
            Formação Acadêmica
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu) => (
            <article
              key={edu.id}
              className="rounded-2xl border border-white/10 bg-brand-surface/80 p-6 shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-md border border-brand-gold/40 bg-brand-dark/70 px-3 py-1 font-mono text-xs font-semibold text-brand-gold">
                  {edu.status}
                </span>
                <span className="font-mono text-xs text-gray-300">{edu.period}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">{edu.degree}</h3>
              <p className="mt-1 text-sm font-medium text-brand-olive">
                {edu.institution} — {edu.location}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
