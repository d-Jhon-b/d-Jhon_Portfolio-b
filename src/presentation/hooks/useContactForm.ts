import type { FormEvent } from "react";
import { useState } from "react";
import type { ContactFormDTO } from "../../@types/portfolio";
import { SendContactMessageUseCase } from "../../application/use-cases/send-contact-message-use-case";
import { ContactRepository } from "../../infrastructure/repositories/contact-repository";

const contactRepository = new ContactRepository();
const sendContactMessageUseCase = new SendContactMessageUseCase(contactRepository);

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormDTO>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = (field: keyof ContactFormDTO, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status === "error" || status === "success") {
      setStatus("idle");
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      await sendContactMessageUseCase.execute(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Não foi possível validar sua mensagem.",
      );
    }
  };

  return {
    formData,
    updateField,
    handleSubmit,
    status,
    errorMessage,
  };
}
