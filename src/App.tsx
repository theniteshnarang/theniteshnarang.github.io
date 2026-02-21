import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Terminal,
  MapPin,
  FileText,
  Download,
  MessageCircle,
  Zap,
  Layout,
  TrendingUp,
  BookOpen,
  ExternalLink,
} from "lucide-react";

// --- PERSONAL DATA FROM RESUME ---
const PERSONAL_INFO = {
  name: "Nitesh Narang",
  title: "Product Engineer → Founder's Office",
  tagline:
    "I've shipped products used by 10k+ users. Now I want to know why they stayed — and what made them pay.",
  about:
    "After 4+ years of building scalable SaaS products as a software engineer, I'm now stepping into a Founder's Office role — bringing an engineer's rigour to business strategy, growth, and operations. I've led frontend architecture for platforms serving thousands of users across healthcare and EdTech, and am now channelling that systems-thinking into how products are built, positioned, and grown. I thrive at the intersection of technical depth and business outcomes — translating between what's possible and what's profitable.",
  email: "narangnitesh@ymail.com",
  phone: "9106857146",
  whatsapp: "https://wa.me/919106857146",
  location: "Ahmedabad, India",
  github: "https://github.com/theniteshnarang",
  linkedin: "https://linkedin.com/in/theniteshnarang",
  photo: "./niteshprofile.png",
  resumeLink: "./Nitesh Narang Resume.pdf", // Placeholder path to the file
};

const HIGHLIGHTS = [
  { label: "Product Thinking", icon: <Layout size={14} /> },
  { label: "Business Strategy", icon: <TrendingUp size={14} /> },
  { label: "Technical Depth", icon: <Zap size={14} /> },
];

const TECH_SKILLS = [
  "React / Next.js",
  "Node.js / NestJS",
  "TypeScript",
  "MongoDB / MySQL",
  "REST APIs",
  "Firebase",
];

const PRODUCT_SKILLS = [
  "Product Scoping",
  "GTM Strategy",
  "Systems Thinking",
  "User Research",
  "Analytics & Metrics",
  "Sales Enablement",
];

const EXPERIENCE = [
  {
    company: "Independent",
    role: "Product Builder & Founder's Office Candidate",
    period: "Oct 2025 - Present",
    points: [
      "Spent extensive time in R&D across product domains — a deliberate deep-dive that sharpened product intuition but reinforced the need to ship over research.",
      <>
        Currently building AutoDraft
        <a
          href="https://auto-draft-product-page.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex ml-1 opacity-60 hover:opacity-100 transition-opacity text-blue-400"
        >
          <ExternalLink size={13} className="inline mb-0.5" />
        </a>{" "}
        — a product for advocates to streamline legal drafting workflows.
      </>,
      "Exploring multiple product ideas at the ideation stage, validating problem spaces across legal-tech, productivity, and SaaS.",
      "Actively pursuing Founder's Office roles to apply this product-building mindset within a high-growth startup.",
    ],
  },
  {
    company: "Asika AI (Contract)",
    fmr: "Novocuris",
    link: "https://www.asika.ai/",
    role: "Frontend Architect",
    period: "Mar 2025 - Sep 2025",
    points: [
      "Owned the full product lifecycle of a healthcare dashboard — from scoping to delivery — serving 2500+ patients across 30+ countries.",
      "Drove white-labeling strategy, enabling faster enterprise client onboarding across multiple geographies.",
      "Cut UI development time by 50% through modular architecture, directly accelerating the sales cycle for new white-label clients.",
    ],
  },
  {
    company: "Crework Labs (Contract)",
    link: "https://www.creworklabs.com",
    role: "Full Stack Engineer",
    period: "Oct 2024 - Feb 2025",
    points: [
      "Owned the build of SaaS email outreach modules used by 500+ users from day one.",
      "Engineered secure Gmail consent and authentication flows, reducing onboarding friction for new users.",
      "Designed and shipped Campaign REST APIs, cutting manual client setup time by 50%.",
    ],
  },
  {
    company: "Alyve Health",
    link: "https://www.alyve.health/",
    role: "Frontend Engineer",
    period: "Nov 2021 - Apr 2024",
    points: [
      "Owned the frontend for App 2.0 (10k+ users) and the Admin Dashboard serving 100+ enterprise clients.",
      "Independently architected and shipped Diagnostic & Reimbursement modules with zero post-launch regressions.",
      "Automated endorsement and order workflows, improving operational speed by 25–30% and freeing team bandwidth.",
      "Integrated health SDKs, improving analytics accuracy by 20% and directly informing product decisions.",
    ],
  },
  {
    company: "Neog.camp",
    link: "https://neog.camp/",
    role: "Teaching Assistant",
    period: "Feb 2021 - Aug 2021",
    points: [
      "Managed a 17-person cohort, owning delivery pipeline and improving throughput by 10%.",
    ],
  },
  {
    company: "OpenEduCat",
    fmr: "Tech-Receptives Solutions",
    link: "https://openeducat.org/",
    role: "Intern Application Engineer",
    period: "Nov 2020 - Mar 2021",
    points: [
      "Built wishlist and cart modules, contributing directly to user engagement.",
      "Optimised dynamic product pages, boosting page views by 30%.",
    ],
  },
];

