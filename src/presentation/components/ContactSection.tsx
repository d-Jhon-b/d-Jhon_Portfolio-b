import type { SocialLinksProps } from "../../domain/entities/profile";
import { useContactForm } from "../hooks/useContactForm";

interface ContactSectionProps {
  socials: SocialLinksProps;
}

export function ContactSection({ socials }: ContactSectionProps) {
  const { formData, updateField, handleSubmit, status, errorMessage } = useContactForm();

  return (
    <section id="contato" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="space-y-2">
              <p className="font-mono text-xs font-semibold tracking-widest text-brand-olive uppercase">
                Clean Architecture • Write Side
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-brand-gold sm:text-4xl">
                Vamos Conversar?
              </h2>
              <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                Estou disponível para oportunidades como Desenvolvedor Full-Stack, Backend/Frontend
                ou projetos envolvendo automação de dados e IA.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-brand-surface/80 p-6 text-sm">
              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-gray-400">E-mail Direto</span>
                <a
                  href={`mailto:${socials.email}`}
                  className="font-semibold text-brand-gold hover:underline"
                >
                  {socials.email}
                </a>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-gray-400">Telefone / WhatsApp</span>
                <span className="font-semibold text-white">{socials.phone}</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-gray-400">LinkedIn</span>
                <a
                  href={socials.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-olive hover:underline"
                >
                  linkedin.com/in/jhon-deyvid-5077642b9
                </a>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-400">GitHub</span>
                <a
                  href={socials.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-olive hover:underline"
                >
                  github.com/{socials.githubHandle}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4 rounded-2xl border border-white/10 bg-brand-surface/80 p-6 shadow-xl sm:p-8"
            >
              <h3 className="text-lg font-bold text-white">
                Envie uma mensagem (Validação de Domínio DDD)
              </h3>

              {status === "error" && errorMessage && (
                <div className="rounded-xl border border-red-400/50 bg-red-950/50 px-4 py-3 text-xs font-medium text-red-200 sm:text-sm">
                  ⚠️ {errorMessage}
                </div>
              )}

              {status === "success" && (
                <div className="rounded-xl border border-emerald-400/50 bg-emerald-950/50 px-4 py-3 text-xs font-medium text-emerald-200 sm:text-sm">
                  ✅ Mensagem validada pela entidade ContactMessage e preparada para envio!
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block font-mono text-xs font-semibold text-gray-300"
                  >
                    Seu Nome *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Ex: Maria Silva"
                    className="w-full rounded-xl border border-white/15 bg-brand-dark/90 px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block font-mono text-xs font-semibold text-gray-300"
                  >
                    Seu E-mail *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="voce@empresa.com"
                    className="w-full rounded-xl border border-white/15 bg-brand-dark/90 px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block font-mono text-xs font-semibold text-gray-300"
                >
                  Assunto *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  placeholder="Oportunidade Full-Stack / Projeto"
                  className="w-full rounded-xl border border-white/15 bg-brand-dark/90 px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block font-mono text-xs font-semibold text-gray-300"
                >
                  Mensagem (mín. 10 caracteres) *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Olá Jhon, gostei dos seus projetos na FATEC e gostaria de conversar..."
                  className="w-full rounded-xl border border-white/15 bg-brand-dark/90 px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:border-brand-gold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full cursor-pointer rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-95 disabled:opacity-50"
              >
                {status === "submitting" ? "Validando e enviando..." : "Enviar Mensagem"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
