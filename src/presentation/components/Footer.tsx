import type { SocialLinksProps } from "../../domain/entities/profile";

interface FooterProps {
  fullName: string;
  socials: SocialLinksProps;
}

export function Footer({ fullName, socials }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-white/10 bg-brand-dark py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-gray-400 sm:flex-row">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-white">{fullName}</span>.
          Arquitetura DDD & Clean Architecture.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={socials.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-gold"
          >
            GitHub
          </a>
          <a
            href={socials.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-gold"
          >
            LinkedIn
          </a>
          <a href={`mailto:${socials.email}`} className="hover:text-brand-gold">
            E-mail
          </a>
        </div>
      </div>
    </footer>
  );
}
