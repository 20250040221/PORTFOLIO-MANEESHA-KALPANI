document.addEventListener("DOMContentLoaded", () => {
  
  if (window.AOS) {
    AOS.init({ duration: 900, once: true });
  }

  // 2. GSAP ScrollTrigger parallax effects
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);


    gsap.to(".hero-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

  
    gsap.to(".hero-content", {
      yPercent: -15,
      opacity: 0.4,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    gsap.utils.toArray(".parallax-card").forEach((card) => {
      gsap.to(card, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    gsap.utils.toArray(".work-item").forEach((item, i) => {
      gsap.to(item, {
        y: i % 2 === 0 ? -40 : 40,
        ease: "none",
        scrollTrigger: { trigger: "#work", start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    gsap.utils.toArray(".section-title").forEach((title) => {
      gsap.from(title, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: title, start: "top 85%" },
      });
    });
  }

  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".service-card"), {
      max: 12,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      scale: 1.03,
    });
  }

  const navbar = document.getElementById("navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 60);
  window.addEventListener("scroll", onScroll);
  onScroll();

  // 6. Hamburger opens/closes the mobile side menu
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("button[type='submit']");
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.textContent = "";
    status.className = "form-status";

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      status.textContent = result.message;
      status.classList.add(result.success ? "success" : "error");
      if (result.success) form.reset();
    } catch (err) {
      status.textContent = "Something went wrong. Please try again later.";
      status.classList.add("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
});
