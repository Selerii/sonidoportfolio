import React, { useState, useEffect } from 'react';
import { ReactTyped } from 'react-typed';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import heroDesktop from './assets/hero.jpg';
import heroMobile from './assets/hero-mobile.jpg';

function App() {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Apply theme class to body
    document.body.classList.toggle('dark-theme', theme === 'dark');
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Throttle scroll handler for performance
    const throttle = (func, limit) => {
      let inThrottle;
      return (...args) => {
        if (!inThrottle) {
          func(...args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const handleScroll = throttle(() => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.animate-child').forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('visible');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}-theme`}>
      <CustomNavbar toggleTheme={toggleTheme} theme={theme} />
      <Hero />
      <About />
      <WorkExperience />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </div>
  );
}

function CustomNavbar({ toggleTheme, theme }) {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
      className="shadow-lg"
      aria-label="Main navigation"
    >
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4">
          Erwin Sonido
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" aria-label="Toggle navigation" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link href="#about" className="text-white" aria-label="About section">
              About
            </Nav.Link>
            <Nav.Link href="#work" className="text-white" aria-label="Work section">
              Work
            </Nav.Link>
            <Nav.Link href="#skills" className="text-white" aria-label="Skills section">
              Skills
            </Nav.Link>
            <Nav.Link href="#projects" className="text-white" aria-label="Projects section">
              Projects
            </Nav.Link>
            <Nav.Link href="#certifications" className="text-white" aria-label="Certifications section">
              Certifications
            </Nav.Link>
            <Nav.Link href="#contact" className="text-white" aria-label="Contact section">
              Contact
            </Nav.Link>
            <Nav.Item>
              <Button
                variant="link"
                className="nav-link text-white"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              >
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Hero() {
  useEffect(() => {
    // Ensure the hero section is marked as visible for animations
    const heroSection = document.querySelector('#home');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (heroSection) observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="hero fade-in-section">
      <picture>
        <source media="(max-width: 768px)" srcSet={heroMobile} />
        <source media="(min-width: 769px)" srcSet={heroDesktop} />
        <img
          src={heroDesktop}
          alt="Hero background"
          className="hero-background"
          loading="eager"
        />
      </picture>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-10 col-xl-8">
            <h1 className="display-4 fw-bold mb-4 animate-child">
              Hi, I'm{' '}
              <ReactTyped
                strings={['Erwin Sonido', 'an IT Enthusiast', 'a Backend Developer']}
                typeSpeed={50}
                backSpeed={30}
                loop
              />
            </h1>
            <p className="lead mb-4 animate-child">
              A passionate IT graduate eager to create innovative solutions with modern
              technologies like Laravel, Vue.js, and MySQL.
            </p>
            <a href="#projects" className="btn btn-primary btn-lg animate-child">
              Discover My Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-5 bg-light fade-in-section">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold animate-child">About Me</h2>
        <div className="d-flex flex-column align-items-center">
          <div className="profile-img-wrapper mb-4">
            <img
              src="/profile.jpg"
              alt="Erwin Sonido Profile"
              className="profile-img rounded-circle"
            />
          </div>
          <p className="text-center col-md-8 animate-child">
            I'm a Bachelor of Science in Information Technology graduate from Urdaneta City
            University, eager to gain hands-on experience in the IT industry. As a fast
            learner, I'm always excited to explore new technologies and expand my skill set,
            with expertise in backend development using Lumen (Laravel), Vue.js, and MySQL.
          </p>
        </div>
      </div>
    </section>
  );
}

function WorkExperience() {
  const experiences = [
    {
      title: 'Backend Developer Intern',
      company: 'Makerspace Innovhub - Mapandan, Pangasinan',
      duration: 'Feb 2025 - May 2025',
      description:
        'Developed RESTful APIs using Lumen (Laravel) and integrated them with a Vue.js frontend. Managed data storage with MySQL and implemented secure user authentication using JWT. Collaborated using Git for version control and team development workflow.',
    },
    {
      title: 'Customer Service Representative',
      company: 'TaskUs Lighthouse – La Union',
      duration: 'Aug 2019 - Nov 2019',
      description:
        'Assisted customers through phone, chat, or email, answering questions and solving problems quickly and politely. Followed company guidelines and used tools to handle customer concerns.',
    },
    {
      title: 'Commission on Elections Intern',
      company: 'Urdaneta City',
      duration: 'Feb 2019 - May 2019',
      description:
        'Provided administrative support by organizing files and encoding voter information. Assisted citizens with voter registration and helped prepare for elections by distributing materials.',
    },
  ];

  return (
    <section id="work" className="py-5 fade-in-section">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold animate-child">Work Experience</h2>
        <div className="col-md-8 mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item mb-4 animate-child">
              <h3 className="h5 fw-semibold">{exp.title}</h3>
              <p className="text-muted">
                {exp.company} | {exp.duration}
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    { name: 'Lumen (Laravel)', level: 85, description: 'Building RESTful APIs with Lumen' },
    { name: 'Vue.js', level: 80, description: 'Creating dynamic frontend interfaces' },
    { name: 'MySQL', level: 85, description: 'Managing relational databases' },
    { name: 'Git', level: 80, description: 'Version control and team collaboration' },
    {
      name: 'JWT Authentication',
      level: 75,
      description: 'Implementing secure authentication',
    },
  ];

  useEffect(() => {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    const progressBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            progressBars.forEach((bar) => {
              const width = bar.getAttribute('data-width');
              bar.style.setProperty('--width', `${width}%`);
              bar.classList.add('visible');
            });
          } else {
            // Reset progress bars when out of view
            progressBars.forEach((bar) => {
              bar.style.setProperty('--width', '0%');
              bar.classList.remove('visible');
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) observer.observe(skillsSection);

    return () => {
      observer.disconnect();
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, []);

  return (
    <section id="skills" className="py-5 bg-light fade-in-section">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold animate-child">My Skills</h2>
        <div className="col-md-6 mx-auto">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="mb-3 animate-child"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={skill.description}
            >
              <h5 className="fw-medium">{skill.name}</h5>
              <div className="progress">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: '0%' }}
                  data-width={skill.level}
                  aria-valuenow={skill.level}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {skill.level}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: 'ARtrock - Mobile AR App',
      description:
        'Created a mobile AR app with video recording, photo capture, and interactive AR features using Vuforia. Developed a booking reservation system with real-time validation and management system using Firebase. Designed a dashboard for handling bookings and user data.',
      link: '#',
      image: 'https://via.placeholder.com/300x200?text=ARtrock',
      tech: ['Unity', 'Vuforia', 'Firebase'],
    },
    {
      title: 'Farmhub - Backend Development',
      description:
        'Optimized backend performance by refactoring API endpoints and improving database query efficiency. Collaborated with frontend developers and testers to align API functionality with user interface requirements. Implemented features for farmer registration, crop tracking, and data analytics.',
      link: '#',
      image: 'https://via.placeholder.com/300x200?text=Farmhub',
      tech: ['Lumen', 'Vue.js', 'MySQL'],
    },
  ];

  return (
    <section id="projects" className="py-5 fade-in-section">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold animate-child">My Projects</h2>
        <div className="row">
          {projects.map((project, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card project-card shadow">
                <img src={project.image} className="card-img-top" alt={project.title} />
                <div className="card-body">
                  <h5 className="card-title fw-semibold">{project.title}</h5>
                  <p className="card-text text-muted">{project.description}</p>
                  <div className="mb-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="badge bg-primary me-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (project.link === '#') {
                        e.preventDefault();
                        alert('Project link not available yet.');
                      }
                    }}
                  >
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const certifications = [
    'Design Thinking Workshop - 2025',
    'Web 3 Kwentuhan - 2025',
    'PowerBI Seminar and Workshop - 2025',
    'Digital Marketing Bootcamp - 2025',
    'Blockchain Development Workshop - 2025',
  ];

  return (
    <section id="certifications" className="py-5 bg-light fade-in-section">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold animate-child">Certifications</h2>
        <div className="col-md-6 mx-auto">
          <ul className="list-group">
            {certifications.map((cert, index) => (
              <li key={index} className="list-group-item animate-child">
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setTimeout(() => setStatus(null), 3000);
      return;
    }
    // Placeholder for actual form submission (e.g., EmailJS or API)
    console.log('Form submitted:', formData);
    setStatus('success');
    setTimeout(() => {
      setStatus(null);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-5 bg-light fade-in-section">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold animate-child">Contact Me</h2>
        <div className="col-md-6 mx-auto">
          <p className="text-center mb-4 animate-child">
            Email:{' '}
            <a href="mailto:erwinsonido05@gmail.com">erwinsonido05@gmail.com</a>
            <br />
            Phone: <a href="tel:+639686779181">09686779181</a>
            <br />
            Address: #16 Nodora St. Brgy. Salcedo, Luna, La Union
          </p>
          {status === 'success' && (
            <div className="alert alert-success animate-child">
              Message sent successfully!
            </div>
          )}
          {status === 'error' && (
            <div className="alert alert-danger animate-child">
              Please enter a valid email address.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-floating">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                aria-label="Name"
              />
              <label htmlFor="name" className="form-label">
                Name
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                aria-label="Email"
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
            </div>
            <div className="mb-3 form-floating">
              <textarea
                className="form-control"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="4"
                required
                aria-label="Message"
              ></textarea>
              <label htmlFor="message" className="form-label">
                Message
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 animate-child">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default App;