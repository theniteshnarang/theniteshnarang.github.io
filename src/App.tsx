import { useEffect, useRef, useState, type ReactNode } from "react";
import { Mail, Phone, MapPin, Linkedin, Link2, Download } from "lucide-react";

const LINKS = {
  email: "nitesh@nivyaan.com",
  phone: "+91 91068 57146",
  phoneHref: "tel:+919106857146",
  location: "Ahmedabad, India",
  linkedin: "https://linkedin.com/in/theniteshnarang",
  github: "https://github.com/theniteshnarang",
  website: "https://www.nivyaan.com",
};

interface Experience {
  company: string;
  fmr?: string;
  href?: string;
  role: string;
  contract?: boolean;
  period: string;
  bullets: string[];
}

const EXPERIENCE: Experience[] = [
  {
    company: "Nivyaan Labs",
    href: LINKS.website,
    role: "Technical Founder",
    period: "10/2025 – Present",
    bullets: [
      "Ran deep user research to explore building our own product, and learned the hard way that shipping beats over-researching.",
      "Led an engagement to automate drafting for advocates, from discovery to delivery, before deciding to postpone the product due to unclear ROI.",
      "Deep enough in the tech to see bottlenecks early, close enough to users to find the right solution, building products that matter in the market.",
    ],
  },
  {
    company: "Asika AI",
    fmr: "Novocuris",
    href: "https://asika.ai/",
    role: "Frontend Architect",
    contract: true,
    period: "03/2025 – 09/2025",
    bullets: [
      "Owned the healthcare panel, from scoping to delivery, serving 2,500+ patients.",
      "Drove white-labeling strategy, enabling faster enterprise client onboarding across multiple geographies.",
      "Cut UI development time by 50% through modular architecture, accelerating feature development across the platform.",
    ],
  },
  {
    company: "Crework Labs",
    href: "https://www.creworklabs.com/",
    role: "Full Stack Engineer",
    contract: true,
    period: "10/2024 – 02/2025",
    bullets: [
      "Owned the build of SaaS email outreach modules used by 500+ users on launch day.",
      "Engineered secure Gmail consent and authentication flows, reducing onboarding friction for new users.",
      "Designed and shipped Campaign REST APIs the frontend consumed from day one.",
    ],
  },
  {
    company: "Alyve Health",
    href: "https://www.alyve.health/",
    role: "Frontend Engineer",
    period: "11/2021 – 04/2024",
    bullets: [
      "Owned the frontend for App 2.0 (10k+ users) and the Admin Dashboard serving 100+ enterprise clients.",
      "Independently architected and shipped Diagnostic & Reimbursement modules with zero post-launch regressions.",
      "Automated endorsement and order workflows, improving operational speed by 25% and freeing team bandwidth.",
      "Integrated health SDKs, improving analytics accuracy by 20% and directly informing product decisions.",
    ],
  },
  {
    company: "Neog.camp",
    href: "https://neog.camp",
    role: "Teaching Assistant",
    period: "02/2021 – 08/2021",
    bullets: [
      "Managed a 17-person cohort, owning the delivery pipeline and improving throughput by 10%.",
    ],
  },
  {
    company: "OpenEducat",
    fmr: "Tech Receptives",
    href: "https://www.openeducat.org/",
    role: "Application Engineering Intern",
    period: "11/2020 – 03/2021",
    bullets: [
      "Owned the build of the wishlist and cart modules, the core of the platform's shopping flow.",
      "Rebuilt dynamic product pages in React, replacing a Python-based web framework, improving UX and lifting page views by 30%.",
    ],
  },
];

const SKILLS = [
  {
    label: "Technical",
    value: 80,
    items: [
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "TypeScript",
      "MongoDB",
      "MySQL",
      "REST APIs",
      "Firebase",
      "AWS Console",
    ],
  },
  {
    label: "Product & Business",
    value: 50,
    items: [
      "Product Scoping",
      "User Research",
      "Systems Thinking",
      "GTM Strategy",
      "Analytics & Metrics",
      "Sales Enablement",
    ],
  },
];

const EDUCATION = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    school: "Parul University",
    href: "https://paruluniversity.ac.in/",
    period: "2015 – 2019",
    location: "Vadodara, India",
  },
  {
    degree: "Higher Secondary (CBSE)",
    school: "Airport School",
    href: "https://www.airportschoolahm.in/",
    period: "2013 – 2015",
    location: "Ahmedabad, India",
  },
];

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-shown" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* About the PDF: dist/nitesh-resume.pdf is regenerated from this site at
   deploy time by scripts/generate-pdf.mjs — the website stays the single
   source of truth. */

function SectionHeading({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <div className="print-keep border-b-2 border-teal pb-1.5">
      <h2
        id={id}
        className="text-[16px] font-bold uppercase tracking-[0.05em] text-teal"
      >
        {children}
      </h2>
    </div>
  );
}

