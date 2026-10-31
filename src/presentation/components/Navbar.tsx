import webPageIcon from "../../assets/icons/web_page.jpg";
import type { SocialLinksProps } from "../../domain/entities/profile";
import { GithubLogoIcon, LinkedinLogoIcon } from "./icons/PhosphorIcons";

interface NavbarProps {
  fullName: string;
  socials: SocialLinksProps;
}

export function Navbar({ fullName, socials }: NavbarProps) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[44rem] flex-wrap items-center justify-between gap-4 px-6 py-4">
        <a
          href="#topo"
          className="inline-flex min-h-[44px] items-center gap-2.5 text-base font-medium text-ink"
        >
          <img
            src={webPageIcon}
            alt="Ícone Jhon Deyvid"
            width={28}
            height={28}
            className="h-7 w-7 rounded-[2px] object-cover"
          />
          <span>{fullName}</span>
        </a>

        <nav aria-label="Navegação principal" className="flex flex-wrap items-center gap-5 text-sm">
          <a href="#projetos" className="minimal-link inline-flex min-h-[44px] items-center">
            Projetos
          </a>
          <a href="#sobre" className="minimal-link inline-flex min-h-[44px] items-center">
            Sobre
          </a>
          <a href="#contato" className="minimal-link inline-flex min-h-[44px] items-center">
            Contato
          </a>
          <a
            href={socials.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="minimal-link inline-flex min-h-[44px] items-center gap-1.5"
          >
            <GithubLogoIcon size={16} />
            <span>GitHub</span>
          </a>
          <a
            href={socials.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="minimal-link inline-flex min-h-[44px] items-center gap-1.5"
          >
            <LinkedinLogoIcon size={16} />
            <span>LinkedIn</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
