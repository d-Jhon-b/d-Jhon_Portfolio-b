import type { Profile } from "../../domain/entities/profile";
import type { IProfileRepository } from "../../domain/repositories/IProfileRepository";

export class GetProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(): Promise<Profile> {
    return await this.profileRepository.getProfile();
  }
}
