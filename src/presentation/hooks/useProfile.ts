import { useEffect, useState } from "react";
import { GetProfileUseCase } from "../../application/use-cases/get-profile-use-case";
import type { Profile } from "../../domain/entities/profile";
import { ProfileRepository } from "../../infrastructure/repositories/profile-repository";

const profileRepository = new ProfileRepository();
const getProfileUseCase = new GetProfileUseCase(profileRepository);

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getProfileUseCase
      .execute()
      .then((data) => {
        if (active) {
          setProfile(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Erro ao carregar perfil.");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { profile, loading, error };
}
