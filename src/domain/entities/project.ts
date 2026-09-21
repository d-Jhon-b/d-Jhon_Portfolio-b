export class Project {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly techStack: string[],
    public readonly repoUrl: string,
    public readonly stars: number,
  ) {
    this.validate();
  }
  private validate(): void {
    if (!this.id || this.id.trim() === "") throw new Error("O projeto deve possuir um ID válido.");
    if (!this.title || this.title.trim() === "") throw new Error("O projeto precisa de um titulo");
    if (!this.description || this.description.trim() === "")
      throw new Error("A descrição deve ter no mínimo 10 char");
  }
  get isHighLight(): boolean {
    return this.stars > 10;
  }
  get formatedTechStacks(): string {
    return this.techStack.join("•");
  }
}
