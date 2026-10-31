import type { ContactMessage } from "../../domain/entities/contact-message";
import type { IContactRepository } from "../../domain/repositories/IContactRepository";

export class ContactRepository implements IContactRepository {
  private readonly storageKey = "@jhon-portfolio:contact-messages";
  private readonly targetEmail = "jhon.d.q.mamani@gmail.com";

  async send(message: ContactMessage): Promise<void> {
    try {
      const existingRaw = localStorage.getItem(this.storageKey);
      const history = existingRaw ? (JSON.parse(existingRaw) as unknown[]) : [];
      history.push({
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        createdAt: message.createdAt.toISOString(),
      });
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch {
      // Fallback caso o navegador bloqueie localStorage
    }

    const mailtoSubject = encodeURIComponent(`[Portfólio] ${message.subject}`);
    const mailtoBody = encodeURIComponent(
      `Nome: ${message.name}\nE-mail: ${message.email}\n\nMensagem:\n${message.message}`,
    );
    window.open(`mailto:${this.targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`, "_blank");
  }
}
