import { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  MessageCircle,
  FileText,
  ArrowUpRight,
  Sun,
  Moon,
} from "lucide-react";
import "./App.css";

const LINKS = {
  github: "https://github.com/theniteshnarang",
  linkedin: "https://linkedin.com/in/theniteshnarang",
  twitter: "https://x.com/theniteshnarang",
  email: "nitesh@nivyaan.com",
  whatsapp: "https://wa.me/919106857146",
  resume: "./nitesh-resume.pdf",
  photo: "./niteshprofile.png",
};

const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "Tailwind CSS",
  "MongoDB",
  "MySQL",
  "Firebase",
  "REST APIs",
];

const BUSINESS_SKILLS = [
  "Product Scoping",
  "GTM Strategy",
  "Systems Thinking",
  "User Research",
  "Analytics & Metrics",
  "Sales Enablement",
];

const INDUSTRIES = ["Healthcare", "EdTech", "SaaS"];

const SOCIALS = [
  { href: LINKS.github, icon: Github, label: "GitHub" },
  { href: LINKS.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: LINKS.twitter, icon: Twitter, label: "Twitter" },
  { href: `mailto:${LINKS.email}`, icon: Mail, label: "Email" },
  { href: LINKS.whatsapp, icon: MessageCircle, label: "WhatsApp" },
  { href: LINKS.resume, icon: FileText, label: "Resume" },
];

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatItem({ value, label }: { value: number; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <span
        ref={ref}
        className="block text-xl sm:text-2xl md:text-3xl font-bold text-accent animate-count-up"
      >
        {count}+
      </span>
      <span className="text-xs sm:text-sm md:text-base text-text-muted mt-1">
        {label}
      </span>
    </div>
  );
}

function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#0a0a0a" : "#fafafa");
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((prev) => !prev) };
}

export default function App() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-dvh md:h-dvh md:overflow-hidden bg-bg text-text-primary selection:bg-[#e6f263]/30">
      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-center group/theme">
        <button
          onClick={toggle}
          className="p-2 rounded-full bg-surface border border-border text-text-muted hover:text-accent hover:border-card-hover-border transition-all duration-300"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <span className="mt-1 text-[10px] font-medium text-text-muted opacity-0 group-hover/theme:opacity-100 transition-opacity duration-200 group-hover/theme:text-accent">
          {isDark ? "Light mode" : "Dark mode"}
        </span>
      </div>
      {/* Main card layout */}
      <main className="min-h-dvh md:h-dvh flex flex-col items-center justify-center px-4 py-6 sm:py-8 md:py-6">
        <div className="w-full max-w-2xl flex flex-col gap-2 sm:gap-3 md:gap-3">
          {/* Hero — left-aligned with stats top-right */}
          <section className="flex flex-col gap-3 md:flex-row md:justify-between md:items-start">
            <div className="flex flex-col items-start gap-2 sm:gap-3 md:gap-3">
              {/* Profile photo + name row */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="group relative shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-linear-to-br from-[#e6f263] to-[#b8c44e] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60" />
                  <img
                    src={LINKS.photo}
                    alt="Nitesh Narang"
                    className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover object-top border-2 border-border ring-2 ring-transparent transition-all duration-500 group-hover:ring-[#e6f263]/50"
                  />
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-heading">
                    Nitesh Narang
                  </h1>
                  <p className="mt-0.5 text-sm sm:text-base md:text-lg text-text-secondary">
                    Curious by nature
                    <span className="text-accent">.</span> Builder by craft
                    <span className="text-accent">.</span>
                  </p>
                </div>
              </div>

              {/* Stats — visible on mobile only, above socials */}
              <div className="flex gap-6 sm:gap-8 md:hidden self-stretch justify-center">
                <StatItem value={5} label="Years" />
                <StatItem value={10} label="Products" />
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3 sm:gap-4 self-stretch justify-center md:justify-start">
                {SOCIALS.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group/social flex flex-col items-center gap-1 text-text-muted hover:text-accent transition-colors duration-200"
                  >
                    <Icon size={18} className="sm:w-5 sm:h-5" />
                    <span className="text-[9px] sm:text-[10px] opacity-0 group-hover/social:opacity-100 transition-opacity duration-200">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Stats — desktop only, top-right */}
            <div className="hidden md:flex gap-6 sm:gap-8 md:pt-2">
              <StatItem value={5} label="Years" />
              <StatItem value={10} label="Products" />
            </div>
          </section>

          {/* Bento Grid */}
          <section className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-3">
            {/* About card */}
            <div className="col-span-2 md:col-span-2 bg-surface border border-border rounded-xl md:rounded-2xl p-4 md:p-4 transition-all duration-300 hover:bg-surface-hover hover:border-card-hover-border hover:shadow-lg hover:shadow-card-hover-shadow">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 md:mb-2">
                About
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm md:text-sm leading-relaxed">
                Engineer turned founder who thrives where code meets business.
                I've shipped products to 10k+ users across healthcare and EdTech
                — now I'm building what's next at{" "}
                <a
                  href="https://www.nivyaan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Nivyaan Labs
                </a>
                . I think in systems, ship fast, and believe the best products
                are built by people who care deeply.
              </p>
            </div>

            {/* Connect card */}
            <div className="col-span-2 md:col-span-1 bg-surface border border-border rounded-xl md:rounded-2xl p-4 md:p-4 flex flex-row md:flex-col justify-between md:justify-between gap-2 transition-all duration-300 hover:bg-surface-hover hover:border-card-hover-border hover:shadow-lg hover:shadow-card-hover-shadow">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 md:mb-2">
                  Connect
                </h2>
                <p className="text-text-secondary text-xs sm:text-sm md:text-sm leading-relaxed">
                  Building something interesting? Let's talk.
                </p>
              </div>
              <div className="flex flex-row md:flex-col gap-3 md:gap-1.5 md:mt-2 items-center md:items-start shrink-0">
                <a
                  href={LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm md:text-sm text-accent hover:text-accent-hover transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
                <a
                  href={`mailto:${LINKS.email}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm md:text-sm text-accent hover:text-accent-hover transition-colors"
                >
                  <Mail size={14} />
                  <span className="hidden sm:inline">{LINKS.email}</span>
                  <span className="sm:hidden">Email</span>
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </div>
            </div>

            {/* Stack card — full width */}
            <div className="col-span-2 md:col-span-3 bg-surface border border-border rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-4 transition-all duration-300 hover:bg-surface-hover hover:border-card-hover-border hover:shadow-lg hover:shadow-card-hover-shadow">
              <div className="grid grid-cols-3 gap-x-4 sm:gap-x-6">
                {[
                  { label: "Tech", items: TECH_STACK },
                  { label: "Business", items: BUSINESS_SKILLS },
                  { label: "Industries", items: INDUSTRIES },
                ].map(({ label, items }) => (
                  <div key={label}>
                    <h2 className="text-[10px] sm:text-xs md:text-xs font-semibold uppercase tracking-wider text-accent mb-1.5 sm:mb-2">
                      {label}
                    </h2>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {items.map((item) => (
                        <span
                          key={item}
                          className="px-1.5 sm:px-2 md:px-2.5 py-0.5 text-[10px] sm:text-xs md:text-xs text-text-chip bg-chip rounded leading-snug"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
