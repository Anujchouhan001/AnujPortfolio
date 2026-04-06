export const portfolioMarkup = `

  <!-- Cursor Glow -->
  <div class="cursor-glow" id="cursorGlow"></div>

  <!-- NAV -->
  <nav class="navbar" id="navbar">
    <div class="nav-inner">
      <a href="#hero" class="nav-logo mobile-logo"><span class="nav-logo-text">AC</span></a>
      <div class="nav-links" id="navLinks">
        <a href="#about" class="nav-link">About</a>
        <a href="#skills" class="nav-link">Skills</a>
        <a href="#experience" class="nav-link">Experience</a>
        <a href="#hero" class="nav-logo desktop-logo center-logo"><span class="nav-logo-text">AC</span></a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#education" class="nav-link">Education</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Toggle Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div class="mobile-menu" id="mobileMenu">
    <a href="#about" class="mobile-link">About</a>
    <a href="#skills" class="mobile-link">Skills</a>
    <a href="#experience" class="mobile-link">Experience</a>
    <a href="#projects" class="mobile-link">Projects</a>
    <a href="#education" class="mobile-link">Education</a>
    <a href="#contact" class="mobile-link">Contact</a>
  </div>

  <!-- HERO -->
  <section class="hero" id="hero">
    <div class="hero-bg-grid"></div>
    <div class="hero-glow hero-glow-1"></div>
    <div class="hero-glow hero-glow-2"></div>
    <div class="hero-glow hero-glow-3"></div>
    <div class="hero-particles" id="heroParticles"></div>

    <!-- Left: Text -->
    <div class="hero-content">
      <div class="hero-badge animate-on-scroll">
        <span class="status-dot"></span>
        Available for Opportunities
      </div>
      <p class="hero-greeting animate-on-scroll">Hello, I'm</p>
      <h1 class="hero-name animate-on-scroll">
        <span class="name-line">ANUJ</span>
        <span class="name-line">CHOUHAN</span>
      </h1>
      <p class="hero-title animate-on-scroll">
        Computer Science Engineering Student<br>
        <span class="highlight-text">Full-Stack Developer</span>
      </p>
      <p class="hero-desc animate-on-scroll">
        I build scalable web applications with MERN stack, DevOps pipelines, and cloud-native solutions.<br>
        Passionate about creating production-ready systems and contributing to open-source.
      </p>
      <div class="hero-location animate-on-scroll">📍 Jalandhar, Punjab, India</div>
      <div class="hero-actions animate-on-scroll">
        <a href="#projects" class="btn-primary">
          View My Work
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </a>
        <a href="#contact" class="btn-secondary">Get In Touch</a>
        <a href="/assets/Anuj-Chouhan-CV.pdf?v=1" download class="btn-secondary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Resume
        </a>
      </div>
      <div class="hero-socials animate-on-scroll">
        <a href="https://github.com/Anujchouhan001" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://linkedin.com/in/anuj-chouhan11" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="mailto:canuj546@gmail.com" class="social-link" aria-label="Email">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
      </div>
    </div>

    <!-- SVG string from top of viewport — drawn by JS, origin hidden behind navbar -->
    <svg id="pendulumSvg" class="pendulum-svg" aria-hidden="true"></svg>

    <!-- Right: photo card — position driven by JS 2D spring physics -->
    <div class="hero-visual">
      <div class="hero-3d-scene" id="hero3dScene">
        <div class="hero-photo-card">
          <img src="/assets/anuj.jpg" alt="Anuj Chouhan" loading="eager">
          <div class="hero-photo-overlay"></div>
          <div class="hero-photo-badge">
            <div class="hero-photo-name">Anuj Chouhan</div>
            <div class="hero-photo-role">Full-Stack Developer</div>
          </div>
        </div>
        <!-- Floating chips -->
        <div class="hero-chip hero-chip-1">⚡ React</div>
        <div class="hero-chip hero-chip-2">🎨 Node.js</div>
        <div class="hero-chip hero-chip-3">🗄️ MongoDB</div>
        <div class="hero-chip hero-chip-4">☁️ Oracle Certified</div>
      </div>
    </div>

    <div class="scroll-indicator">
      <div class="scroll-line"></div>
      <span>Scroll</span>
    </div>
  </section>


  <!-- ABOUT -->
  <section class="section about-section" id="about">
    <div class="container">
      <div class="section-label animate-on-scroll"><span class="label-dot"></span>ABOUT ME</div>
      <div class="about-grid">
        <div class="about-heading animate-on-scroll">
          <h2>FROM <span class="highlight-text">CONCEPT</span><br>TO <span class="highlight-text">PRODUCTION</span></h2>
          <div class="about-floating-tags">
            <span class="about-float-pill">MERN Stack</span>
            <span class="about-float-pill">Cloud Native</span>
            <span class="about-float-pill">DevOps</span>
          </div>
        </div>
        <div class="about-glass-card animate-on-scroll">
          <div class="about-card-top">
            <div class="about-presence">
              <span class="about-presence-dot"></span>
              Engineering Student at LPU
            </div>
            <div class="about-orbit" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div class="about-content">
            <p>I am a Computer Science Engineering student at <strong>Lovely Professional University</strong> with expertise in MERN stack, DevOps practices, and cloud infrastructure.</p>
            <p>I have built multiple production-ready projects including logistics platforms with GPS tracking, government scheme finders using NLP, and IoT dashboards. I transform ideas into scalable web applications with clean APIs and intuitive interfaces.</p>
            <p>I actively contribute to open-source and seek opportunities at innovative tech companies where I can build impactful solutions.</p>
            <div class="about-highlights">
              <div class="about-highlight-box"><span>Full-Stack</span><strong>MERN stack expertise</strong></div>
              <div class="about-highlight-box"><span>Cloud</span><strong>Oracle Cloud certified</strong></div>
              <div class="about-highlight-box"><span>Achievement</span><strong>2nd Rank Hackathon</strong></div>
            </div>
            <div class="about-stats">
              <div class="stat-item">
                <span class="stat-number">10+</span>
                <span class="stat-label">Projects Built</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">3</span>
                <span class="stat-label">Certifications</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">2nd</span>
                <span class="stat-label">Hackathon Rank</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SKILLS -->
  <section class="section skills-section" id="skills">
    <div class="container">
      <div class="section-label animate-on-scroll"><span class="label-dot"></span>SKILLS &amp; TECHNOLOGIES</div>
      <h2 class="section-heading animate-on-scroll">MY <span class="highlight-text">TECH STACK</span></h2>
      <p class="skills-intro animate-on-scroll">A practical toolkit I use to build scalable web applications and production-ready systems.</p>
      <div class="skills-grid">
        <div class="skill-category animate-on-scroll">
          <div class="skill-category-header">
            <div class="skill-icon-wrap"><img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4bb.png" alt="Programming languages" class="skill-icon-png" loading="lazy"></div>
            <div>
              <h3>Programming Languages</h3>
              <p class="skill-category-note">Core logic and DSA foundations</p>
            </div>
          </div>
          <div class="skill-tags"><span class="skill-tag">Java</span><span class="skill-tag">JavaScript</span><span class="skill-tag">Python</span><span class="skill-tag">PHP</span></div>
        </div>
        <div class="skill-category animate-on-scroll">
          <div class="skill-category-header">
            <div class="skill-icon-wrap"><img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2699.png" alt="Backend development" class="skill-icon-png" loading="lazy"></div>
            <div>
              <h3>Backend Development</h3>
              <p class="skill-category-note">Reliable API architecture</p>
            </div>
          </div>
          <div class="skill-tags"><span class="skill-tag">Node.js</span><span class="skill-tag">Express.js</span><span class="skill-tag">REST APIs</span><span class="skill-tag">Flask</span></div>
        </div>
        <div class="skill-category animate-on-scroll">
          <div class="skill-category-header">
            <div class="skill-icon-wrap"><img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f5c4.png" alt="Databases" class="skill-icon-png" loading="lazy"></div>
            <div>
              <h3>Databases</h3>
              <p class="skill-category-note">Schema design and optimization</p>
            </div>
          </div>
          <div class="skill-tags"><span class="skill-tag">MySQL</span><span class="skill-tag">MongoDB</span></div>
        </div>
        <div class="skill-category animate-on-scroll">
          <div class="skill-category-header">
            <div class="skill-icon-wrap"><img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3a8.png" alt="Frontend" class="skill-icon-png" loading="lazy"></div>
            <div>
              <h3>Frontend</h3>
              <p class="skill-category-note">Responsive interfaces and UX flow</p>
            </div>
          </div>
          <div class="skill-tags"><span class="skill-tag">React</span><span class="skill-tag">HTML/CSS</span><span class="skill-tag">Tailwind CSS</span><span class="skill-tag">Bootstrap</span></div>
        </div>
        <div class="skill-category animate-on-scroll">
          <div class="skill-category-header">
            <div class="skill-icon-wrap"><img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f6e0.png" alt="Tools and platforms" class="skill-icon-png" loading="lazy"></div>
            <div>
              <h3>Tools &amp; Platforms</h3>
              <p class="skill-category-note">Workflow and delivery ecosystem</p>
            </div>
          </div>
          <div class="skill-tags"><span class="skill-tag">Git</span><span class="skill-tag">Oracle Cloud</span><span class="skill-tag">Google Maps API</span><span class="skill-tag">DevOps</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- EXPERIENCE -->
  <section class="section experience-section" id="experience">
    <div class="container">
      <div class="section-label animate-on-scroll"><span class="label-dot"></span>EXPERIENCE</div>
      <h2 class="section-heading animate-on-scroll">WHERE I'VE <span class="highlight-text">WORKED</span></h2>
      <div class="experience-timeline">
        <div class="timeline-rail" aria-hidden="true"></div>
        <div class="experience-card animate-on-scroll">
          <span class="timeline-node" aria-hidden="true"></span>
          <div class="exp-date"><span class="exp-date-text">Oct 2025 – Nov 2025</span></div>
          <div class="exp-content">
            <div class="exp-title-row">
              <div class="exp-logo-wrap"><img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4bc.png" alt="Freelance" class="exp-logo" loading="lazy"></div>
              <h3 class="exp-title">Freelance Developer</h3>
            </div>
            <p class="exp-subtitle">Truck Booking Platform (Live Project)</p>
            <ul class="exp-list">
              <li>Developed full-stack truck booking platform with Google Maps/GPS API</li>
              <li>Built responsive front-end using React and backend APIs with Node.js</li>
              <li>Implemented secure authentication and MySQL/MongoDB database structure</li>
              <li>Created admin dashboard for managing bookings and trip histories</li>
            </ul>
            <div class="exp-tags"><span class="exp-tag">React</span><span class="exp-tag">Node.js</span><span class="exp-tag">MongoDB</span><span class="exp-tag">Google Maps API</span></div>
          </div>
        </div>
        <div class="experience-card animate-on-scroll">
          <span class="timeline-node" aria-hidden="true"></span>
          <div class="exp-date"><span class="exp-date-text">Jun 2025 – Jul 2025</span></div>
          <div class="exp-content">
            <div class="exp-title-row">
              <div class="exp-logo-wrap"><img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f393.png" alt="Intern" class="exp-logo" loading="lazy"></div>
              <h3 class="exp-title">Full Stack Web Developer Intern</h3>
            </div>
            <p class="exp-subtitle">Remote</p>
            <ul class="exp-list">
              <li>Built Car Rental and Currency Converter apps using MERN stack</li>
              <li>Automated web data collection through custom scripts</li>
              <li>Improved application performance by 30% through optimized queries</li>
            </ul>
            <div class="exp-tags"><span class="exp-tag">MERN Stack</span><span class="exp-tag">REST APIs</span><span class="exp-tag">Performance Optimization</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section class="section projects-section" id="projects">
    <div class="container">
      <div class="section-label animate-on-scroll"><span class="label-dot"></span>PROJECTS</div>
      <h2 class="section-heading animate-on-scroll">SELECTED <span class="highlight-text">WORK</span></h2>
      <div class="projects-stack">

        <!-- Project 1 -->
        <div class="project-card animate-on-scroll" style="--card-accent:#3b82f6; background: rgba(255, 255, 255, 0.09);">
          <div class="project-card-inner">
            <div class="project-info">
              <div class="project-meta"><span class="project-year">2025</span><span class="project-category">Full-Stack Logistics</span></div>
              <h3 class="project-title">TRUCK BOOKING PLATFORM</h3>
              <p class="project-subtitle">Full-Stack Logistics Web Application</p>
              <p class="project-desc">Full-stack logistics platform with real-time GPS tracking, booking management, and admin dashboard. Features Google Maps API integration for route visualization and trip tracking.</p>
              <div class="project-tech"><span>React</span><span>Node.js</span><span>MongoDB</span><span>Google Maps API</span></div>
              <div class="project-links">
                <a href="https://somyatruckservices1.vercel.app" target="_blank" class="project-link live-demo">Live Demo <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>
                <a href="https://github.com/Anujchouhan001/Truck-Booking" target="_blank" class="project-link">GitHub <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>
              </div>
            </div>
            <div class="project-visual">
              <div class="project-mockup">
                <div class="mockup-inner" style="background:linear-gradient(135deg,#1e3a5f,#3b82f6);">
                  <div class="mockup-content">
                    <div class="mockup-header"><div class="mockup-dots"><span></span><span></span><span></span></div></div>
                    <div class="mockup-body"><div class="mockup-map"></div><div class="mockup-overlay"><div class="mockup-bar"></div><div class="mockup-bar short"></div></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="project-card animate-on-scroll" style="--card-accent:#10b981;">
          <div class="project-card-inner">
            <div class="project-info">
              <div class="project-meta"><span class="project-year">2025</span><span class="project-category">Python Flask App</span></div>
              <h3 class="project-title">GOVERNMENT SCHEME FINDER</h3>
              <p class="project-subtitle">NLP-Powered Welfare Scheme Recommender</p>
              <p class="project-desc">Python Flask app recommending welfare schemes using NLP and regex for 106+ schemes with 15+ parameters. Helps citizens find relevant government schemes based on their profile.</p>
              <div class="project-tech"><span>Python</span><span>Flask</span><span>Bootstrap 5</span><span>NLP</span></div>
              <div class="project-links">
                <a href="https://government-scheme-gamma.vercel.app" target="_blank" class="project-link live-demo">Live Demo <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>
                <a href="https://github.com/Anujchouhan001/SchemeFind" target="_blank" class="project-link">GitHub <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>
              </div>
            </div>
            <div class="project-visual">
              <div class="project-mockup">
                <div class="mockup-inner" style="background:linear-gradient(135deg,#064e3b,#10b981);">
                  <div class="mockup-content">
                    <div class="mockup-header"><div class="mockup-dots"><span></span><span></span><span></span></div></div>
                    <div class="mockup-body"><div class="mockup-sidebar"></div><div class="mockup-main"><div class="mockup-bar"></div><div class="mockup-grid"><div class="mockup-cell"></div><div class="mockup-cell"></div><div class="mockup-cell"></div><div class="mockup-cell"></div></div></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Project 3 -->
        <div class="project-card animate-on-scroll" style="--card-accent:#8b5cf6;">
          <div class="project-card-inner">
            <div class="project-info">
              <div class="project-meta"><span class="project-year">2025</span><span class="project-category">IoT Dashboard</span></div>
              <h3 class="project-title">IOT DASHBOARD</h3>
              <p class="project-subtitle">Real-Time Sensor Monitoring</p>
              <p class="project-desc">Real-time sensor monitoring dashboard with 40% efficiency improvement through data visualizations. Features live data updates, analytics charts, and alert systems.</p>
              <div class="project-tech"><span>PHP</span><span>MySQL</span><span>Tailwind CSS</span><span>JavaScript</span></div>
              <div class="project-links">
                <a href="https://github.com/Anujchouhan001/project" target="_blank" class="project-link">GitHub <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>
              </div>
            </div>
            <div class="project-visual">
              <div class="project-mockup">
                <div class="mockup-inner" style="background:linear-gradient(135deg,#4c1d95,#8b5cf6);">
                  <div class="mockup-content">
                    <div class="mockup-header"><div class="mockup-dots"><span></span><span></span><span></span></div></div>
                    <div class="mockup-body"><div class="mockup-main"><div class="mockup-bar"></div><div class="mockup-grid three"><div class="mockup-cell tall"></div><div class="mockup-cell tall"></div><div class="mockup-cell tall"></div></div></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- CERTIFICATIONS (light) -->
  <section class="section light-section" id="certifications">
    <div class="container">
      <div class="section-label dark-label animate-on-scroll"><span class="label-dot dark-dot"></span>RECOGNITION</div>
      <h2 class="section-heading dark-heading animate-on-scroll">CERTIFICATIONS &amp;<br><span class="highlight-text-dark">ACHIEVEMENTS</span></h2>
      <div class="cert-grid">
        <div class="cert-column">
          <h3 class="cert-group-title animate-on-scroll">Certifications</h3>
          <div class="cert-card animate-on-scroll">
            <div class="cert-icon">🏅</div>
            <div class="cert-info"><h4>Oracle Cloud Infrastructure 2025</h4><p>Developer Professional</p><span class="cert-date">Oct 2025</span></div>
          </div>
          <div class="cert-card animate-on-scroll">
            <div class="cert-icon">🏅</div>
            <div class="cert-info"><h4>Oracle Cloud Infrastructure 2025</h4><p>DevOps Professional</p><span class="cert-date">Oct 2025</span></div>
          </div>
          <div class="cert-card animate-on-scroll">
            <div class="cert-icon">🏅</div>
            <div class="cert-info"><h4>Oracle Cloud Infrastructure 2025</h4><p>AI Foundations Associate</p><span class="cert-date">Sep 2025</span></div>
          </div>
        </div>
        <div class="cert-column">
          <h3 class="cert-group-title animate-on-scroll">Achievements</h3>
          <div class="cert-card achievement-card animate-on-scroll">
            <div class="cert-icon">🏆</div>
            <div class="cert-info"><h4>2nd Rank in Hack-A-Thon 1.0</h4><p>by AIESEC</p><span class="cert-date">Hackathon Competition</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- EDUCATION (light) -->
  <section class="section light-section education-section" id="education">
    <div class="container">
      <div class="section-label dark-label animate-on-scroll"><span class="label-dot dark-dot"></span>EDUCATION</div>
      <h2 class="section-heading dark-heading animate-on-scroll">ACADEMIC <span class="highlight-text-dark">BACKGROUND</span></h2>
      <div class="education-timeline">

        <!-- LPU Card -->
        <div class="edu-card-full animate-on-scroll">
          <div class="edu-card-photo">
            <img src="/assets/lpu.jpg" alt="Lovely Professional University" loading="lazy">
          </div>
          <div class="edu-card-body">
            <span class="edu-year">Currently Pursuing</span>
            <h3>Lovely Professional University</h3>
            <p class="edu-degree">Bachelor of Technology – Computer Science and Engineering</p>
            <div class="edu-detail">
              <span class="edu-badge">CGPA: 7.2</span>
              <span class="edu-location">📍 Phagwara, Punjab</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- RESUME -->
  <section class="section resume-section" id="resume">
    <div class="container">
      <div class="section-label animate-on-scroll"><span class="label-dot"></span>RESUME</div>
      <h2 class="section-heading animate-on-scroll">MY <span class="highlight-text">RESUME</span></h2>
      <div class="resume-wrapper animate-on-scroll">
        <div class="paper-fold-container" id="paperFoldContainer">
          <div class="map-fold-display" id="foldDisplay">
            <div class="map-panel top-left z-base">
              <div class="map-panel bottom-left"></div>
              
              <div class="map-panel top-right">
                <div class="map-panel bottom-right"></div>
                
                <div class="map-cover">
                  <div class="resume-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16h16V8l-6-6z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                  </div>
                  <h3>Resume</h3>
                </div>
              </div>
            </div>
          </div>
          <button class="unfold-btn" id="unfoldBtn" onclick="togglePaperFold()">
            <svg id="unfoldBtnIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M4 12h16"/><path d="M12 4v16"/></svg>
            <span id="unfoldBtnText">Unfold Resume</span>
          </button>
          <div class="paper-unfolded" id="paperUnfolded">
            <div class="paper-sheet">
              <div class="paper-edge edge-top"></div><div class="paper-edge edge-right"></div>
              <div class="paper-edge edge-bottom"></div><div class="paper-edge edge-left"></div>
              <div class="resume-iframe-wrapper">
                <iframe src="/assets/Anuj-Chouhan-CV.pdf?v=1#toolbar=0" class="resume-iframe" title="Resume Preview"></iframe>
              </div>
              <div class="resume-actions">
                <a href="/assets/Anuj-Chouhan-CV.pdf?v=1" download class="btn-primary btn-download">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </a>
                <a href="/assets/Anuj-Chouhan-CV.pdf?v=1" target="_blank" class="btn-resume-action">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Full Screen
                </a>
                <button class="btn-resume-action" onclick="togglePaperFold()">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
                  Fold Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="section footer-section" id="contact">
    <div class="container">

      <!-- Top row: heading + contacts -->
      <div class="footer-top animate-on-scroll">
        <div class="footer-top-left">
          <div class="section-label"><span class="label-dot"></span>CONTACT</div>
          <h2 class="footer-heading">
            GREAT THINGS<br>START WITH<br><span class="highlight-text">"HELLO"</span>
          </h2>
        </div>
        <div class="footer-top-right">
          <a href="mailto:canuj546@gmail.com" class="footer-contact-item">
            <span class="footer-contact-label">Email</span>
            <span class="footer-contact-value">canuj546@gmail.com</span>
          </a>
          <a href="tel:+917489635343" class="footer-contact-item">
            <span class="footer-contact-label">Phone</span>
            <span class="footer-contact-value">+91-7489635343</span>
          </a>
        </div>
      </div>

      <!-- Big horizontal social links -->
      <div class="footer-social-row animate-on-scroll">
        <a href="https://github.com/Anujchouhan001" target="_blank" rel="noopener" class="footer-social-big">
          <div class="fsb-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </div>
          <div class="fsb-text">
            <span class="fsb-label">GitHub</span>
            <span class="fsb-handle">Anujchouhan001</span>
          </div>
          <svg class="fsb-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </a>

        <a href="https://linkedin.com/in/anuj-chouhan11" target="_blank" rel="noopener" class="footer-social-big fsb-linkedin">
          <div class="fsb-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </div>
          <div class="fsb-text">
            <span class="fsb-label">LinkedIn</span>
            <span class="fsb-handle">anuj-chouhan11</span>
          </div>
          <svg class="fsb-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </a>
      </div>

      <!-- Bottom -->
      <div class="footer-bottom">
        <a href="#hero" class="back-to-top">Back to Top ↑</a>
        <p>© 2026 Anuj Chouhan. Built with passion &amp; precision.</p>
      </div>
    </div>
  </section>

`;
