import type { SocialLinksProps } from "../../domain/entities/profile";

interface NavbarProps {
  socials: SocialLinksProps;
}

export function Navbar({ socials }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-dark/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#sobre"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition-colors hover:text-brand-gold"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary font-mono text-sm font-extrabold text-white shadow-sm">
            JD
          </span>
          <span>
            Jhon<span className="text-brand-gold">.dev</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-300 md:flex">
          <a href="#sobre" className="transition-colors hover:text-brand-gold">
            Sobre
          </a>
          <a href="#experiencia" className="transition-colors hover:text-brand-gold">
            Experiência
          </a>
          <a href="#projetos" className="transition-colors hover:text-brand-gold">
            Projetos
          </a>
          <a href="#skills" className="transition-colors hover:text-brand-gold">
            Skills & DevOps
          </a>
          <a href="#formacao" className="transition-colors hover:text-brand-gold">
            Formação
          </a>
          <a href="#contato" className="transition-colors hover:text-brand-gold">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={socials.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/15 bg-brand-surface/60 px-3.5 py-1.5 text-xs font-semibold text-brand-olive transition-all hover:border-brand-gold hover:text-white"
          >
            GitHub ({socials.githubHandle})
          </a>
          <a
            href={socials.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-brand-primary px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:opacity-90"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
