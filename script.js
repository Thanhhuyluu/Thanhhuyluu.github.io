const themeColor = document.querySelector('meta[name="theme-color"]');

function updateThemeColor() {
  themeColor.content = document.documentElement.classList.contains("dark") ? "#1b1a18" : "#f4f1eb";
}

document.querySelectorAll(".theme-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
    } catch {}
    updateThemeColor();
  });
});

const sectionNavLinks = [...document.querySelectorAll('.side-nav a[href^="#"]')];
const navSections = sectionNavLinks
  .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
  .filter(({ section }) => section);

if (navSections.length) {
  let scrollFrame;

  function updateActiveSection() {
    const marker = window.scrollY + window.innerHeight * 0.35;
    const atPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let current = navSections[0];

    navSections.forEach((item) => {
      if (item.section.offsetTop <= marker) current = item;
    });

    if (atPageBottom) current = navSections.at(-1);

    document.querySelectorAll(".side-nav a").forEach((link) => {
      const isCurrent = link === current.link;
      link.classList.toggle("active", isCurrent);
      if (isCurrent) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function requestActiveSectionUpdate() {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(updateActiveSection);
  }

  updateActiveSection();
  window.addEventListener("scroll", requestActiveSectionUpdate, { passive: true });
  window.addEventListener("resize", requestActiveSectionUpdate);
}
