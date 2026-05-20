import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, CircleDot, Circle } from "lucide-react";

export interface CarouselSlide {
  image?: string;
  label: string;
  need: string[];
  impact: string[];
}

interface ProjectCarouselProps {
  slides: CarouselSlide[];
}

export default function ProjectCarousel({ slides }: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning || index === current) return;
      setTransitioning(true);
      setCurrent(index);
      setTimeout(() => setTransitioning(false), 300);
    },
    [current, transitioning],
  );

  const prev = useCallback(() => {
    goTo(current === 0 ? slides.length - 1 : current - 1);
  }, [current, goTo, slides.length]);

  const next = useCallback(() => {
    goTo(current === slides.length - 1 ? 0 : current + 1);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  const slide = slides[current];

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Image / Preview area */}
      <div className="relative w-full lg:w-7/12 overflow-hidden rounded-xl md:rounded-2xl border border-border bg-surface aspect-video lg:aspect-auto lg:min-h-[360px]">
        {slide.image ? (
          <img
            src={slide.image}
            alt={slide.label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-chip via-surface to-surface-hover">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-3 opacity-40 select-none">
                {iconForSlide(slide.label)}
              </div>
              <span className="text-text-muted text-sm font-medium tracking-wide uppercase">
                {slide.label}
              </span>
            </div>
          </div>
        )}

        {/* Navigation arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 border border-border text-text-muted hover:text-accent hover:border-card-hover-border transition-all backdrop-blur-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 border border-border text-text-muted hover:text-accent hover:border-card-hover-border transition-all backdrop-blur-sm"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="text-text-muted/60 hover:text-accent transition-colors"
              >
                {i === current ? (
                  <CircleDot size={10} />
                ) : (
                  <Circle size={10} />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Slide counter */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface/80 border border-border text-[10px] text-text-muted backdrop-blur-sm">
          {current + 1} / {slides.length}
        </div>
      </div>

      {/* Bullet points */}
      <div className="w-full lg:w-5/12 flex flex-col gap-5 animate-fade-in" key={current}>
        <Section title="The Need" items={slide.need} />
        <Section title="User Impact" items={slide.impact} />
      </div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-accent mb-2.5">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function iconForSlide(label: string): string {
  const lower = label.toLowerCase();
  if (lower.includes("dashboard") || lower.includes("analytics")) return "📊";
  if (lower.includes("patient") || lower.includes("health") || lower.includes("clinic") || lower.includes("ehr")) return "🏥";
  if (lower.includes("video") || lower.includes("consult")) return "📹";
  if (lower.includes("prescription") || lower.includes("pharmacy")) return "💊";
  if (lower.includes("learning") || lower.includes("course") || lower.includes("student")) return "📚";
  if (lower.includes("parent") || lower.includes("grade")) return "📝";
  if (lower.includes("auth") || lower.includes("login") || lower.includes("setup")) return "🔐";
  if (lower.includes("payment") || lower.includes("billing") || lower.includes("checkout")) return "💳";
  if (lower.includes("poll") || lower.includes("survey") || lower.includes("sentiment")) return "📋";
  if (lower.includes("team") || lower.includes("role")) return "👥";
  if (lower.includes("code") || lower.includes("repo") || lower.includes("commit")) return "💻";
  return "🖼️";
}
