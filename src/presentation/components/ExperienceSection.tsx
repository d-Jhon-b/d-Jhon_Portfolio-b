import type { ExperienceProps } from "../../domain/entities/profile";

interface ExperienceSectionProps {
  summary: string;
  experiences: ExperienceProps[];
}

export function ExperienceSection({ summary, experiences }: ExperienceSectionProps) {
  return (
    <section id="sobre" className="border-t border-line py-16 md:py-[120px]">
      <div className="mx-auto max-w-[44rem] px-6 space-y-12">
        <div className="space-y-4">
          <h2 className="text-[28px] leading-[1.25] font-medium text-ink">Sobre</h2>
          <p className="max-w-[38rem] text-[17px] leading-[1.6] text-ink/90">{summary}</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-[20px] leading-[1.3] font-medium text-ink">Experiência</h3>
          <div className="divide-y divide-line border-t border-b border-line">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6"
              >
                <div className="text-sm text-muted">{exp.period}</div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-ink">
                    {exp.role} · {exp.company}
                  </p>
                  <ul className="max-w-[38rem] space-y-1.5 text-base leading-[1.6] text-ink/90">
                    {exp.achievements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted">{exp.techUsed.join(" · ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
