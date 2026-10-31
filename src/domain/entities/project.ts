export class Project {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly techStack: string[],
    public readonly repoUrl: string,
    public readonly liveUrl: string | undefined,
    public readonly stars: number,
    public readonly badge?: string,
    public readonly period?: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id || this.id.trim() === "") {
      throw new Error("O projeto deve possuir um ID válido.");
    }
    if (!this.title || this.title.trim() === "") {
      throw new Error("O projeto precisa de um título.");
    }
    if (!this.description || this.description.trim().length < 10) {
      throw new Error("A descrição deve ter no mínimo 10 caracteres.");
    }
  }

  get isHighLight(): boolean {
    return this.stars > 10 || Boolean(this.badge);
  }

  get formatedTechStacks(): string {
    return this.techStack.join(" • ");
  }
}
