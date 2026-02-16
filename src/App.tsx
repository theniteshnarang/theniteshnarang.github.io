import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  GraduationCap,
  ChevronDown,
  Terminal,
  Cpu,
  Globe,
  MapPin,
} from "lucide-react";

// --- PERSONAL DATA FROM RESUME ---
const PERSONAL_INFO = {
  name: "Nitesh Narang",
  title: "Product Engineer | Frontend Architect",
  tagline:
    "Bridging technical depth with business outcomes—driving product decisions from tech to sales.",
  about:
    "I am a Product Engineer based in Ahmedabad, India, with a focus on high-efficiency web apps and scalable SaaS modules. I specialize in architecting complex dashboards, optimizing core web vitals, and leading full-lifecycle development. My experience ranges from healthtech to email outreach platforms, consistently reducing operational costs and improving user engagement through clean, modular code.",
  email: "pnnarang9@gmail.com",
  location: "Ahmedabad, India",
  github: "https://github.com/theniteshnarang",
  linkedin: "https://linkedin.com/in/theniteshnarang",
  // Updated to point to your new local file. Ensure this file is in your public folder.
  photo: "./niteshprofile.png",
};

const SKILLS = [
  "NextJS",
  "ReactJS",
  "TypeScript",
  "Node.js",
  "NestJS",
  "MongoDB",
  "MySQL",
  "Zustand",
  "Redux",
  "Tailwind CSS",
  "Shadcn UI",
  "Firebase",
  "Vercel",
  "Netlify",
  "Git",
];

const EXPERIENCE = [
  {
    company: "Novocuris (Contract)",
    role: "Frontend Architect",
    period: "Mar 2025 - Sep 2025",
    description:
      "Architected an admin dashboard used in 25 overseas hospitals. Led full lifecycle development including white-label theming and patient management. Developed modular components reducing UI dev time by 50% and achieved 90% Core Web Vitals.",
  },
  {
    company: "Crework Labs (Contract)",
    role: "Full Stack Engineer",
    period: "Oct 2024 - Feb 2025",
    description:
      "Delivered core SaaS modules for email outreach to 1,000+ users. Implemented auth and Gmail consent workflows. Developed REST APIs for Campaigns/Investors, reducing manual setup time by 70%.",
  },
  {
    company: "Alyve Health",
    role: "Frontend Engineer",
    period: "Nov 2021 - Apr 2024",
    description:
      "Led frontend for Alyve App 2.0 (10k+ users). Engineered Diagnostic & Reimbursement 2.0 modules using TypeScript. Integrated SDK APIs for real-time vitals, improving analytics accuracy by 20%. Streamlined order management workflows.",
  },
  {
    company: "Neog.camp",
    role: "Teaching Assistant",
    period: "Feb 2021 - Aug 2021",
    description:
      "Led a 17-person team, improving project delivery speed by 10% and increasing member retention by 15%.",
  },
  {
    company: "Tech-Receptives Solutions",
    role: "Intern Application Engineer",
    period: "Nov 2020 - Mar 2021",
    description:
      "Built wishlist and cart modules increasing user engagement. Implemented dynamic product/category pages, boosting page views by 30%.",
  },
];

// --- PROJECT DATA ---
const SCHOOL_PROJECTS = [
  {
    title: "NIT Project 1",
    description:
      "A comprehensive web application developed during university studies. Features responsive design and interactive elements.",
    tags: ["React", "Netlify", "Web Dev"],
    link: "https://nitproject1.netlify.app/",
    color: "bg-blue-500",
  },
  {
    title: "NIT Project 2",
    description:
      "An academic project focusing on frontend performance and accessibility. Deployed for public access.",
    tags: ["JavaScript", "CSS", "Frontend"],
    link: "https://nitproject2.netlify.app/",
    color: "bg-indigo-500",
  },
  {
    title: "NIT Project 3",
    description:
      "A full-stack prototype demonstrating core CRUD operations and state management concepts.",
    tags: ["Node.js", "Database", "API"],
    link: "https://nitproject3.netlify.app/",
    color: "bg-purple-500",
  },
];

