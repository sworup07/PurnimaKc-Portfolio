
    document.getElementById('year').textContent = new Date().getFullYear();

    /* Theme */
    const htmlEl = document.getElementById('html-root');
    const themeBtn = document.getElementById('theme-toggle');
    let isDark = localStorage.getItem('pk-theme') === 'dark' ||
      (!localStorage.getItem('pk-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    function applyTheme() { htmlEl.classList.toggle('dark', isDark); themeBtn.textContent = isDark ? '☀️' : '🌙'; }
    function toggleTheme() { isDark = !isDark; localStorage.setItem('pk-theme', isDark ? 'dark' : 'light'); applyTheme(); }
    applyTheme();

    /* Mobile menu */
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger  = document.getElementById('hamburger');
    let menuOpen = false;
    function toggleMenu() {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      hamburger.textContent = menuOpen ? '✕' : '☰';
      hamburger.setAttribute('aria-label', menuOpen ? 'Close menu' : 'Open menu');
    }
    function closeMenu() { menuOpen = false; mobileMenu.classList.remove('open'); hamburger.textContent = '☰'; }
    document.addEventListener('click', e => {
      if (menuOpen && !mobileMenu.contains(e.target) && !document.getElementById('navbar').contains(e.target)) closeMenu();
    });

    /* Typewriter */
    const words = ['Web Developer','UI/UX Designer','React Enthusiast','Content Writer','Mechatronics Enthusiast','Backend Developer','Python Programmer'];
    const typedEl = document.getElementById('typed-text');
    let wIdx = 0, cIdx = 0, deleting = false;
    function type() {
      const cur = words[wIdx];
      if (!deleting) {
        typedEl.textContent = cur.slice(0, cIdx + 1); cIdx++;
        if (cIdx === cur.length) { setTimeout(() => { deleting = true; type(); }, 1800); return; }
      } else {
        typedEl.textContent = cur.slice(0, cIdx - 1); cIdx--;
        if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
      }
      setTimeout(type, deleting ? 42 : 85);
    }
    type();

    /* Scroll progress + scroll-top button */
    const bar = document.getElementById('scroll-bar');
    const topBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      bar.style.width = pct + '%';
      topBtn.classList.toggle('visible', window.scrollY > 450);
    }, { passive: true });

    /* Active nav */
    const sections = ['hero','about','skills','projects','achievements','contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    const obs = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) {
        const id = visible[0].target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      }
    }, { threshold: [0.25, 0.5] });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });

    /* Fade-up */
    const fadeObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); fadeObs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('#hero .fade-up').forEach((el, i) => { setTimeout(() => el.classList.add('in'), 100 + i * 120); });
    document.querySelectorAll('.fade-up:not(#hero .fade-up)').forEach(el => fadeObs.observe(el));

    /* Skill bars */
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-bar-fill').forEach(b => { b.style.width = b.dataset.width + '%'; });
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.skill-card').forEach(c => barObs.observe(c));

    /* Smooth anchor scroll */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  