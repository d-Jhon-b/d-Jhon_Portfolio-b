export class ContactMessage {
  public readonly createdAt: Date;

  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly subject: string,
    public readonly message: string,
  ) {
    this.createdAt = new Date();
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length < 3) {
      throw new Error("Por favor, informe seu nome (mínimo de 3 caracteres).");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailRegex.test(this.email.trim())) {
      throw new Error("Por favor, informe um endereço de e-mail válido.");
    }

    if (!this.subject || this.subject.trim().length < 3) {
      throw new Error("O assunto deve possuir no mínimo 3 caracteres.");
    }

    if (!this.message || this.message.trim().length < 10) {
      throw new Error("A mensagem deve conter pelo menos 10 caracteres.");
    }
  }
}
