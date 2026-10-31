import type { SkillCategoryProps } from "../../domain/entities/profile";

interface SkillsAndDevOpsSectionProps {
  skillCategories: SkillCategoryProps[];
}

export function SkillsAndDevOpsSection({ skillCategories }: SkillsAndDevOpsSectionProps) {
  return (
    <section id="skills" className="border-t border-line py-16 md:py-[64px]">
      <div className="mx-auto max-w-[44rem] px-6 space-y-6">
        <h2 className="text-[28px] leading-[1.25] font-medium text-ink">Tecnologias</h2>

        <div className="divide-y divide-line border-t border-b border-line">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6"
            >
              <div className="text-sm font-medium text-ink">{category.title}</div>
              <div className="text-base text-muted">{category.skills.join(" · ")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
