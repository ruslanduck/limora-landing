// ===== PROGRESS BAR =====
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progress.style.width = scrolled + '%';
});

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id], div[id="logos"]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== ANIMATE ON SCROLL =====
const aosEls = document.querySelectorAll('.aos, .aos-fade, .aos-left, .aos-right');
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
aosEls.forEach(el => aosObserver.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const duration = 1500;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const prog = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      el.textContent = Math.floor(ease * target);
      if (prog < 1) requestAnimationFrame(animate);
      else el.textContent = target;
    };
    requestAnimationFrame(animate);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// ===== CAPABILITY TABS =====
const tabs = document.querySelectorAll('.cap-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.cap-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ===== AI FEATURES INTERACTION =====
const aiFeatures = document.querySelectorAll('.ai-feature');
aiFeatures.forEach(f => {
  f.addEventListener('click', () => {
    aiFeatures.forEach(x => x.classList.remove('active'));
    f.classList.add('active');
  });
});

// ===== SCROLL TO TOP =====
const scrollBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SOLUTION CARD STACK HOVER =====
const c1 = document.querySelector('.sol-card.c1');
if (c1) {
  const stack = c1.closest('.solution-card-stack');
  if (stack) {
    stack.addEventListener('mouseenter', () => {
      document.querySelector('.sol-card.c2').style.transform = 'translateY(-12px)';
      document.querySelector('.sol-card.c3').style.transform = 'translateY(-22px)';
    });
    stack.addEventListener('mouseleave', () => {
      document.querySelector('.sol-card.c2').style.transform = '';
      document.querySelector('.sol-card.c3').style.transform = '';
    });
  }
}

// ===== CURSOR GLOW =====
const cursorGlow = document.createElement('div');
cursorGlow.id = 'cursor-glow';
document.body.appendChild(cursorGlow);
let mouseX = -1000, mouseY = -1000;
let glowX = -1000, glowY = -1000;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
const tickGlow = () => {
  glowX += (mouseX - glowX) * 0.07;
  glowY += (mouseY - glowY) * 0.07;
  cursorGlow.style.transform = `translate(${glowX - 250}px, ${glowY - 250}px)`;
  requestAnimationFrame(tickGlow);
};
tickGlow();

// ===== 3D CARD TILT =====
document.querySelectorAll('.challenge-card, .benefit-card, .cap-item').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -5;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 5;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    card.style.transition = 'transform 0.08s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all var(--transition)';
  });
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn-lg').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ===== TERMINAL TYPEWRITER =====
const terminalBody = document.querySelector('.ai-terminal-body');
if (terminalBody) {
  const lines = terminalBody.querySelectorAll('.t-line');
  lines.forEach(l => { l.style.opacity = '0'; l.style.transform = 'translateX(-8px)'; });
  const termObs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      }, i * 200);
    });
    termObs.disconnect();
  }, { threshold: 0.4 });
  termObs.observe(terminalBody);
}

// ===== SECTION HEADER LINE =====
const headers = document.querySelectorAll('.section-header');
const headerObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('line-drawn');
      headerObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
headers.forEach(h => headerObs.observe(h));

// ===== STAGGERED GRID REVEAL =====
document.querySelectorAll('.cap-grid, .integrations-grid').forEach(grid => {
  const children = grid.querySelectorAll(':scope > *');
  const gridObs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    children.forEach((child, i) => {
      setTimeout(() => {
        child.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)';
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      }, i * 60);
    });
    gridObs.disconnect();
  }, { threshold: 0.1 });
  children.forEach(child => {
    child.style.opacity = '0';
    child.style.transform = 'translateY(24px)';
  });
  gridObs.observe(grid);
});