/* The tiny chain-link glyph the PDF shows after linked names */
function GlyphLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} website`}
      className="ml-1 inline-flex align-[0.05em] text-teal transition-colors duration-150 hover:text-ink"
    >
      <Link2 className="size-[12px]" strokeWidth={2.4} aria-hidden />
    </a>
  );
}

export default function App() {
  return (
    <div className="min-h-dvh text-ink">
      {/* ——— Header band (light gray, full-bleed, as in the PDF) ——— */}
      <header className="bg-band">
        <div className="mx-auto w-full max-w-[860px] px-5 pt-9 pb-6 sm:px-8">
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-1">
            <h1 className="text-[40px] leading-none font-bold text-teal sm:text-[46px]">
              Nitesh Narang
            </h1>
            <p className="text-[22px] leading-none text-teal sm:text-[28px]">
              Product Engineer
            </p>
          </div>
          <nav
            aria-label="Contact"
            className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-[13.5px] leading-none text-ink"
          >
            <a
              href={`mailto:${LINKS.email}`}
              className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-teal"
            >
              <Mail
                className="size-[15px] text-teal"
                strokeWidth={2.2}
                aria-hidden
              />
              {LINKS.email}
            </a>
            <a
              href={LINKS.phoneHref}
              className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-teal"
            >
              <Phone
                className="size-[15px] text-teal"
                strokeWidth={2.2}
                aria-hidden
              />
              {LINKS.phone}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin
                className="size-[15px] text-teal"
                strokeWidth={2.2}
                aria-hidden
              />
              {LINKS.location}
            </span>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-teal"
            >
              <Linkedin
                className="size-[15px] text-teal"
                strokeWidth={2.2}
                aria-hidden
              />
              LinkedIn
            </a>
            <a
              href="./nitesh-resume.pdf"
              download
              className="print-hidden inline-flex items-center gap-2 transition-colors duration-150 hover:text-teal"
            >
              <Download
                className="size-[15px] text-teal"
                strokeWidth={2.2}
                aria-hidden
              />
              Download PDF
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[860px] px-5 sm:px-8">
        {/* ——— Profile line ——— */}
        <p className="profile-line mt-8 text-[15.5px] leading-relaxed text-ink">
          I've shipped products used by 10k+ users. Now I want to know why they
          stayed, and what made them pay.
        </p>

        {/* ——— Experience ——— */}
        <Reveal className="mt-8">
          <section aria-labelledby="experience-heading">
            <SectionHeading id="experience-heading">Experience</SectionHeading>
            <div>
              {EXPERIENCE.map((exp) => (
                <article key={exp.company} className="mt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-0.5">
                    <h3 className="text-[15.5px] leading-snug text-ink">
                      <span className="font-bold">
                        {exp.company}
                        {exp.fmr ? (
                          <span className="font-bold"> (fmr. {exp.fmr})</span>
                        ) : null}
                      </span>
                      {exp.href ? (
                        <GlyphLink href={exp.href} label={exp.company} />
                      ) : null}
                      <span>
                        , {exp.role}
                        {exp.contract ? " (Contract)" : ""}
                      </span>
                    </h3>
                    <span className="text-[14.5px] whitespace-nowrap text-teal">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-1.5 space-y-[3px]">
                    {exp.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2.5 text-[14.5px] leading-[1.42] text-ink"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] size-[4.5px] shrink-0 rounded-full bg-ink"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ——— Skill × Education, two columns ——— */}
        <Reveal className="grid-section-print mt-10">
          <div className="print-keep-grid grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {/* Skill */}
            <section aria-labelledby="skill-heading">
              <SectionHeading id="skill-heading">Skills</SectionHeading>
              <div className="mt-5 space-y-6">
                {SKILLS.map((group) => (
                  <div key={group.label} className="print-keep">
                    <div className="flex items-center gap-4">
                      <h3 className="text-[15px] font-bold text-ink">
                        {group.label}
                      </h3>
                      <div
                        className="ml-auto h-[7px] w-[150px] shrink-0 overflow-hidden rounded-[1px] bg-track sm:w-[175px]"
                        role="img"
                        aria-label={`${group.label}: ${group.value} out of 100`}
                      >
                        <div
                          className="h-full bg-ink"
                          style={{ width: `${group.value}%` }}
                        />
                      </div>
                    </div>
                    <p className="mt-1.5 text-[14.5px] leading-[1.5] text-ink">
                      {group.items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section aria-labelledby="education-heading">
              <SectionHeading id="education-heading">Education</SectionHeading>
              <div className="mt-5 space-y-5">
                {EDUCATION.map((edu) => (
                  <article key={edu.degree}>
                    <h3 className="text-[15px] font-bold leading-snug text-ink">
                      {edu.degree}
                    </h3>
                    <p className="mt-0.5 text-[14.5px] leading-snug text-ink">
                      {edu.school}
                      <GlyphLink href={edu.href} label={edu.school} />
                    </p>
                    <p className="mt-0.5 text-[14.5px] leading-snug">
                      <span className="text-teal">{edu.period}</span>
                      <span className="px-1.5 text-[#a3a3a3]">|</span>
                      <span className="text-ink">{edu.location}</span>
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </Reveal>

        {/* ——— Footer (web only, kept quiet so the document stays honest) ——— */}
        <footer className="print-hidden mt-12 border-t border-rule-soft pt-4 pb-10">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[12.5px] text-[#767676]">
            <p>
              Updated ·{" "}
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                year: "numeric",
              }).format(new Date(__BUILD_DATE__))}
            </p>
            <div className="flex items-center gap-5">
              <a
                href="./nitesh-resume.pdf"
                download
                className="transition-colors duration-150 hover:text-teal"
              >
                Résumé (PDF)
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-150 hover:text-teal"
              >
                GitHub
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-150 hover:text-teal"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