// const CASE_STUDIES = [
//   {
//     title: "Scaling a Healthcare Dashboard Across 30+ Countries",
//     company: "Novocuris",
//     period: "Mar 2025 – Sep 2025",
//     problem:
//       "A growing healthtech platform needed a multi-tenant admin dashboard that could be white-labeled for enterprise clients across 30+ countries — with zero per-client engineering re-work.",
//     decision:
//       "I proposed and owned a white-labeling architecture using config-driven theming and role-based access controls. Rather than building per-client, we built once and deployed everywhere.",
//     outcome:
//       "Served 2500+ patients across 30+ countries. Reduced UI development time by 50%. Achieved 90% Core Web Vitals. Enterprise client onboarding shrunk from weeks to days.",
//     tags: [
//       "Product Architecture",
//       "White-labeling",
//       "Healthcare",
//       "Enterprise SaaS",
//     ],
//   },
// ];

const NavLink = ({
  id,
  label,
  activeSection,
  scrollToSection,
}: {
  id: string;
  label: string;
  activeSection: string;
  scrollToSection: (id: string) => void;
}) => (
  <button
    onClick={() => scrollToSection(id)}
    className={`text-sm font-medium transition-colors hover:text-blue-400 ${
      activeSection === id ? "text-blue-400" : "text-slate-400"
    }`}
  >
    {label}
  </button>
);

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/90 backdrop-blur-md shadow-lg py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <Terminal size={24} className="text-blue-400" />
            <span>{PERSONAL_INFO.name}</span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8">
              <NavLink
                id="about"
                label="About"
                activeSection={activeSection}
                scrollToSection={scrollToSection}
              />
              <NavLink
                id="experience"
                label="Experience"
                activeSection={activeSection}
                scrollToSection={scrollToSection}
              />
              <NavLink
                id="casestudies"
                label="Case Studies"
                activeSection={activeSection}
                scrollToSection={scrollToSection}
              />
              <NavLink
                id="contact"
                label="Contact"
                activeSection={activeSection}
                scrollToSection={scrollToSection}
              />
            </div>

            <a
              href={PERSONAL_INFO.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-400 border border-blue-400 rounded hover:bg-blue-400/10 transition-colors"
            >
              <FileText size={16} />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-start pt-20 max-w-6xl mx-auto px-6"
      >
        <div className="space-y-6 max-w-3xl animate-fade-in-up">
          <p className="text-blue-400 font-mono mb-4">Hi, my name is</p>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-100 tracking-tight">
            {PERSONAL_INFO.name}.
          </h1>
          <h2 className="text-4xl md:text-nowrap md:text-6xl font-bold text-slate-400 tracking-tight">
            {PERSONAL_INFO.title}.
          </h2>
          <p className="text-lg md:text-nowrap text-slate-400 max-w-xl leading-relaxed">
            {PERSONAL_INFO.tagline}
          </p>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => scrollToSection("experience")}
              className="px-6 py-3 border border-blue-400 text-blue-400 rounded hover:bg-blue-400/10 transition-colors font-medium"
            >
              Check out my work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium border border-transparent"
            >
              Get in Touch
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-xl">01.</span> About
            Me
          </h2>
          <div className="h-px bg-slate-700 grow max-w-xs"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-2 space-y-6">
            <div className="text-slate-400 text-lg leading-relaxed">
              <p>{PERSONAL_INFO.about}</p>
            </div>

            {/* Highlights Grid */}
            <div className="flex flex-wrap gap-3">
              {HIGHLIGHTS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-3 py-1.5 rounded-full text-blue-300 text-sm"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-sm pt-2">
              <MapPin size={14} className="text-blue-400" />
              <span>{PERSONAL_INFO.location}</span>
            </div>

            <div className="pt-4 space-y-6">
              <div>
                <p className="font-medium text-slate-200 mb-3">Technical:</p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm font-mono text-slate-400">
                  {TECH_SKILLS.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-blue-400">▹</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-slate-200 mb-3">
                  Product &amp; Business:
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm font-mono text-slate-400">
                  {PRODUCT_SKILLS.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-emerald-400">▹</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Photo Container */}
          <div className="sticky group mx-auto w-64 md:w-full max-w-xs top-24">
            <div className="absolute inset-0 bg-blue-400 rounded-lg translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-800 aspect-square shadow-xl">
              <img
                src={PERSONAL_INFO.photo}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-top transition-all duration-500 ease-in-out cursor-pointer"
              />
              <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-24 max-w-4xl mx-auto px-6 bg-slate-800/30 rounded-3xl my-10"
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-xl">02.</span> Where
            I've Worked
          </h2>
          <div className="h-px bg-slate-700 grow max-w-xs"></div>
        </div>

        <div className="space-y-8">
          {EXPERIENCE.map((job, idx) => (
            <div
              key={idx}
              className="relative pl-8 border-l border-slate-700 hover:border-blue-400 transition-colors"
            >
              <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-900"></span>
              <h3 className="text-xl font-bold text-slate-100">
                {job.role}{" "}
                <span className="text-blue-400">
                  @ {job.company}
                  {job.link && (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex ml-1 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink size={13} className="inline mb-0.5" />
                    </a>
                  )}
                </span>
                {job.fmr && (
                  <span className="text-xs text-slate-500 font-normal ml-2">
                    fmr. {job.fmr}
                  </span>
                )}
              </h3>
              <p className="font-mono text-sm text-slate-500 mb-4">
                {job.period}
              </p>

              <ul className="list-disc list-outside ml-4 space-y-2 text-slate-400 max-w-2xl">
                {job.points.map((point, i) => (
                  <li key={i} className="pl-2 leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="casestudies" className="py-24 max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-xl">03.</span> Case
            Studies
          </h2>
          <div className="h-px bg-slate-700 grow max-w-xs"></div>
        </div>

        <div className="flex flex-col items-center justify-center py-20 gap-4 border border-dashed border-slate-700 rounded-2xl bg-slate-800/20">
          <BookOpen size={36} className="text-slate-600" />
          <p className="text-xl font-semibold text-slate-300">Coming Soon</p>
          <p className="text-slate-500 text-sm text-center max-w-sm">
            I'm documenting key product decisions, trade-offs, and outcomes from
            my work. Check back soon.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 max-w-3xl mx-auto px-6 text-center"
      >
        <p className="text-blue-400 font-mono mb-4">04. What's Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
          Get In Touch
        </h2>
        <p className="text-slate-400 text-lg mb-12 leading-relaxed">
          If you're building something ambitious and need someone who can own
          the gap between product, engineering, and growth — let's talk.
        </p>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Mail size={24} />
          </a>
          {/* <a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-green-500 transition-colors"
          >
            <MessageCircle size={24} />
          </a> */}
        </div>

        <div className="flex flex-col items-center gap-4">
          <a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-green-500 text-green-400 rounded hover:bg-green-500/10 transition-colors font-medium text-lg"
          >
            <MessageCircle size={20} />
            DM on WhatsApp
          </a>

          <a
            href={PERSONAL_INFO.resumeLink}
            download
            className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors text-sm"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>
      </section>

      <footer className="py-6 text-center text-slate-500 text-sm font-mono">
        <p>Built by {PERSONAL_INFO.name} with ❤️</p>
      </footer>
    </div>
  );
}
