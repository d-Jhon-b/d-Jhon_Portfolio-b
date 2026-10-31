import type { ContactMessage } from "../entities/contact-message";

export interface IContactRepository {
  send(message: ContactMessage): Promise<void>;
}
