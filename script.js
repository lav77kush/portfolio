// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}, observerOptions);

document.querySelectorAll(".scroll-reveal").forEach((el) => {
  observer.observe(el);
});

// Experience timeline animation
const experienceItems = document.querySelectorAll(".experience-item");
experienceItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.2}s`;
});

// Form submission
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const subject = this.querySelectorAll('input[type="text"]')[1].value;
  const message = this.querySelector("textarea").value;

  // Simple form validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields");
    return;
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  // OPTION 1: EmailJS (Recommended for client-side)
  // Uncomment and configure this section to use EmailJS
emailjs.init('CTpsikjq2pvpgpT_c');
  emailjs
    .send("service_ux9sfeb", "template_p3h5oif", {
      title: "Portfolio Form",
      from_name: name,
      message: message,
      reply_from: 'Lavkush Singh',
      year: new Date().getFullYear(),
      email: email,
    })
    .then(
      function (response) {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        //submitBtn.style.background = 'linear-gradient(45deg, #f472b6, #a855f7)';
        submitBtn.style.background = "linear-gradient(45deg, #06d6a0, #059669)";
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background =
            "linear-gradient(45deg, var(--primary-color), var(--secondary-color))";
          document.querySelector("form").reset();
        }, 2000);
      },
      function (error) {
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
        //submitBtn.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
        submitBtn.style.background = "linear-gradient(45deg, #06d6a0, #059669)";
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background =
            "linear-gradient(45deg, var(--primary-color), var(--secondary-color))";
        }, 2000);
        console.error("EmailJS error:", error);
      }
    );
});

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Typing animation for hero subtitle
const subtitle = document.querySelector(".subtitle");
const originalText = subtitle.textContent;
subtitle.textContent = "";

let index = 0;
function typeWriter() {
  if (index < originalText.length) {
    subtitle.textContent += originalText.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}

setTimeout(typeWriter, 1000);

// Particle effect on mouse move
document.addEventListener("mousemove", (e) => {
  const particle = document.createElement("div");
  particle.style.position = "fixed";
  particle.style.left = e.clientX + "px";
  particle.style.top = e.clientY + "px";
  particle.style.width = "4px";
  particle.style.height = "4px";
  particle.style.background = "var(--accent-color)";
  particle.style.borderRadius = "50%";
  particle.style.pointerEvents = "none";
  particle.style.zIndex = "9999";
  particle.style.opacity = "0.7";
  particle.style.animation = "particleFade 1s ease-out forwards";

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 1000);
});

// Add particle fade animation
const style = document.createElement("style");
style.textContent = `
            @keyframes particleFade {
                0% {
                    opacity: 0.7;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0);
                }
            }
            
            .nav-links a.active {
                color: var(--accent-color);
            }
            
            .nav-links a.active::after {
                width: 100%;
            }
        `;
document.head.appendChild(style);

// Mobile menu toggle (for future enhancement)
const mobileMenuToggle = () => {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("mobile-active");
};

// Add mobile menu styles
const mobileStyles = document.createElement("style");
mobileStyles.textContent = `
            @media (max-width: 768px) {
                .nav-links.mobile-active {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(15, 15, 35, 0.95);
                    backdrop-filter: blur(20px);
                    padding: 2rem;
                    border-top: 1px solid var(--glass-border);
                }
                
                .mobile-menu-btn {
                    display: block;
                    background: none;
                    border: none;
                    color: var(--text-primary);
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                
                @media (min-width: 769px) {
                    .mobile-menu-btn {
                        display: none;
                    }
                }
            }
        `;
document.head.appendChild(mobileStyles);

// Add mobile menu button
if (window.innerWidth <= 768) {
  const navContainer = document.querySelector(".nav-container");
  const mobileBtn = document.createElement("button");
  mobileBtn.className = "mobile-menu-btn";
  mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
  mobileBtn.addEventListener("click", mobileMenuToggle);
  navContainer.appendChild(mobileBtn);
}

// Skills animation on scroll
const skillCategories = document.querySelectorAll(".skill-category");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
        }, index * 200);
      }
    });
  },
  { threshold: 0.2 }
);

skillCategories.forEach((category) => {
  category.style.opacity = "0";
  skillObserver.observe(category);
});

// Add some interactive hover effects
document
  .querySelectorAll(".skill-category, .certificate-card, .experience-card")
  .forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.transition = "all 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

// Add loading animation
window.addEventListener("load", () => {
  const loader = document.createElement("div");
  loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-primary);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 1;
                transition: opacity 0.5s ease;
            `;

  loader.innerHTML = `
                <div style="text-align: center;">
                    <div style="width: 50px; height: 50px; border: 3px solid var(--glass-border); border-top: 3px solid var(--accent-color); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
                    <div style="color: var(--accent-color); font-weight: 600;">Loading Portfolio...</div>
                </div>
            `;

  document.body.appendChild(loader);

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.remove();
    }, 500);
  }, 1500);
});

// Add spin animation for loader
const spinAnimation = document.createElement("style");
spinAnimation.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
document.head.appendChild(spinAnimation);
