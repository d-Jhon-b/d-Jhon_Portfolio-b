export class Project {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly techStack: string[],
    public readonly repoUrl: string,
    public readonly stars: number,
  ) {
    if (!title) throw new Error("O projeto precisa de um titulo");
  }

  get isPopular(): boolean {
    return this.stars > 10;
  }
}
