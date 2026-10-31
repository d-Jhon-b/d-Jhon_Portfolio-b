import type { EducationProps } from "../../domain/entities/profile";

interface EducationSectionProps {
  education: EducationProps[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="formacao" className="border-t border-line py-16 md:py-[64px]">
      <div className="mx-auto max-w-[44rem] px-6 space-y-6">
        <h2 className="text-[28px] leading-[1.25] font-medium text-ink">Formação</h2>

        <div className="divide-y divide-line border-t border-b border-line">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
            >
              <div className="text-sm text-muted">{edu.period}</div>
              <div>
                <p className="text-base font-medium text-ink">{edu.degree}</p>
                <p className="text-sm text-muted">
                  {edu.institution} · {edu.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
