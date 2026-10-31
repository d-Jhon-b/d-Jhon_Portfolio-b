import { ContactSection } from "../components/ContactSection";
import { EducationSection } from "../components/EducationSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsAndDevOpsSection } from "../components/SkillsAndDevOpsSection";
import { useProfile } from "../hooks/useProfile";
import { useProjects } from "../hooks/useProjects";

export function HomePage() {
  const { profile, loading: profileLoading, error: profileError } = useProfile();
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
    selectedTech,
    setSelectedTech,
    availableTechs,
  } = useProjects();

  if (profileLoading) {
    return (
      <div className="mx-auto flex min-h-svh max-w-[44rem] items-center px-6 text-sm text-muted">
        Carregando...
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="mx-auto flex min-h-svh max-w-[44rem] items-center px-6 text-sm text-accent">
        {profileError ?? "Erro ao inicializar o perfil."}
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col bg-bg text-ink">
      <Navbar fullName={profile.fullName} socials={profile.socials} />
      <main>
        <HeroSection profile={profile} />
        <ProjectsSection
          projects={projects}
          loading={projectsLoading}
          error={projectsError}
          selectedTech={selectedTech}
          onSelectTech={setSelectedTech}
          availableTechs={availableTechs}
        />
        <ExperienceSection summary={profile.summary} experiences={profile.experiences} />
        <EducationSection education={profile.education} />
        <SkillsAndDevOpsSection skillCategories={profile.skillCategories} />
        <ContactSection socials={profile.socials} />
      </main>
      <Footer fullName={profile.fullName} />
    </div>
  );
}
