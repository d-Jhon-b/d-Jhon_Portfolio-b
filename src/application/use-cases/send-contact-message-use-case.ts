import type { ContactFormDTO } from "../../@types/portfolio";
import { ContactMessage } from "../../domain/entities/contact-message";
import type { IContactRepository } from "../../domain/repositories/IContactRepository";

export class SendContactMessageUseCase {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(dto: ContactFormDTO): Promise<ContactMessage> {
    const contactMessage = new ContactMessage(
      dto.name.trim(),
      dto.email.trim(),
      dto.subject.trim(),
      dto.message.trim(),
    );
    await this.contactRepository.send(contactMessage);
    return contactMessage;
  }
}
