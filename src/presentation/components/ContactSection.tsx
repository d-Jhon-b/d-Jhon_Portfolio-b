import type { SocialLinksProps } from "../../domain/entities/profile";
import { useContactForm } from "../hooks/useContactForm";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  EnvelopeSimpleIcon,
  PaperPlaneRightIcon,
  WarningCircleIcon,
} from "./icons/PhosphorIcons";

interface ContactSectionProps {
  socials: SocialLinksProps;
}

export function ContactSection({ socials }: ContactSectionProps) {
  const { formData, updateField, handleSubmit, status, errorMessage } = useContactForm();

  return (
    <section id="contato" className="border-t border-line py-16 md:py-[120px]">
      <div className="mx-auto max-w-[44rem] px-6 space-y-10">
        <div className="space-y-4">
          <h2 className="text-[28px] leading-[1.25] font-medium text-ink">Contato</h2>
          <p className="max-w-[38rem] text-base text-ink/90">
            Disponível para oportunidades full-stack, backend e projetos de automação.
          </p>

          <div className="pt-2">
            <a
              href={`mailto:${socials.email}`}
              className="minimal-link inline-flex min-h-[44px] items-center gap-2 text-[20px] font-medium"
            >
              <EnvelopeSimpleIcon size={20} />
              <span>{socials.email}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
            <a
              href={socials.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="minimal-link inline-flex min-h-[44px] items-center gap-1"
            >
              <span>GitHub ({socials.githubHandle})</span>
              <ArrowUpRightIcon size={14} />
            </a>
            <a
              href={socials.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="minimal-link inline-flex min-h-[44px] items-center gap-1"
            >
              <span>LinkedIn ({socials.linkedinHandle})</span>
              <ArrowUpRightIcon size={14} />
            </a>
            <span className="inline-flex min-h-[44px] items-center">{socials.phone}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5 border-t border-line pt-8">
          <h3 className="text-[20px] font-medium text-ink">Enviar mensagem direta</h3>

          {status === "error" && errorMessage && (
            <div className="flex items-center gap-2 border border-accent px-3 py-2.5 text-sm text-accent">
              <WarningCircleIcon size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center gap-2 border border-line px-3 py-2.5 text-sm text-accent">
              <CheckCircleIcon size={18} />
              <span>Mensagem validada e pronta para envio no seu cliente de e-mail.</span>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1 block text-sm text-muted">
                Nome
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Seu nome"
                className="min-h-[44px] w-full rounded-[2px] border border-line bg-transparent px-3 py-2 text-base text-ink placeholder:text-muted/60 focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1 block text-sm text-muted">
                E-mail
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="voce@exemplo.com"
                className="min-h-[44px] w-full rounded-[2px] border border-line bg-transparent px-3 py-2 text-base text-ink placeholder:text-muted/60 focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="mb-1 block text-sm text-muted">
              Assunto
            </label>
            <input
              id="contact-subject"
              type="text"
              value={formData.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              placeholder="Proposta ou oportunidade"
              className="min-h-[44px] w-full rounded-[2px] border border-line bg-transparent px-3 py-2 text-base text-ink placeholder:text-muted/60 focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1 block text-sm text-muted">
              Mensagem
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="Escreva sua mensagem (mínimo de 10 caracteres)"
              className="w-full rounded-[2px] border border-line bg-transparent px-3 py-2 text-base text-ink placeholder:text-muted/60 focus:border-accent"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-[2px] border border-line px-5 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent disabled:opacity-50"
          >
            <PaperPlaneRightIcon size={16} />
            <span>{status === "submitting" ? "Validando..." : "Enviar mensagem"}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
