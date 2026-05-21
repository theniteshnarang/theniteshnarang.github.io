import { useState } from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectCarousel, {
  type CarouselSlide,
} from "../components/ProjectCarousel";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  slides: CarouselSlide[];
}

const PROJECTS: Project[] = [
  {
    title: "Healthcare Dashboard",
    description:
      "Healthcare management platform used by 2,500+ patients across countries. I designed the UI and built the white-label system that helped close enterprise deals.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    slides: [
      {
        image: "/Healthcare Dashboard/Home Dashboard.png",
        label: "Dashboard",
        need: [
          "Patient records split across three systems. Staff logged into each one separately.",
          "One mistyped phone number and reminders bounced silently for weeks.",
          "Everyone shared the same screen — receptionists, doctors, lab techs. Zero access control.",
        ],
        impact: [
          "Single dashboard. 2,500+ patients across countries.",
          "Shared components cut deployment from weeks to days. Sales demoed the real product.",
          "Role-based views. Doctors saw their queue. Admins managed operations.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Appointment Page.png",
        label: "Appointments",
        need: [
          "Patient in Dubai. Doctor in London. Timezone gap went unnoticed until the no-show.",
          "Staff spent mornings on WhatsApp confirming who's coming in. Across countries.",
          "Reminders hit inboxes at 3 AM. International patients missed at twice the rate.",
        ],
        impact: [
          "Timezone-aware scheduling caught conflicts before they became missed appointments.",
          "Local-time reminders. No-shows dropped within the first month.",
          "Staff reclaimed hours. That time went to patients, not calendars.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Patients.png",
        label: "Patients",
        need: [
          "Three screens to find one patient. Filters didn't cross locations.",
          "Pending labs and overdue follow-ups looked identical to healthy patients in the list. No triage signals.",
          "Language, timezone, insurance — buried in a notes field nobody read.",
        ],
        impact: [
          "Search and filter across all patients and locations. Under a second.",
          "Status badges and priority flags. Front desk triaged without digging through files.",
          "International details surfaced in the row. Fewer errors, fewer confused patients.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Patients edit.png",
        label: "Patients Edit",
        need: [
          "Editing a record meant switching systems. Same data, typed twice.",
          "Mistyped phone number. Bounced reminder. Patient never heard back.",
          "Nurse changed a dosage. Doctor couldn't tell if it was a mistake or intentional.",
        ],
        impact: [
          "Inline editing. No second system. No double entry.",
          "Validation on input. Bounced reminders near zero.",
          "Every change logged — who, what, when. Compliance without IT tickets.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Admin Staff Page.png",
        label: "Admin Staff",
        need: [
          "Enterprise buyers asked: can we brand this as ours? Generic dashboard lost deals.",
          "Each white-label client: weeks of custom UI. Sales couldn't promise delivery dates.",
          "Hardcoded configs for staff roles, doctors, hospitals. Didn't scale past two clients.",
        ],
        impact: [
          "White-label theming. Same codebase, different brand. Weeks to days.",
          "Component library halved per-client effort. Sales hit their delivery promises.",
          "One portal. Multi-tenant. Configurable per client without touching code.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Our Doctors.png",
        label: "Our Doctors",
        need: [
          "Doctor info in spreadsheets. Credentials, departments, branches — each in a different file.",
          "Patient wants a dermatologist at Downtown. Calls front desk. Front desk calls around.",
          "Doctor worked at two branches. Nobody tracked which days. Double-bookings, weekly.",
        ],
        impact: [
          "One directory. Every doctor, department, branch. Searchable.",
          "Patients self-served specialist lookups. Front desk calls dropped.",
          "Branch-aware scheduling. Conflicts stopped.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Special Offers.png",
        label: "Special Offers",
        need: [
          "Health camps announced via posters in the waiting room. No way to reach the right patients.",
          "Patients came once, never returned. No follow-up nudges.",
          "Diabetes campaign blasted to everyone. Non-diabetics deleted it. Diabetics never saw it.",
        ],
        impact: [
          "Segmented by diagnosis, age, visit history. Offers hit the right patients.",
          "Automated follow-ups. Retention climbed. Staff didn't lift a finger.",
          "Right patient, right offer, right time.",
        ],
      },
    ],
  },
];

export default function Portfolio() {
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState(0);

  const project = PROJECTS[activeProject];

  return (
    <div className="min-h-dvh bg-bg text-text-primary selection:bg-[#e6f263]/30">
      <main className="min-h-dvh flex flex-col items-center px-4 py-6 sm:py-8 md:py-10">
        <div className="w-full max-w-5xl flex flex-col gap-4 sm:gap-5">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-full bg-surface border border-border text-text-muted hover:text-accent hover:border-card-hover-border transition-all duration-300"
              aria-label="Back to home"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-heading">
                Portfolio
              </h1>
              <p className="mt-0.5 text-sm sm:text-base text-text-secondary">
                Products I've shipped<span className="text-accent">.</span>
              </p>
            </div>
          </div>

          {/* Project tabs */}
          <div className="flex flex-wrap gap-1.5">
            {PROJECTS.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setActiveProject(i)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  i === activeProject
                    ? "bg-accent text-bg"
                    : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-card-hover-border"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Carousel */}
          <section className="bg-surface border border-border rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-text-heading">
                  {project.title}
                </h2>
                <p className="text-sm text-text-secondary mt-1 max-w-2xl">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub`}
                    className="p-2 rounded-full bg-bg border border-border text-text-muted hover:text-accent hover:border-card-hover-border transition-all"
                  >
                    <Github size={16} />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live site`}
                    className="p-2 rounded-full bg-bg border border-border text-text-muted hover:text-accent hover:border-card-hover-border transition-all"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            <ProjectCarousel slides={project.slides} />

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] sm:text-xs text-text-chip bg-chip rounded leading-snug"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* All projects quick list */}
          <section className="mt-2">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
              All Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.title}
                  onClick={() => setActiveProject(i)}
                  className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                    i === activeProject
                      ? "bg-surface border-accent/40 shadow-sm"
                      : "bg-surface border-border hover:border-card-hover-border hover:bg-surface-hover"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-text-heading">
                      {p.title}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {p.slides.length} slides
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                    {p.description}
                  </p>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
