import type { Profile } from "../../domain/entities/profile";
import { ArrowUpRightIcon } from "./icons/PhosphorIcons";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section id="topo" className="pt-16 pb-16 md:pt-[120px] md:pb-[120px]">
      <div className="mx-auto max-w-[44rem] px-6">
        <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-ink">
          {profile.headline}
        </h1>

        <p className="mt-6 max-w-[38rem] text-[17px] leading-[1.6] text-ink/90">
          Desenvolvedor full-stack em São Paulo, atuando na FATEC Itaquera com Python, TypeScript,
          React e Next.js.{" "}
          <a
            href={profile.highlightAwardUrl}
            target="_blank"
            rel="noreferrer"
            className="minimal-link inline-flex items-center gap-1 font-medium"
          >
            <span>{profile.highlightAward}</span>
            <ArrowUpRightIcon size={14} />
          </a>
          .
        </p>
      </div>
    </section>
  );
}
