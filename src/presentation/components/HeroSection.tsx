import type { Profile } from "../../domain/entities/profile";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden border-b border-white/10 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-surface/80 px-4 py-1.5 text-xs font-semibold text-brand-gold shadow-sm">
              <span>🏆 {profile.highlightAward}</span>
              <span className="text-white/40">•</span>
              <a
                href={profile.highlightAwardUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-brand-gold/60 underline-offset-4 transition-colors hover:text-white"
              >
                Ver premiação no LinkedIn
              </a>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-sm font-medium tracking-wider text-brand-olive uppercase">
                {profile.socials.location} • Engenharia de Software & Arquitetura DDD
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {profile.fullName}
              </h1>
              <p className="text-lg font-medium text-brand-gold sm:text-xl">{profile.headline}</p>
            </div>

            <p className="text-base leading-relaxed text-gray-200 sm:text-lg">{profile.summary}</p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projetos"
                className="rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:translate-y-[-1px] hover:opacity-95"
              >
                Explorar Projetos em Destaque
              </a>
              <a
                href="#contato"
                className="rounded-xl border border-brand-gold/50 bg-brand-surface/70 px-6 py-3 text-sm font-semibold text-brand-gold transition-all hover:border-brand-gold hover:bg-brand-surface"
              >
                Entrar em Contato
              </a>
              <a
                href={profile.socials.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-gray-200 transition-colors hover:border-white/40 hover:text-white"
              >
                GitHub @{profile.socials.githubHandle}
              </a>
            </div>
          </div>

          <div className="w-full max-w-sm rounded-2xl border border-brand-gold/25 bg-brand-surface/80 p-6 shadow-xl">
            <h2 className="mb-4 font-mono text-xs font-semibold tracking-widest text-brand-gold uppercase">
              Resumo Arquitetural & Perfil
            </h2>
            <ul className="space-y-3.5 text-sm text-gray-200">
              <li className="flex items-start justify-between border-b border-white/10 pb-2.5">
                <span className="text-gray-400">Formação Atual</span>
                <span className="font-semibold text-white">DSM — FATEC (5º Sem.)</span>
              </li>
              <li className="flex items-start justify-between border-b border-white/10 pb-2.5">
                <span className="text-gray-400">Base Técnica</span>
                <span className="font-semibold text-white">ADS — ETEC (2024)</span>
              </li>
              <li className="flex items-start justify-between border-b border-white/10 pb-2.5">
                <span className="text-gray-400">Premiação</span>
                <span className="font-semibold text-brand-gold">1º Lugar Hackathon FATEC</span>
              </li>
              <li className="flex items-start justify-between border-b border-white/10 pb-2.5">
                <span className="text-gray-400">Stack Principal</span>
                <span className="font-semibold text-brand-olive">
                  Python • TS • React • Next.js
                </span>
              </li>
              <li className="flex items-start justify-between">
                <span className="text-gray-400">Foco & Pesquisa</span>
                <span className="font-semibold text-white">IA/LLMs, Dados & Automação</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
