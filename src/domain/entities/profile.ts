export interface ExperienceProps {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  achievements: string[];
  techUsed: string[];
}

export interface EducationProps {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
}

export interface SkillCategoryProps {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export interface SocialLinksProps {
  email: string;
  phone: string;
  linkedinUrl: string;
  linkedinHandle: string;
  githubUrl: string;
  githubHandle: string;
  location: string;
}

export class Profile {
  constructor(
    public readonly fullName: string,
    public readonly headline: string,
    public readonly summary: string,
    public readonly highlightAward: string,
    public readonly highlightAwardUrl: string,
    public readonly socials: SocialLinksProps,
    public readonly experiences: ExperienceProps[],
    public readonly education: EducationProps[],
    public readonly skillCategories: SkillCategoryProps[],
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.fullName || this.fullName.trim().length < 3) {
      throw new Error("O perfil deve conter o nome completo válido.");
    }
    if (!this.summary || this.summary.trim().length < 20) {
      throw new Error("O resumo profissional deve conter pelo menos 20 caracteres.");
    }
    if (!this.socials.email.includes("@")) {
      throw new Error("O perfil deve conter um e-mail de contato válido.");
    }
  }
}
