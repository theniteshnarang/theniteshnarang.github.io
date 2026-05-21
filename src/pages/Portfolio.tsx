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
      "End-to-end healthcare management platform serving 2,500+ patients across 30+ countries. Owned the full product lifecycle — from scoping to delivery — with white-labeling strategy that accelerated enterprise client onboarding.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    slides: [
      {
        image: "/Healthcare Dashboard/Home Dashboard.png",
        label: "Dashboard",
        need: [
          "Clinics serving international patients had fragmented records across disparate systems with no unified view",
          "Manual patient data entry and retrieval caused errors and delayed care delivery across time zones",
          "No role-based access control meant admin staff, doctors, and nurses all shared the same unrestricted view",
        ],
        impact: [
          "Centralized 2,500+ patient records with real-time access across 30+ countries",
          "Modular architecture cut UI development time by 50%, directly accelerating the sales cycle",
          "RBAC ensured each role saw only what they needed, improving data privacy and workflow focus",
        ],
      },
      {
        image: "/Healthcare Dashboard/Appointment Page.png",
        label: "Appointments",
        need: [
          "Cross-border appointment booking was chaotic without timezone-aware scheduling across 30+ countries",
          "Clinic staff spent hours manually coordinating doctor availability with patient time zones",
          "High no-show rates from poor reminder systems, especially for international patients",
        ],
        impact: [
          "Timezone-intelligent scheduling eliminated double-bookings across international clinics",
          "Automated reminders reduced patient no-shows significantly within the first quarter",
          "Staff reclaimed hours previously lost to manual appointment coordination",
        ],
      },
      {
        image: "/Healthcare Dashboard/Patients.png",
        label: "Patients",
        need: [
          "Clinic staff toggled between 3+ screens to view, search, and filter patient records across locations",
          "No quick way to identify patients with pending documents, upcoming appointments, or critical flags",
          "International patient data — time zones, languages, insurance — wasn't surfaced in the list view",
        ],
        impact: [
          "Single unified directory gave staff instant search and filter across 2,500+ patients in 30+ countries",
          "Status badges and priority flags helped front desk triage patients at a glance instead of digging through files",
          "Inline international patient indicators reduced scheduling errors caused by timezone mismatches",
        ],
      },
      {
        image: "/Healthcare Dashboard/Patients edit.png",
        label: "Patients Edit",
        need: [
          "Editing a patient record meant jumping to a separate system, breaking staff flow and doubling data entry",
          "No validation on critical fields like phone numbers and emails led to bounced reminders and missed follow-ups",
          "Audit trail was nonexistent — staff couldn't see who changed what or when on a patient profile",
        ],
        impact: [
          "Inline editing within the same dashboard kept staff in flow and cut data entry time in half",
          "Field-level validation eliminated bounced patient communications caused by malformed contact data",
          "Full edit audit trail gave clinic admins visibility into every change for compliance and accountability",
        ],
      },
      {
        image: "/Healthcare Dashboard/Admin Staff Page.png",
        label: "Admin Staff",
        need: [
          "Enterprise clients each needed a branded experience — a one-size-fits-all dashboard wouldn't close deals",
          "Onboarding a new white-label client required weeks of custom UI development per deployment",
          "Each client had unique configurations for staff roles, doctor directories, and hospital networks",
        ],
        impact: [
          "White-labeling strategy cut enterprise onboarding from weeks to days across multiple geographies",
          "Modular component architecture reduced per-client UI customization effort by 50%",
          "Multi-tenant admin portal managed staff, doctors, and hospitals under a single configurable system",
        ],
      },
      {
        image: "/Healthcare Dashboard/Our Doctors.png",
        label: "Our Doctors",
        need: [
          "Doctor-directory data was scattered across spreadsheets with no centralized way to manage credentials, departments, and branch assignments",
          "Patients couldn't find specialists by department or location — they called the front desk for basic lookups",
          "No way to track doctor availability across branches, causing double-bookings and frustrated walk-ins",
        ],
        impact: [
          "Centralized doctor directory with department, branch, and contact data accessible from a single screen",
          "Patients could self-serve specialist lookups by department, reducing front-desk call volume",
          "Branch-aware doctor assignments eliminated scheduling conflicts across multi-location clinics",
        ],
      },
      {
        image: "/Healthcare Dashboard/Special Offers.png",
        label: "Special Offers",
        need: [
          "Clinics had no way to push targeted health offers or campaigns to specific patient segments",
          "Patient retention was purely reactive — no proactive outreach for follow-ups or preventive care",
          "Special offers and health programs weren't reaching the right patients at the right time",
        ],
        impact: [
          "Targeted offer engine enabled clinics to run data-driven patient engagement campaigns",
          "Proactive health reminders improved patient retention and follow-up visit adherence",
          "Segmented outreach ensured relevant offers reached the right patient demographics",
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
                      {p.tags.length} slides
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
