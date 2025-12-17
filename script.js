// Fade in hero section on load
window.addEventListener("load", () => {
  // Navbar brand
  const headerBrand = document.querySelector(".navbar-brand");
  if (headerBrand) headerBrand.classList.add("visible");

  // Hero section headings
  const heroHeadings = document.querySelectorAll("section.vh-100 h2, section.vh-100 p");
  heroHeadings.forEach(el => el.classList.add("visible"));

  // About section heading
  const aboutHeading = document.querySelector("#about h2");
  if (aboutHeading) aboutHeading.classList.add("visible");

  // Games section heading
  const gamesHeading = document.querySelector("#games h2");
  if (gamesHeading) gamesHeading.classList.add("visible");

  // Books section heading
  const booksHeading = document.querySelector("#books h2");
  if (booksHeading) booksHeading.classList.add("visible");

  // Contact section heading
  const contactHeading = document.querySelector("#contact h2");
  if (contactHeading) contactHeading.classList.add("visible");

  // Start lava lamp on the body
  startLavaLamp(document.body);
});

// Lava lamp effect across the whole page
function startLavaLamp(container) {
  const colors = [
    "rgba(12, 8, 73, 0.56)",   // darker blue
    "rgba(64, 12, 116, 0.45)"    // darker purple
  ];

  const canvas = document.createElement("canvas");
  canvas.className = "lava-lamp-bg";
  container.appendChild(canvas);
  canvas.style.position = "fixed"; /* covers viewport */
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = -1; /* stay behind content */

  const ctx = canvas.getContext("2d");
  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // Blobs setup
  const blobs = Array.from({ length: 8 }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 120 + Math.random() * 150,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    color: colors[i % colors.length]
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    blobs.forEach(b => {
      b.x += b.dx;
      b.y += b.dy;

      if (b.x < 0 || b.x > width) b.dx *= -1;
      if (b.y < 0 || b.y > height) b.dy *= -1;

      const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      gradient.addColorStop(0, b.color);
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// Toggle .scrolled class on navbar on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Bootstrap form validation for contact form
window.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.querySelector("#contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      const emailInput = contactForm.querySelector("#contactEmail");
      if (!contactForm.checkValidity() || (emailInput && !emailInput.validity.valid)) {
        e.preventDefault();
        e.stopPropagation();
        if (emailInput && !emailInput.validity.valid) {
          emailInput.focus();
        }
      }
      contactForm.classList.add("was-validated");
    }, false);
  }
});

// Handle song links
document.addEventListener('DOMContentLoaded', function() {
  const songLinks = document.querySelectorAll('.song-link');
  const audioPlayer = document.getElementById('audioPlayer');
  const audioSource = document.getElementById('audioSource');
  const audioPlayerContainer = document.getElementById('audioPlayerContainer');
  const nowPlaying = document.getElementById('nowPlaying');

  songLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const songPath = this.getAttribute('data-song');
      const songTitle = this.textContent;
      
      audioSource.src = songPath;
      audioPlayer.load();
      
      // Wait for the audio to be ready before playing
      audioPlayer.onloadeddata = function() {
        audioPlayer.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      };
      
      nowPlaying.textContent = `Now Playing: ${songTitle}`;
      audioPlayerContainer.style.display = 'block';
    });
  });
});
