import type { GithubRepoPayload } from "../../@types/portfolio";
import { Project } from "../../domain/entities/project";

export class GithubMapper {
  toDomain(raw: GithubRepoPayload): Project {
    const cleanTitle = raw.name.replace(/[-_]+/g, " ").trim();
    const rawDescription = raw.description?.trim() ?? "";
    const validDescription =
      rawDescription.length >= 10
        ? rawDescription
        : `Repositório de engenharia de software (${cleanTitle}) desenvolvido por Jhon Deyvid.`;

    const stackSet = new Set<string>();
    if (raw.language) {
      stackSet.add(raw.language);
    }
    if (Array.isArray(raw.topics)) {
      for (const topic of raw.topics.slice(0, 5)) {
        stackSet.add(topic);
      }
    }
    if (stackSet.size === 0) {
      stackSet.add("Software Engineering");
    }

    const liveUrl = raw.homepage && raw.homepage.trim() !== "" ? raw.homepage.trim() : undefined;

    return new Project(
      String(raw.id),
      cleanTitle,
      validDescription,
      Array.from(stackSet),
      raw.html_url,
      liveUrl,
      raw.stargazers_count ?? 0,
    );
  }
}
