import type { GithubRepoPayload } from "../../@types/portfolio";

export class GithubHttpClient {
  private readonly baseUrl = "https://api.github.com";

  async fetchUserRepos(username: string): Promise<GithubRepoPayload[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
        },
      );

      if (!response.ok) {
        return [];
      }

      const data = (await response.json()) as GithubRepoPayload[];
      return Array.isArray(data) ? data.filter((repo) => !repo.fork) : [];
    } catch {
      return [];
    }
  }
}
