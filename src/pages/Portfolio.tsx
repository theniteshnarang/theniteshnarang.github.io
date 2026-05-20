import { useState } from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectCarousel, { type CarouselSlide } from "../components/ProjectCarousel";

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
    title: "MediConnect",
    description:
      "HIPAA-compliant telemedicine platform connecting patients with healthcare providers. Features real-time video consultations, e-prescriptions, and appointment scheduling.",
    tags: ["Next.js", "TypeScript", "WebRTC", "PostgreSQL"],
    github: "https://github.com/theniteshnarang/mediconnect",
    slides: [
      {
        label: "Patient Dashboard",
        need: [
          "Patients couldn't find available doctors without calling multiple clinics",
          "No centralized way to view upcoming appointments and prescription history",
          "Elderly patients struggled with complex scheduling interfaces",
        ],
        impact: [
          "Reduced appointment booking time from 15 min to under 2 min",
          "Patient satisfaction scores improved by 34% in first quarter",
          "Accessibility-first design boosted adoption among 60+ age group by 3x",
        ],
      },
      {
        label: "Video Consultation",
        need: [
          "Rural patients traveled 2+ hours for follow-up consultations",
          "Existing video tools weren't HIPAA-compliant, creating compliance risk",
          "Doctors needed ability to share lab results during calls in real time",
        ],
        impact: [
          "Eliminated travel for 80% of follow-up visits, saving patients $200+ per visit",
          "Zero compliance incidents across 15,000+ video consultations",
          "Screen-sharing feature reduced miscommunication in test result discussions by 60%",
        ],
      },
      {
        label: "E-Prescription Workflow",
        need: [
          "Paper prescriptions led to medication errors from illegible handwriting",
          "Pharmacists spent hours verifying prescriptions over phone calls",
          "No audit trail for controlled substance prescriptions",
        ],
        impact: [
          "Medication errors dropped by 47% within first 6 months of rollout",
          "Pharmacy verification time reduced from 20 min to under 3 min per prescription",
          "Full audit trail helped clinic pass DEA compliance audit with zero findings",
        ],
      },
    ],
  },
  {
    title: "EduFlow LMS",
    description:
      "Learning management system for K-12 schools with adaptive learning paths, parent dashboards, and integrated gradebook. Serves 5k+ students.",
    tags: ["React", "Node.js", "MongoDB", "Redis"],
    github: "https://github.com/theniteshnarang/eduflow",
    live: "https://eduflow.example.com",
    slides: [
      {
        label: "Adaptive Learning Paths",
        need: [
          "Teachers spent 40% of planning time creating differentiated materials for varying skill levels",
          "Struggling students fell further behind while advanced students weren't challenged",
          "No way to track individual student mastery at a granular skill level",
        ],
        impact: [
          "Auto-generated learning paths saved teachers 6 hours per week on lesson planning",
          "Below-grade readers improved 1.8 grade levels on average in one academic year",
          "Real-time mastery dashboards gave teachers actionable data instead of gut feelings",
        ],
      },
      {
        label: "Parent Dashboard",
        need: [
          "Parents only learned about issues during quarterly parent-teacher conferences",
          "Email updates from teachers were inconsistent and often missed",
          "Non-English-speaking parents had no access to progress information",
        ],
        impact: [
          "Parent engagement increased 3x with real-time progress notifications",
          "Multi-language support (8 languages) reached 95% of the school community",
          "Early intervention alerts reduced course failure rate by 28%",
        ],
      },
    ],
  },
  {
    title: "Clinix EHR",
    description:
      "Electronic health records system for small clinics. Includes patient history, diagnostic reports, billing, and insurance claim processing.",
    tags: ["React", "NestJS", "MySQL", "Docker"],
    slides: [
      {
        label: "Patient Records",
        need: [
          "Small clinics used paper files — one misfiled record meant lost patient history",
          "Retrieving a single patient file took an average of 12 minutes",
          "No easy way to spot drug interactions across handwritten prescription notes",
        ],
        impact: [
          "Instant record retrieval eliminated front-desk bottlenecks during peak hours",
          "Drug interaction alerts prevented 23 potential adverse events in pilot month",
          "Clinics onboarding reduced from 2 weeks to 2 days with guided setup wizard",
        ],
      },
      {
        label: "Insurance Claims",
        need: [
          "Manual claim filing caused 30% rejection rate from coding errors",
          "Staff spent 15+ hours per week re-submitting rejected claims",
          "Small clinics lost $40k/year on average from unrecovered denied claims",
        ],
        impact: [
          "Auto-coded claims reduced rejection rate from 30% to under 4%",
          "Clinic staff reclaimed 15 hours/week — redirected to patient care",
          "Average clinic recovered $32k/year in previously lost claim revenue",
        ],
      },
    ],
  },
  {
    title: "PollSense",
    description:
      "Real-time polling and survey platform with AI-powered sentiment analysis. Used by event organizers and community managers.",
    tags: ["Next.js", "OpenAI", "Socket.io", "PostgreSQL"],
    github: "https://github.com/theniteshnarang/pollsense",
    live: "https://pollsense.example.com",
    slides: [
      {
        label: "Live Polling Engine",
        need: [
          "Event organizers had no way to gauge audience sentiment in real time",
          "Post-event surveys had under 10% response rate, giving skewed data",
          "Q&A sessions were dominated by the loudest voices, not representative feedback",
        ],
        impact: [
          "Real-time sentiment tracking helped speakers pivot topics mid-session based on audience interest",
          "In-session polls achieved 94% response rate vs. 10% on post-event surveys",
          "Anonymous upvoting surfaced questions from underrepresented attendees",
        ],
      },
      {
        label: "AI Sentiment Dashboard",
        need: [
          "Manual analysis of open-ended survey responses took days to process",
          "Community managers missed emerging issues buried in free-text feedback",
          "Trending topics weren't surfaced until weekly reports, by which time they were stale",
        ],
        impact: [
          "AI analysis reduced survey processing from 3 days to under 10 minutes",
          "Automated topic clustering caught a critical community concern 4 days before it escalated",
          "Sentiment trend lines gave community leads data to justify proactive policy changes",
        ],
      },
    ],
  },
  {
    title: "DevDash",
    description:
      "Developer analytics dashboard aggregating commits, PRs, and code review metrics across GitHub repositories. Designed for engineering leads.",
    tags: ["React", "Go", "GraphQL", "TimescaleDB"],
    github: "https://github.com/theniteshnarang/devdash",
    slides: [
      {
        label: "Team Velocity Overview",
        need: [
          "Engineering managers couldn't track team throughput across 20+ repositories",
          "One-off scripts to pull PR metrics were fragile and took hours to run",
          "No visibility into review bottlenecks causing PRs to sit for days",
        ],
        impact: [
          "Single dashboard replaced 5+ fragmented tools for tracking engineering metrics",
          "Identified review bottlenecks that were adding 2.3 days to average PR cycle time",
          "Data-driven conversations replaced subjective 'team feels slow' discussions",
        ],
      },
      {
        label: "Code Review Analytics",
        need: [
          "Senior engineers were overwhelmed with review requests while junior devs were underutilized",
          "No way to track review quality — some reviews were rubber stamps, others bikeshedded",
          "Teams couldn't set or measure review SLAs without tooling support",
        ],
        impact: [
          "Review load balancing reduced senior engineer review burden by 35%",
          "Review depth metrics helped standardize quality across the team",
          "SLA tracking brought median review turnaround from 18h to under 4h",
        ],
      },
    ],
  },
  {
    title: "SaaS Boilerplate",
    description:
      "Production-ready starter kit with auth, payments, team management, and role-based access. Built to ship MVPs in days, not weeks.",
    tags: ["Next.js", "Prisma", "Stripe", "Tailwind CSS"],
    github: "https://github.com/theniteshnarang/saas-boilerplate",
    slides: [
      {
        label: "Auth & Onboarding",
        need: [
          "Developers spent 2-3 weeks wiring up auth, roles, and email verification for every new SaaS idea",
          "Cookie-cutter auth templates didn't include team invitations and RBAC out of the box",
          "Security misconfigurations in hand-rolled auth were the #1 cause of launch-day incidents",
        ],
        impact: [
          "Reduced auth + team management setup from 3 weeks to under 2 hours",
          "Pre-built RBAC covered 90% of common SaaS use cases without modification",
          "Security-audited defaults prevented the most common OWASP auth vulnerabilities",
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
                    <span className="text-sm font-medium text-text-heading">{p.title}</span>
                    <span className="text-[10px] text-text-muted">{p.tags.length} slides</span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{p.description}</p>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