const OTHER_PROJECTS = [
  {
    title: "Personal Portfolio V1",
    description:
      "The first iteration of my personal website built with HTML/CSS.",
    tags: ["HTML", "CSS"],
    link: "https://niteshnarang.netlify.app/",
    color: "bg-emerald-500",
  },
];

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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const NavLink = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`text-sm font-medium transition-colors hover:text-blue-400 ${
        activeSection === id ? "text-blue-400" : "text-slate-400"
      }`}
    >
      {label}
    </button>
  );

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
          <div className="hidden md:flex gap-8">
            <NavLink id="about" label="About" />
            <NavLink id="experience" label="Experience" />
            <NavLink id="projects" label="Projects" />
            <NavLink id="contact" label="Contact" />
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
          <h2 className="text-4xl md:text-6xl font-bold text-slate-400 tracking-tight">
            {PERSONAL_INFO.title}.
          </h2>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            {PERSONAL_INFO.tagline}
          </p>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => scrollToSection("projects")}
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
          <div className="h-px bg-slate-700 flex-grow max-w-xs"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-2 space-y-4 text-slate-400 leading-relaxed">
            <p>{PERSONAL_INFO.about}</p>
            <div className="flex items-center gap-2 text-slate-400 pt-2">
              <MapPin size={16} className="text-blue-400" />
              <span>{PERSONAL_INFO.location}</span>
            </div>

            <p className="pt-4 font-medium text-slate-200">
              Here are a few technologies I've been working with:
            </p>
            <ul className="grid grid-cols-2 gap-2 text-sm font-mono mt-2">
              {SKILLS.map((skill, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-blue-400">▹</span> {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Photo Container */}
          <div className="relative group mx-auto w-64 md:w-full max-w-xs">
            {/* Background decorative offset frame */}
            <div className="absolute inset-0 bg-blue-400 rounded-lg translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>

            {/* Image Container */}
            <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-800 aspect-square shadow-xl">
              <img
                src={PERSONAL_INFO.photo}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-500 ease-in-out cursor-pointer"
              />
              {/* Optional overlay for tinting if desired */}
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
          <div className="h-px bg-slate-700 flex-grow max-w-xs"></div>
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
                <span className="text-blue-400">@ {job.company}</span>
              </h3>
              <p className="font-mono text-sm text-slate-500 mb-4">
                {job.period}
              </p>
              <p className="text-slate-400 max-w-2xl">{job.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-xl">03.</span>{" "}
            Projects
          </h2>
          <div className="h-px bg-slate-700 flex-grow max-w-xs"></div>
        </div>

        {/* Category: School Projects */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-slate-200">
              School Time Projects
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOOL_PROJECTS.map((project, idx) => (
              <div
                key={idx}
                className="group bg-slate-800 rounded-lg p-6 hover:-translate-y-2 transition-transform duration-300 border border-slate-700 hover:border-blue-500/50 shadow-xl shadow-black/20"
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`p-3 rounded-full ${project.color} bg-opacity-20 text-blue-300`}
                  >
                    <Code size={20} />
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>

                <h4 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h4>

                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category: Other Projects */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="text-emerald-400" size={24} />
            <h3 className="text-xl font-bold text-slate-200">Other Projects</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OTHER_PROJECTS.map((project, idx) => (
              <div
                key={idx}
                className="group bg-slate-800 rounded-lg p-6 hover:-translate-y-2 transition-transform duration-300 border border-slate-700 hover:border-emerald-500/50 shadow-xl shadow-black/20"
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`p-3 rounded-full ${project.color} bg-opacity-20 text-emerald-300`}
                  >
                    <Globe size={20} />
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <h4 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-slate-400 text-sm mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
          I'm currently looking for new opportunities. Whether you have a
          question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href={PERSONAL_INFO.github}
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
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
        </div>

        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="inline-block px-8 py-4 border border-blue-400 text-blue-400 rounded hover:bg-blue-400/10 transition-colors font-medium text-lg"
        >
          Say Hello
        </a>
      </section>

      <footer className="py-6 text-center text-slate-500 text-sm font-mono">
        <p>Designed & Built by {PERSONAL_INFO.name}</p>
      </footer>
    </div>
  );
}
