import { Profile } from "../../domain/entities/profile";
import type { IProfileRepository } from "../../domain/repositories/IProfileRepository";

export class ProfileRepository implements IProfileRepository {
  async getProfile(): Promise<Profile> {
    return new Profile(
      "Jhon Deyvid Quispe Mamani",
      "Desenvolvedor Full-Stack • Python, TypeScript, React, Next.js & Arquitetura de Dados",
      "Desenvolvedor Full-Stack em formação (5º semestre de Desenvolvimento de Software Multiplataforma - FATEC Itaquera) com forte lógica de programação e autonomia. Experiência prática com Python, Next.js, TypeScript, React, Node.js, FastAPI, Firebase (BaaS) e Firestore. Vencedor do 1º Hackathon da FATEC Itaquera, com foco em resolução de problemas complexos, automação de dados e arquitetura web moderna.",
      "1º Lugar — 1º Hackathon da FATEC Itaquera (Setembro 2026)",
      "https://lnkd.in/p/dfZhxJFH",
      {
        email: "jhon.d.q.mamani@gmail.com",
        phone: "(11) 91514-1036",
        linkedinUrl: "https://www.linkedin.com/in/jhon-deyvid-5077642b9",
        linkedinHandle: "Jhon Deyvid",
        githubUrl: "https://github.com/d-Jhon-b",
        githubHandle: "d-Jhon-b",
        location: "São Paulo, SP, Brasil",
      },
      [
        {
          id: "exp-fatec-estagio",
          role: "Estagiário Desenvolvedor Full-Stack",
          company: "FATEC Itaquera",
          type: "Estágio Interno",
          period: "Fevereiro 2026 - Agosto 2026",
          achievements: [
            "Atuação na equipe de desenvolvimento do 'App Carteirinha Digital', trabalhando em toda a stack (React PWA, TypeScript e Node.js).",
            "Resolução de problemas de backend utilizando o framework Next.js para estruturar e implementar a API REST.",
            "Criação de scripts em Python para leitura e parsing estruturado de dados em PDFs, automatizando a aprovação do status estudantil.",
          ],
          techUsed: ["React PWA", "TypeScript", "Next.js", "Node.js", "Python", "REST API"],
        },
      ],
      [
        {
          id: "edu-fatec-dsm",
          degree: "Tecnólogo em Desenvolvimento de Software Multiplataforma",
          institution: "FATEC Itaquera",
          location: "São Paulo, SP",
          period: "Previsão: Dezembro/2027",
          status: "Cursando (5º Semestre)",
        },
        {
          id: "edu-etec-ads",
          degree: "Técnico em Análise e Desenvolvimento de Sistemas",
          institution: "ETEC Albert Einstein",
          location: "São Paulo, SP",
          period: "Concluído em 2024",
          status: "Concluído",
        },
      ],
      [
        {
          id: "skills-languages-frameworks",
          title: "Linguagens & Frameworks",
          description:
            "Construção de aplicações Full-Stack tipadas, APIs RESTful escaláveis e interfaces reativas modernas.",
          skills: [
            "Python",
            "TypeScript",
            "JavaScript",
            "React 19",
            "Next.js",
            "FastAPI",
            "Node.js",
            "Tailwind CSS v4",
          ],
        },
        {
          id: "skills-cloud-devops",
          title: "Banco de Dados, Cloud & DevOps",
          description:
            "Persistência NoSQL orientada a documentos, containerização de ambientes e automação de CI/CD.",
          skills: [
            "Firebase (BaaS)",
            "Firestore (NoSQL)",
            "Docker",
            "Nginx",
            "Git & GitHub",
            "GitHub Actions (CI/CD)",
            "DDD & Clean Architecture",
          ],
        },
        {
          id: "skills-ai-data",
          title: "IA, LLMs & Engenharia de Dados",
          description:
            "Automação inteligente, ingestão e extração estruturada de documentos (PDFs/Textos Normativos).",
          skills: [
            "IA & LLMs",
            "Ingestão & Estruturação de Dados",
            "Automação em Python",
            "LangChain & LlamaIndex",
            "Bancos de Dados Vetoriais",
            "Engenharia de Prompts",
          ],
        },
      ],
    );
  }
}
