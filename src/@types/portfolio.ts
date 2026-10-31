export interface GithubRepoPayload {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  updated_at: string;
}

export interface ContactFormDTO {
  name: string;
  email: string;
  subject: string;
  message: string;
}
