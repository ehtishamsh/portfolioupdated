"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Heart,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  ChevronDown,
  X,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SkillCard from "@/components/skill-card";
import ProjectCard from "@/components/project-card";
import ExperienceCard from "@/components/experience-card";
import TestimonialCard from "@/components/testimonial-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sections = [
    "home",
    "about",
    "skills",
    "projects",
    "experience",
    "testimonials",
    "contact",
  ];
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Initialize refs
  useEffect(() => {
    sections.forEach((section) => {
      sectionRefs.current[section] = document.getElementById(section);
    });
  }, []);

  // Handle scroll and set active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (!element) continue;

        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-500 z-50"
        style={{ scaleX: progressBarWidth, transformOrigin: "0%" }}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 bg-black/50 backdrop-blur-sm right-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="text-xl font-bold relative group">
                <span className="relative z-10">ehtisham</span>
                <motion.span
                  className="text-red-500 relative z-10"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 10,
                    duration: 1,
                  }}
                >
                  .
                </motion.span>
                <span className="relative z-10">dev</span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-[3px] bg-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                />
              </Link>
            </motion.div>

            <nav className="hidden md:block">
              <ul className="flex items-center gap-1">
                {sections.map((section, index) => (
                  <motion.li
                    key={section}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      href={`#${section}`}
                      className={cn(
                        "relative px-4 py-2 text-sm capitalize block transition-colors",
                        activeSection === section
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                      )}
                    >
                      {activeSection === section && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute inset-0 bg-red-500/10 border border-red-500/30 rounded-md -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      {section}
                      {activeSection === section && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 w-1 h-1 bg-red-500 rounded-full"
                          initial={{ x: "-50%" }}
                          animate={{ x: "-50%" }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-800/50 hover:text-white relative overflow-hidden group"
              >
                <span className="relative z-10">Resume</span>
                <motion.div
                  className="absolute inset-0 bg-red-500 -z-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute inset-0 flex items-center justify-center  z-10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                >
                  Resume
                </motion.span>
              </Button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  aria-label="Toggle menu"
                >
                  <motion.div
                    animate={{ rotate: activeSection ? 0 : 90 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 flex flex-col justify-center items-center gap-1.5"
                  >
                    <motion.span className="w-5 h-0.5 bg-white block" />
                    <motion.span className="w-3 h-0.5 bg-red-500 block self-end" />
                  </motion.div>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="h-px w-full bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full w-20 bg-red-500/50"
            animate={{
              x: ["0%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center relative pt-16"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto w-full px-4 z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <AnimatePresence>
              {isLoaded && (
                <>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl font-bold"
                  >
                    Hello, I'm Ehtisham Shah 👋
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-white/70 max-w-lg"
                  >
                    Crafting digital experiences with clean code and creative
                    solutions. Specialized in building modern web applications.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex gap-4"
                  >
                    <Button className="bg-red-500 hover:bg-red-600">
                      View Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/20 hover:border-white/40"
                    >
                      Contact Me
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex gap-4"
                  >
                    <Link
                      href="https://github.com"
                      target="_blank"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Github className="h-6 w-6" />
                    </Link>
                    <Link
                      href="https://linkedin.com"
                      target="_blank"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                    </Link>
                    <Link
                      href="https://twitter.com"
                      target="_blank"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img
                  src="/dev.jpg"
                  alt="Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40 rounded-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-10 h-10 border border-red-200/20 rounded-xl bg-red-600/30 backdrop-blur-sm"></div>
              <div className="absolute -top-4 -left-4 w-10 h-10 border border-red-200/20 rounded-xl bg-red-600/30 backdrop-blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 border border-red-200/20 rounded-xl bg-red-600/30 backdrop-blur-sm"></div>
              <div className="absolute -top-4 -right-4 w-10 h-10 border border-red-200/20 rounded-xl bg-red-600/30 backdrop-blur-sm"></div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm text-white/50 mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <ChevronDown className="h-6 w-6 text-white/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-2">
              About<span className="text-red-500">.</span>Me
            </h2>
            <div className="h-1 w-16 bg-red-500 mb-8"></div>
            <p className="text-white/70 mb-6 text-lg">
              I'm a passionate, self-proclaimed designer who specializes in full
              stack development (React.js, Next.js &amp; Node.js). I am very
              enthusiastic about bringing the technical and visual aspects of
              digital products to life. User experience, pixel perfect design,
              and writing clear, readable, highly performant code matters to me.
            </p>
            <p className="text-white/70 mb-8 text-lg">
              I began my journey as a web developer in 2022, and since then,
              I've continued to grow and evolve as a developer, taking on new
              challenges and learning the latest technologies along the way. I'm
              building cutting-edge web applications using modern technologies
              such as react.js,Next.js, TypeScript, Tailwindcss and much more.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Education</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Badge className="bg-red-500 mt-1">2024</Badge>
                    <div className="ml-3">
                      <p className="font-medium">B.S. Software Engineering</p>
                      <p className="text-sm text-white/60">
                        Virtual University of Pakistan
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Badge className="bg-red-500 mt-1">2019</Badge>
                    <div className="ml-3">
                      <p className="font-medium">
                        Intermediate in Computer Science
                      </p>
                      <p className="text-sm text-white/60">
                        Punjab Group of Colleges
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Personal Info</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center">
                    <span className="font-medium w-24">Name:</span>
                    <span>Ehtisham Shah</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-24">Location:</span>
                    <span>Lahore, Pakistan</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-24">Email:</span>
                    <span>ahtithehero@gmail.com</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-24">Availability:</span>
                    <span className="text-green-500">Available for hire</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-white/[0.02] relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">
              My<span className="text-red-500">.</span>Skills
            </h2>
            <div className="h-1 w-16 bg-red-500 mb-8"></div>
            <p className="text-white/70">
              These are the technologies and tools I've mastered throughout my
              journey as a developer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1  max-w-4xl mx-auto gap-6">
            <SkillCard
              icon="web"
              title="Web Development"
              description="Building responsive and performant web applications using modern frameworks and best practices."
              skills={[
                "React",
                "Next.js",
                "TypeScript",
                "HTML/CSS",
                "Tailwind CSS",
              ]}
            />
            <SkillCard
              icon="design"
              title="UX/UI Design"
              description="Creating intuitive and visually appealing interfaces with a focus on user experience and accessibility."
              skills={["Figma", "Adobe XD", "Tailwind CSS", "Wireframing"]}
            />
            <SkillCard
              icon="database"
              title="Database Management"
              description="Designing and optimizing database structures for efficient data storage and retrieval."
              skills={["PostgreSQL", "SQL", "MySQL"]}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">
              My<span className="text-red-500">.</span>Projects
            </h2>
            <div className="h-1 w-16 bg-red-500 mb-8"></div>
            <p className="text-white/70">
              Here are some of my recent projects that showcase my skills and
              expertise.
            </p>
          </motion.div>

          <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto mb-8">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard
                  title="Blog Platform"
                  description="It is a blog project built with Next.js, Prisma, NextAuth, Shadcn UI, Supabase, PostgreSQL, and more. The project allows users to view, edit, and create blogs and so much more.

"
                  image="/project1.png"
                  tags={[
                    "PostgreSQL",
                    "Next.js",
                    "Prisma ORM",
                    "Tailwind CSS",
                    "TypeScript",
                    "NextAuth",
                  ]}
                  repoUrl="https://github.com/ehtishamsh/theblog"
                />
                <ProjectCard
                  title="E-commerce Product Marketplace"
                  description="Fasco is a full-stack eCommerce platform built with React, TypeScript, Redux, Shadcn UI, and Tailwind CSS, featuring Stripe for payments. The backend uses Node.js, Express, Multer, Supabase, and Prisma for efficient data handling and seamless user experience."
                  image="/project2.png"
                  tags={[
                    "React",
                    "Stripe",
                    "PostgreSQL",
                    "Prisma ORM",
                    "TypeScript",
                    "Redux",
                    "Node.js",
                    "Express",
                  ]}
                  repoUrl="https://github.com/ehtishamsh/fasco"
                />
                <ProjectCard
                  title="Ecommerce Product Marketplace"
                  description="Electronic Gala is a fully functional electronic ecommerce website built with a combination of Bootstrap, CSS, PHP, MySQL, and JavaScript.

                  The project features a user-friendly interface, allowing users to browse and purchase electronic products seamlessly."
                  image="/project3.png"
                  tags={[
                    "PHP",
                    "MySQL",
                    "Bootstrap",
                    "JavaScript",
                    "CSS",
                    "HTML",
                  ]}
                  repoUrl="https://github.com/ehtishamsh/Electronics-Gala"
                />
              </div>
            </TabsContent>
            <TabsContent value="web" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard
                  title="Blog Platform"
                  description="It is a blog project built with Next.js, Prisma, NextAuth, Shadcn UI, Supabase, PostgreSQL, and more. The project allows users to view, edit, and create blogs and so much more.

"
                  image="/project1.png"
                  tags={[
                    "PostgreSQL",
                    "Next.js",
                    "Prisma ORM",
                    "Tailwind CSS",
                    "TypeScript",
                    "NextAuth",
                  ]}
                  repoUrl="https://github.com/ehtishamsh/theblog"
                />
                <ProjectCard
                  title="E-commerce Product Marketplace"
                  description="Fasco is a full-stack eCommerce platform built with React, TypeScript, Redux, Shadcn UI, and Tailwind CSS, featuring Stripe for payments. The backend uses Node.js, Express, Multer, Supabase, and Prisma for efficient data handling and seamless user experience."
                  image="/project2.png"
                  tags={[
                    "React",
                    "Stripe",
                    "PostgreSQL",
                    "Prisma ORM",
                    "TypeScript",
                    "Redux",
                    "Node.js",
                    "Express",
                  ]}
                  repoUrl="https://github.com/ehtishamsh/fasco"
                />
                <ProjectCard
                  title="Ecommerce Product Marketplace"
                  description="Electronic Gala is a fully functional electronic ecommerce website built with a combination of Bootstrap, CSS, PHP, MySQL, and JavaScript.

                  The project features a user-friendly interface, allowing users to browse and purchase electronic products seamlessly."
                  image="/project3.png"
                  tags={[
                    "PHP",
                    "MySQL",
                    "Bootstrap",
                    "JavaScript",
                    "CSS",
                    "HTML",
                  ]}
                  repoUrl="https://github.com/ehtishamsh/Electronics-Gala"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                window.location.href = "https://github.com/ehtishamsh";
              }}
            >
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <section id="experience" className="py-24 bg-white/[0.02] relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">
              My<span className="text-red-500">.</span>Experience
            </h2>
            <div className="h-1 w-16 bg-red-500 mb-8"></div>
            <p className="text-white/70">
              Here are the companies I've worked with throughout my professional
              journey.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            <ExperienceCard
              company="bitsclan"
              position="Front End Developer"
              period="2022 - Present"
              description="Led the frontend development team in building a scalable and performant web application. Implemented modern frontend architecture and best practices."
              technologies={[
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Redux",
                "Next.js",
                "Node.js",
                "Express",
                "PostgreSQL",
                "PHP",
                "MySQL",
              ]}
            />
            <ExperienceCard
              company="Fiver"
              position="Graphic Designer"
              period="2019 - 2022"
              description="Designed user interfaces and graphics for various clients. Collaborated with developers to ensure designs were implemented accurately."
              technologies={[
                "Figma",
                "Adobe XD",
                "Sketch",
                "Prototyping",
                "Photoshop",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">
              My<span className="text-red-500">.</span>Testimonials
            </h2>
            <div className="h-1 w-16 bg-red-500 mb-8"></div>
            <p className="text-white/70">
              What others have to say about working with me.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <TestimonialCard
              name="Emily Brown"
              position="Product Manager at Acme Inc."
              image="https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&h=100&w=100"
              quote="Working with John was a pleasure. His technical skills and attention to detail made our project a success. I would definitely work with him again."
            />
            <TestimonialCard
              name="Marcus Taylor"
              position="CEO at Creative Designs"
              image="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&h=100&w=100"
              quote="John's expertise and problem-solving ability is outstanding. He delivered our project on time and exceeded our expectations."
            />
            <TestimonialCard
              name="Sophia Chen"
              position="CTO at TechStart"
              image="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?crop=faces&fit=crop&h=100&w=100"
              quote="An exceptional developer who understands both technical requirements and business needs. The quality of his work is outstanding."
            />
            <TestimonialCard
              name="David Wright"
              position="Lead Developer at DataTech"
              image="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&h=100&w=100"
              quote="I was impressed by John's code quality and documentation. His work is clean, maintainable, and follows best practices."
            />
            <TestimonialCard
              name="Sarah Johnson"
              position="UX Director at DesignHub"
              image="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=faces&fit=crop&h=100&w=100"
              quote="John has a great eye for design implementation and understands the importance of user experience in development."
            />
            <TestimonialCard
              name="Michael Lee"
              position="Project Lead at InnoTech"
              image="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&h=100&w=100"
              quote="The project John worked on became our benchmark for quality and efficiency. His technical skills are truly impressive."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white/[0.02] relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">
              Contact<span className="text-red-500">.</span>Me
            </h2>
            <div className="h-1 w-16 bg-red-500 mb-8"></div>
            <p className="text-white/70">
              Have a project in mind? Let's discuss how I can help bring your
              ideas to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="md:col-span-2">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 focus:border-red-500 focus:ring-red-500"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your.email@example.com"
                    className="bg-white/5 border-white/10 focus:border-red-500 focus:ring-red-500"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="bg-white/5 border-white/10 focus:border-red-500 focus:ring-red-500"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
                <Button
                  type="submit"
                  className={cn(
                    "w-full transition-all",
                    formStatus === "submitting"
                      ? "bg-white/20"
                      : formStatus === "success"
                      ? "bg-green-500"
                      : formStatus === "error"
                      ? "bg-red-500"
                      : "bg-red-500 hover:bg-red-600"
                  )}
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting"
                    ? "Sending..."
                    : formStatus === "success"
                    ? "Message Sent!"
                    : formStatus === "error"
                    ? "Error! Try Again"
                    : "Send Message"}
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-white/70">Lahore, Pakistan</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-white/70">ahtithehero@gmail</p>
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    className="bg-white/5 p-3 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    className="bg-white/5 p-3 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    className="bg-white/5 p-3 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold">
                ehtisham<span className="text-red-500">.</span>dev
              </Link>
            </div>
            <div className="text-sm text-white/50">
              © {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
