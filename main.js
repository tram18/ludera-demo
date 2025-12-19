// Theme Switcher Functionality
const themeBtns = document.querySelectorAll(".theme-btn");
const body = document.body;

// Load saved theme or default
const savedTheme = localStorage.getItem("ludera-theme") || "default";
body.setAttribute("data-theme", savedTheme);
updateActiveButton(savedTheme);

themeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.getAttribute("data-theme");
    body.setAttribute("data-theme", theme);
    localStorage.setItem("ludera-theme", theme);
    updateActiveButton(theme);
  });
});

function updateActiveButton(theme) {
  themeBtns.forEach((btn) => {
    if (btn.getAttribute("data-theme") === theme) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Smooth scroll for navigation links
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

// Add scroll animation to elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Parallax effect for floating shapes
let ticking = false;
window.addEventListener("scroll", function () {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      const scrolled = window.pageYOffset;
      const puzzleShape = document.querySelector(".shape-puzzle");
      const donutShape = document.querySelector(".shape-donut");

      if (puzzleShape) {
        puzzleShape.style.transform = `translateY(${scrolled * 0.3}px) rotate(${
          scrolled * 0.05
        }deg)`;
      }
      if (donutShape) {
        donutShape.style.transform = `translateY(${scrolled * 0.4}px) rotate(${
          scrolled * -0.05
        }deg)`;
      }

      ticking = false;
    });
    ticking = true;
  }
});

// Observe all cards and sections
document
  .querySelectorAll(
    ".problem-card, .traction-card, .feature-large, .step-card, .team-track, .how-it-works"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Google Form button handlers
const FORM_URL = "https://forms.gle/KX5mJ3BDjRpZsDBV9";
document.querySelectorAll(".btn-cta-large, .btn-join").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // small UX: disable button briefly to prevent double-clicks
    btn.disabled = true;
    btn.style.opacity = "0.8";

    // open in a new tab
    window.open(FORM_URL, "_blank", "noopener,noreferrer");

    // re-enable after a short delay
    setTimeout(() => {
      btn.disabled = false;
      btn.style.opacity = "";
    }, 1000);
  });
});

// Video play toggle (added)
const modal = document.getElementById("videoModal");
const video = document.getElementById("videoPlayer");
function openVideoModal() {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Auto-play when modal opens
  video.play().catch((err) => {
    console.log("Video autoplay blocked:", err);
  });
}

function closeVideoModal(event) {
  if (
    event.target.id === "videoModal" ||
    event.target.classList.contains("close-modal")
  ) {
    // Pause and reset video
    video.pause();
    video.currentTime = 0;

    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Close on Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeVideoModal({ target: { id: "videoModal" } });
  }
});

// ---------------------Team Section Content Update----------------------//
let currentSlide = 0;
const teamMembers = [
  {
    name: "Khoi Phan",
    position: "Chief Executive Officer",
    bio: "Strategic operator with deep roots in the gaming world. Khoi blends product vision with player psychology to build learning experiences as addictive as great games.",
    funFact: "Completed Dark Souls using only a dance pad controller",
    emoji: "⚡",
    image: "images/people/khoi.png", // add your team member images here
  },
  {
    name: "Alexa Chew",
    position: "Chief Design Officer",
    bio: "Design leader at the intersection of learning science and product craft. Alexa has spent years studying Gen-Z motivation to shape interfaces that feel natural and joyful.",
    funFact: "Has a 847-day Duolingo streak (and counting)",
    emoji: "🎮",
    image: "images/people/alexa.png",
  },
  {
    name: "Shaf Murshed",
    position: "Chief Technology Officer",
    bio: "Engineer obsessed with making technology feel magical. Shaf has built AI systems for major enterprises, but now focuses on creating scalable, learner-first platforms.",
    funFact:
      "Built his first game at age 12, still has the source code on a floppy disk",
    emoji: "🤖",
    image: "images/people/shah.png",
  },
  {
    name: "Vivienne Luechai",
    position: "Art Director",
    bio: "Visual world-builder devoted to expressive, visionary, human-centered design. Vivienne has crafted experiences for top creative tools and now brings Ludera’s universe to life.",
    funFact: "Has 247 fonts installed but insists only three are ‘worthy.’",
    emoji: "🎨",
    image: "images/people/vivienne.png",
  },
  // {
  //   name: "Marcus Thompson",
  //   position: "Growth & Community Lead",
  //   bio: "Built Discord communities with 100K+ members before joining Ludera. Marcus knows how to turn users into superfans.",
  //   funFact:
  //     "Once organized a 48-hour study marathon that went viral on TikTok",
  //   emoji: "🚀",
  //   image:
  //     "https://plus.unsplash.com/premium_photo-1722859288966-b00ef70df64b?q=80&w=1606&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   name: "Zoe Anderson",
  //   position: "Content & Curriculum",
  //   bio: "Former teacher turned quest designer. Zoe transforms boring textbooks into epic storylines with 500+ study quests created.",
  //   funFact: "Reads 100+ books a year and remembers every plot twist",
  //   emoji: "📚",
  //   image:
  //     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  // },
];

const track = document.getElementById("teamTrack");
const indicatorsContainer = document.getElementById("indicators");

// Create indicators
teamMembers.forEach((_, index) => {
  const indicator = document.createElement("button");
  indicator.classList.add("indicator");
  if (index === 0) indicator.classList.add("active");
  indicator.onclick = () => goToSlide(index);
  indicatorsContainer.appendChild(indicator);
});

function renderSlide() {
  const slideHTML = `
                <div class="team-slide">
                    ${Array(4)
                      .fill(0)
                      .map((_, i) => {
                        const memberIndex =
                          (currentSlide + i) % teamMembers.length;
                        const member = teamMembers[memberIndex];
                        return `
                            <div class="team-member">
                                <div class="member-image-container">
                                    <img src="${member.image}" alt="${member.name}" class="member-image">
                                </div>
                                <div class="member-info">
                                    <h3 class="member-name">${member.name}</h3>
                                    <p class="member-position">${member.position}</p>
                                    <p class="member-bio">${member.bio}</p>
                                    <div class="member-fun-fact">
                                        <div class="fun-fact-label">${member.emoji} Fun Fact</div>
                                        <div class="fun-fact-text">${member.funFact}</div>
                                    </div>
                                </div>
                            </div>
                        `;
                      })
                      .join("")}
                </div>
            `;
  track.innerHTML = slideHTML;

  // Update indicators
  document.querySelectorAll(".indicator").forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

function changeSlide(direction) {
  currentSlide += direction;

  // Loop around in circle
  if (currentSlide < 0) {
    currentSlide = teamMembers.length - 1;
  } else if (currentSlide >= teamMembers.length) {
    currentSlide = 0;
  }

  renderSlide();
}

function goToSlide(index) {
  currentSlide = index;
  renderSlide();
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") changeSlide(-1);
  if (e.key === "ArrowRight") changeSlide(1);
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) changeSlide(1);
  if (touchEndX > touchStartX + 50) changeSlide(-1);
}

// Initialize
renderSlide();
