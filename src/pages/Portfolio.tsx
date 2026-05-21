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
          "No single view of daily operations. Staff checked appointments in one place, patient counts in another.",
          "Upcoming schedules scattered across screens. Front desk had no quick way to see who's due in next.",
          "Each hospital wanted the dashboard to feel like their own. A generic UI wouldn't close enterprise deals.",
        ],
        impact: [
          "Stats overview: total appointments, patients, and quick actions in one glance.",
          "Upcoming appointments surfaced front and center. Front desk knew who's next without digging.",
          "White-label theming per hospital — logos, colors, branding. Same dashboard, personalised for each client.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Appointment Page.png",
        label: "Appointments",
        need: [
          "No calendar view across timezones. Booking a patient with different timezones had human conversion errors.",
          "Staff relied on traditional approaches to manage doctor's time.",
          "Doctor availability and appointment details weren't connected. Separate tabs for each.",
        ],
        impact: [
          "Calendar with today, week, and month views. Timezone-aware, one click to book.",
          "Doctor cards surfaced alongside the calendar. Availability, patient details, all in context.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Patients.png",
        label: "Patients",
        need: [
          "Patient records scattered across files. No searchable directory with key details at a glance.",
          "Adding a patient was a multi-step process spread across different forms.",
          "Staff couldn't quickly see which doctor a patient was assigned to or when they last visited.",
        ],
        impact: [
          "Searchable table: name, email, gender, phone, assigned doctor, date — all in one row.",
          "Add patient in one flow. Search finds anyone across all locations instantly.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Patients edit.png",
        label: "Patients Edit",
        need: [
          "Patient context was fragmented. Basic info in one place, medical history in another, appointments somewhere else.",
          "No quick way to see a patient's medical conditions or SOS status during a consult or follow-up.",
          "Documents scattered across folders. Staff couldn't pull up a patient's reports without leaving the screen.",
        ],
        impact: [
          "Full profile in one view: personal info, medical conditions, SOS status, documents.",
          "Appointment summary and history embedded in the patient page. No tab-hopping.",
          "Create appointment CTA right on the profile. One click from viewing to booking.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Admin Staff Page.png",
        label: "Admin Staff",
        need: [
          "Staff records tracked on paper or in a spreadsheet disconnected from the rest of the system.",
          "No way to assign roles. Everyone got the same access regardless of their job.",
          "Contact details, addresses, role info were incomplete or outdated across locations.",
        ],
        impact: [
          "Add staff in one flow. Table shows name, email, role, phone, address at a glance.",
          "Role-based access tied to each staff record. Doctors, nurses, admins saw different views.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Our Doctors.png",
        label: "Our Doctors",
        need: [
          "No centralized doctor directory. Departments, branches, contact info tracked in separate spreadsheets.",
          "Patients called the front desk for basic lookups. Which dermatologists are at the Downtown branch?",
          "No way to filter by department or branch. Staff scrolled through one long list.",
        ],
        impact: [
          "Searchable directory. Filter by department and branch. Name, email, phone in one row.",
          "Patients found specialists on their own. Front desk calls dropped.",
        ],
      },
      {
        image: "/Healthcare Dashboard/Special Offers.png",
        label: "Special Offers",
        need: [
          "No way to create and manage hospital-specific offers. Each branch ran its own promotions with no central tracking.",
          "Offers had no visual component. Text-only announcements got ignored by patients.",
          "Staff couldn't see which offers were active, when they were created, or what was running at each hospital.",
        ],
        impact: [
          "Create offers per hospital. Table tracks name, description, media, and creation date.",
          "Image and video support made offers visible and engaging. Patients noticed.",
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
