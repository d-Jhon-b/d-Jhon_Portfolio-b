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
      <div className="flex min-h-svh items-center justify-center bg-brand-dark px-6 text-center">
        <div className="space-y-3">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-brand-gold border-t-transparent" />
          <p className="font-mono text-sm text-brand-olive">
            Inicializando camadas de Domínio e Aplicação...
          </p>
        </div>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-brand-dark px-6 text-center text-red-200">
        {profileError ?? "Erro ao inicializar o perfil."}
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col bg-brand-dark text-gray-100">
      <Navbar socials={profile.socials} />
      <main>
        <HeroSection profile={profile} />
        <ExperienceSection experiences={profile.experiences} />
        <ProjectsSection
          projects={projects}
          loading={projectsLoading}
          error={projectsError}
          selectedTech={selectedTech}
          onSelectTech={setSelectedTech}
          availableTechs={availableTechs}
        />
        <SkillsAndDevOpsSection skillCategories={profile.skillCategories} />
        <EducationSection education={profile.education} />
        <ContactSection socials={profile.socials} />
      </main>
      <Footer fullName={profile.fullName} socials={profile.socials} />
    </div>
  );
}
