const sections = ["part1", "testimonials", "part2", "work", "guarantee"];

const isMobile = window.innerWidth < 768;

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const sectionId = entry.target.id;

      gtag("event", `view_${sectionId}`, {
        section: sectionId,
        device_type: isMobile ? "mobile" : "desktop",
      });

      observer.unobserve(entry.target);
    });
  },
  {
    rootMargin: isMobile ? "-45% 0px -45% 0px" : "-20% 0px -56% 0px",
    threshold: 0,
  },
);

sections.forEach((id) => {
  const section = document.getElementById(id);

  if (section) {
    observer.observe(section);
  }
});
