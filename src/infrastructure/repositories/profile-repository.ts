import { Profile } from "../../domain/entities/profile";
import type { IProfileRepository } from "../../domain/repositories/IProfileRepository";

export class ProfileRepository implements IProfileRepository {
  async getProfile(): Promise<Profile> {
    return new Profile(
      "Jhon Deyvid Quispe Mamani",
      "Desenvolvo aplicações web full-stack, APIs em Python e Next.js e automação de dados.",
      "Estudante do 5º semestre de Desenvolvimento de Software Multiplataforma na FATEC Itaquera e técnico em ADS pela ETEC Albert Einstein. Construo interfaces em React e TypeScript, backends em FastAPI e Node.js e pipelines em Python para extração estruturada de documentos. Venci o 1º Hackathon da FATEC Itaquera projetando e entregando um MVP funcional em 12 horas com Firebase e Firestore.",
      "1º Lugar no 1º Hackathon da FATEC Itaquera (2026)",
      "https://lnkd.in/p/dfZhxJFH",
      {
        email: "jhon.d.q.mamani@gmail.com",
        phone: "(11) 91514-1036",
        linkedinUrl: "https://www.linkedin.com/in/jhon-deyvid-5077642b9",
        linkedinHandle: "jhon-deyvid",
        githubUrl: "https://github.com/d-Jhon-b",
        githubHandle: "d-Jhon-b",
        location: "São Paulo, SP",
      },
      [
        {
          id: "exp-fatec-estagio",
          role: "Estagiário Desenvolvedor Full-Stack",
          company: "FATEC Itaquera",
          type: "Estágio Interno",
          period: "Fev 2026 — Ago 2026",
          achievements: [
            "Desenvolvi telas e recursos PWA do App Carteirinha Digital com React, TypeScript e Node.js.",
            "Estruturei e implementei rotas de API REST no backend utilizando Next.js.",
            "Criei scripts em Python para leitura e parsing de PDFs, automatizando a validação do status estudantil.",
          ],
          techUsed: ["React PWA", "TypeScript", "Next.js", "Node.js", "Python"],
        },
      ],
      [
        {
          id: "edu-fatec-dsm",
          degree: "Tecnólogo em Desenvolvimento de Software Multiplataforma",
          institution: "FATEC Itaquera",
          location: "São Paulo, SP",
          period: "Até Dez 2027",
          status: "5º semestre",
        },
        {
          id: "edu-etec-ads",
          degree: "Técnico em Análise e Desenvolvimento de Sistemas",
          institution: "ETEC Albert Einstein",
          location: "São Paulo, SP",
          period: "2024",
          status: "Concluído",
        },
      ],
      [
        {
          id: "skills-languages-frameworks",
          title: "Linguagens e frameworks",
          description: "Desenvolvimento full-stack tipado e APIs REST.",
          skills: ["Python", "TypeScript", "JavaScript", "React", "Next.js", "FastAPI", "Node.js"],
        },
        {
          id: "skills-cloud-devops",
          title: "Dados, cloud e infraestrutura",
          description: "Bancos NoSQL, containers e integração contínua.",
          skills: ["Firebase", "Firestore NoSQL", "Docker", "Nginx", "Git", "GitHub Actions"],
        },
        {
          id: "skills-ai-data",
          title: "IA e engenharia de dados",
          description: "Ingestão documental, automação e modelos de linguagem.",
          skills: [
            "LLMs",
            "Extração de PDFs",
            "LangChain",
            "LlamaIndex",
            "Bancos Vetoriais",
            "Engenharia de Prompts",
          ],
        },
      ],
    );
  }
}
