"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, MessageCircle, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, PointerEvent as ReactPointerEvent } from "react";
import DevShowcase from "./DevShowcase";
import EditingShowcase from "./EditingShowcase";
import LanguageSwitch from "./LanguageSwitch";
import { useLanguage } from "../context/LanguageContext";
import { localizePath } from "../lib/locale";
import { trackEvent } from "../lib/analytics";
import styles from "./HomePage.module.css";

const WHATSAPP_NUMBER = "5511945764672";

const copy = {
  pt: {
    nav: { dev: "DEV", editing: "EDIÇÃO", about: "SOBRE", contact: "FALAR COMIGO" },
    available: "Disponível para projetos",
    heroTop: "Código, produto e edição",
    heroAccent: "no mesmo ritmo.",
    heroBody: "Crio sites e produtos digitais, desenvolvo interfaces e transformo ideias em vídeo, do conceito à entrega final.",
    devCta: "Explorar DEV",
    editingCta: "Explorar Edição",
    devEyebrow: "DESENVOLVIMENTO · TRABALHOS SELECIONADOS",
    devTitle: "Produto real. Interface com intenção.",
    devBody: "Três projetos que mostram diferentes lados do meu trabalho — direção visual, produto próprio e experiência corporativa.",
    devAll: "Ver todos em DEV",
    editingEyebrow: "EDIÇÃO · TRABALHOS SELECIONADOS",
    editingTitle: "A edição aparece no resultado.",
    editingBody: "Uma seleção de trabalhos em que ritmo, narrativa e acabamento fazem a diferença.",
    editingAll: "Ver todos em Edição",
    aboutEyebrow: "Sobre",
    aboutTitle: "Eu gosto de construir coisas que chegam ao mundo.",
    aboutBody: "Algumas começam no Figma, outras no VS Code e outras em uma timeline. Meu trabalho acontece no encontro entre produto, desenvolvimento e audiovisual.",
    aboutDetail: "Do primeiro freelance de identidade a produtos publicados, gosto de entender o contexto, tomar decisões e acompanhar a entrega. Deixando claro meu papel em cada projeto.",
    logoCase: "Primeiro projeto freelance: identidade J&F",
    contactEyebrow: "Contato",
    contactTitle: "Qual é o próximo projeto?",
    contactBody: "Se você precisa tirar uma ideia do papel, melhorar um produto ou contar uma história em vídeo, me conta o que está construindo.",
    contactDev: "Desenvolvimento",
    contactEditing: "Edição",
    contactGeneral: "Falar comigo",
    footer: "© 2026 Luan Medrado",
  },
  en: {
    nav: { dev: "DEV", editing: "EDITING", about: "ABOUT", contact: "TALK TO ME" },
    available: "Available for projects",
    heroTop: "Code, product and editing",
    heroAccent: "moving in sync.",
    heroBody: "I build websites and digital products, develop interfaces and turn ideas into video, from concept to final delivery.",
    devCta: "Explore DEV",
    editingCta: "Explore Editing",
    devEyebrow: "DEVELOPMENT · SELECTED WORK",
    devTitle: "Real products. Intentional interfaces.",
    devBody: "Three projects showing different sides of my work: visual direction, own product and corporate experience.",
    devAll: "View all DEV work",
    editingEyebrow: "EDITING · SELECTED WORK",
    editingTitle: "The edit shows in the result.",
    editingBody: "A curated selection of work where pacing, narrative and finish make the difference.",
    editingAll: "View all Editing work",
    aboutEyebrow: "About",
    aboutTitle: "I like building things that make it into the world.",
    aboutBody: "Some start in Figma, others in VS Code and others in a timeline. My work happens where product, development and audiovisual meet.",
    aboutDetail: "From my first freelance identity project to published products, I like to understand the context, make decisions and see delivery through, keeping my role in each project transparent.",
    logoCase: "First freelance project: J&F identity",
    contactEyebrow: "Contact",
    contactTitle: "What is the next project?",
    contactBody: "If you need to get an idea off the ground, improve a product or tell a story through video, tell me what you are building.",
    contactDev: "Development",
    contactEditing: "Editing",
    contactGeneral: "Talk to me",
    footer: "© 2026 Luan Medrado",
  },
} as const;

const contactCopy = {
  pt: {
    eyebrow: "Contato direto",
    titleLine1: "Me conta",
    titleLine2: "o que você",
    titleLine3: "quer criar.",
    subtitle: "Site, produto ou vídeo. Me passa o contexto e eu te respondo.",
    available: "Disponível para projetos",
    directTitle: "Ou me chama direto:",
    whatsapp: "WhatsApp",
    email: "E-mail",
    nameLabel: "Nome",
    namePlaceholder: "Como posso te chamar?",
    emailLabel: "Email",
    emailPlaceholder: "seu@email.com",
    typeLabel: "O que você precisa?",
    types: [
      { id: "dev", label: "DEV" },
      { id: "editing", label: "EDIÇÃO" },
      { id: "outro", label: "OUTRO" },
    ],
    messageLabel: "Mensagem",
    messagePlaceholder: "Me conta a ideia, o objetivo e qualquer referência que você já tenha.",
    submit: "Enviar mensagem",
    sending: "Enviando...",
    successTitle: "Mensagem recebida!",
    successBody: "Vou ler com atenção e responder com o próximo passo.",
    again: "Enviar outra",
    error: "Não foi possível enviar. Tente novamente.",
    close: "Fechar contato",
  },
  en: {
    eyebrow: "Direct contact",
    titleLine1: "Tell me",
    titleLine2: "what you want",
    titleLine3: "to create.",
    subtitle: "Website, product or video. Share the context and I'll get back to you.",
    available: "Available for projects",
    directTitle: "Or reach out directly:",
    whatsapp: "WhatsApp",
    email: "E-mail",
    nameLabel: "Name",
    namePlaceholder: "What should I call you?",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    typeLabel: "What do you need?",
    types: [
      { id: "dev", label: "DEV" },
      { id: "editing", label: "EDITING" },
      { id: "outro", label: "OTHER" },
    ],
    messageLabel: "Message",
    messagePlaceholder: "Tell me the idea, goal and any references you already have.",
    submit: "Send message",
    sending: "Sending...",
    successTitle: "Message received!",
    successBody: "I'll read it carefully and reply with the next step.",
    again: "Send another",
    error: "Could not send the message. Please try again.",
    close: "Close contact",
  },
} as const;

type ContactStatus = "idle" | "loading" | "success" | "error";

export default function HomePage() {
  const { lang } = useLanguage();
  const c = copy[lang];
  const contact = contactCopy[lang];
  const devHref = localizePath("/dev", lang);
  const editingHref = localizePath("/editing", lang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [heroHover, setHeroHover] = useState<"dev" | "editing" | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [contactStatus, setContactStatus] = useState<ContactStatus>("idle");
  const [contactError, setContactError] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", projectType: "", message: "" });
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);

  const closeContact = useCallback(() => {
    setContactOpen(false);
    requestAnimationFrame(() => lastFocusedRef.current?.focus());
  }, []);

  const openContact = (source: string) => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setMenuOpen(false);
    setContactOpen(true);
    trackEvent("contact_modal_open", { source, lang });
  };

  useEffect(() => {
    const locked = menuOpen || contactOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    if (contactOpen) requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, contactOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (contactOpen) closeContact();
      else setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [contactOpen, closeContact]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-home-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-visible", "true");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      const sobreEl = document.getElementById("sobre");
      const editingEl = document.getElementById("editing");
      const devEl = document.getElementById("dev");

      if (sobreEl && scrollPos >= sobreEl.offsetTop) {
        setActiveSection("sobre");
      } else if (editingEl && scrollPos >= editingEl.offsetTop) {
        setActiveSection("editing");
      } else if (devEl && scrollPos >= devEl.offsetTop) {
        setActiveSection("dev");
      } else {
        setActiveSection(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleContactSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setContactStatus("loading");
    setContactError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? contact.error);
      setContactStatus("success");
      trackEvent("contact_form_submit", { lang, source: "home_contact_modal", projectType: contactForm.projectType });
    } catch (error) {
      setContactError(error instanceof Error ? error.message : contact.error);
      setContactStatus("error");
    }
  };

  const resetContact = () => {
    setContactStatus("idle");
    setContactError("");
    setContactForm({ name: "", email: "", projectType: "", message: "" });
  };

  const navigateTo = (lane: "dev" | "editing") => {
    trackEvent("home_path_select", { lane, lang });
  };

  const movePortrait = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--portrait-x", `${x * 10}px`);
    event.currentTarget.style.setProperty("--portrait-y", `${y * 8}px`);
  };

  const resetPortrait = () => {
    portraitRef.current?.style.setProperty("--portrait-x", "0px");
    portraitRef.current?.style.setProperty("--portrait-y", "0px");
  };

  return (
    <main className={styles.home}>
      <header className={styles.topbar}>
        <Link href={localizePath("/", lang)} className={styles.brand} aria-label="Luan Medrado — Home">
          <Image
            src="/favicon.png"
            alt="Luan Medrado"
            width={26}
            height={26}
            className={styles.brandLogo}
          />
          <div className={styles.brandText}>
            <strong>LUAN MEDRADO</strong>
            <span>{lang === "pt" ? "DESENVOLVIMENTO · EDIÇÃO" : "DEVELOPMENT · EDITING"}</span>
          </div>
        </Link>

        <nav className={styles.desktopNav} aria-label={lang === "en" ? "Main navigation" : "Navegação principal"}>
          <a
            href="#dev"
            className={`${styles.navLink} ${styles.navLinkDev} ${activeSection === "dev" ? styles.navLinkActive : ""}`}
          >
            <span className={styles.navDot} aria-hidden="true" />
            {c.nav.dev}
          </a>
          <a
            href="#editing"
            className={`${styles.navLink} ${styles.navLinkEditing} ${activeSection === "editing" ? styles.navLinkActive : ""}`}
          >
            <span className={styles.navDot} aria-hidden="true" />
            {c.nav.editing}
          </a>
          <a
            href="#sobre"
            className={`${styles.navLink} ${styles.navLinkAbout} ${activeSection === "sobre" ? styles.navLinkActive : ""}`}
          >
            <span className={styles.navDot} aria-hidden="true" />
            {c.nav.about}
          </a>
        </nav>

        <div className={styles.topbarTools}>
          <button
            type="button"
            className={styles.contactPill}
            onClick={() => openContact("home_nav")}
          >
            <span>{c.nav.contact}</span>
            <ArrowUpRight size={13} className={styles.contactPillArrow} />
          </button>
          <LanguageSwitch />
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="home-mobile-menu"
            aria-label={menuOpen ? (lang === "en" ? "Close menu" : "Fechar menu") : (lang === "en" ? "Open menu" : "Abrir menu")}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div id="home-mobile-menu" className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label={lang === "en" ? "Mobile navigation" : "Navegação mobile"}>
          <a href="#dev" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>{c.nav.dev}</a>
          <a href="#editing" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>{c.nav.editing}</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>{c.nav.about}</a>
          <button type="button" onClick={() => openContact("home_mobile_nav")} tabIndex={menuOpen ? 0 : -1}>{c.nav.contact} ↗</button>
        </nav>
      </div>

      <section className={styles.hero} id="hero" data-hero-hover={heroHover || "none"}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.availability}><span />{c.available}</div>
            <h1><span>{c.heroTop}</span><em>{c.heroAccent}</em></h1>
            <p className={styles.heroBody}>{c.heroBody}</p>
            <div className={styles.heroActions}>
              <Link
                href={devHref}
                className={styles.devButton}
                onClick={() => navigateTo("dev")}
                onMouseEnter={() => setHeroHover("dev")}
                onMouseLeave={() => setHeroHover(null)}
                onFocus={() => setHeroHover("dev")}
                onBlur={() => setHeroHover(null)}
              >
                {c.devCta}<ArrowRight size={18} />
              </Link>
              <Link
                href={editingHref}
                className={styles.editingButton}
                onClick={() => navigateTo("editing")}
                onMouseEnter={() => setHeroHover("editing")}
                onMouseLeave={() => setHeroHover(null)}
                onFocus={() => setHeroHover("editing")}
                onBlur={() => setHeroHover(null)}
              >
                {c.editingCta}<ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div ref={portraitRef} className={styles.heroPortrait} aria-label={lang === "en" ? "Portrait of Luan Medrado" : "Retrato de Luan Medrado"} onPointerMove={movePortrait} onPointerLeave={resetPortrait}>
            <span className={styles.portraitAccent} aria-hidden="true" />
            <div className={styles.portraitFrame}>
              <Image src="/profile-pic.png" alt="Luan Medrado" fill priority sizes="(min-width: 900px) 42vw, 88vw" className={styles.portraitImage} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.proofSection} ${styles.devSection}`} id="dev" data-home-reveal>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTopBar}>
            <p className={styles.sectionEyebrow}>{c.devEyebrow}</p>
            <Link href={devHref} className={styles.sectionTopLink} onClick={() => navigateTo("dev")}>
              <span>{c.devAll}</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
          <h2>{c.devTitle}</h2>
        </div>
        <DevShowcase lang={lang} />
        <div className={styles.showcaseFooter}>
          <span>{lang === "pt" ? "Quer ver outros projetos de desenvolvimento?" : "Want to explore more dev projects?"}</span>
          <Link href={devHref} className={styles.showcaseAllLink} onClick={() => navigateTo("dev")}>
            <span>{c.devAll}</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className={`${styles.proofSection} ${styles.editingSection}`} id="editing" data-home-reveal>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTopBar}>
            <p className={styles.sectionEyebrow}>{c.editingEyebrow}</p>
          </div>
          <h2>{c.editingTitle}</h2>
        </div>
        <EditingShowcase lang={lang} />
        <div className={`${styles.showcaseFooter} ${styles.showcaseFooterEnd}`}>
          <Link href={editingHref} className={styles.showcaseAllLink} onClick={() => navigateTo("editing")}>
            <span>{c.editingAll}</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <section className={styles.about} id="sobre" data-home-reveal>
        <p className={styles.aboutIndex}>03 / {c.aboutEyebrow}</p>
        <div className={styles.aboutGrid}>
          <h2>{c.aboutTitle}</h2>
          <div className={styles.aboutCopy}>
            <p>{c.aboutBody}</p>
            <p>{c.aboutDetail}</p>
            <Link
              href="https://www.behance.net/gallery/210403079/Logo-Loja-de-Suplementos-J-F"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("proof_link_click", { lane: "about", proof: "jf-logo", destination: "behance", lang })}
            >
              {c.logoCase}<ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.contact} id="contato" data-home-reveal>
        <div className={styles.contactHeading}>
          <p>{c.contactEyebrow}</p>
          <h2>{c.contactTitle}</h2>
          <span>{c.contactBody}</span>
        </div>
        <div className={styles.contactHub}>
          <Link href={devHref} onClick={() => navigateTo("dev")}><span>01</span><strong>{c.contactDev}</strong><ArrowUpRight /></Link>
          <Link href={editingHref} onClick={() => navigateTo("editing")}><span>02</span><strong>{c.contactEditing}</strong><ArrowUpRight /></Link>
          <button type="button" onClick={() => openContact("home_contact_hub")}><span>03</span><strong>{c.contactGeneral}</strong><ArrowUpRight /></button>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>{c.footer}</span>
        <div>
          <Link href="https://github.com/oluanmemo" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></Link>
          <Link href="https://www.linkedin.com/in/oluanmedrado/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></Link>
          <Link href={`mailto:${"luanmedradooliveira@gmail.com"}`} aria-label="Email"><Mail size={18} /></Link>
          <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></Link>
        </div>
      </footer>

      {contactOpen ? (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeContact();
          }}
        >
          <div
            className={styles.modalPanel}
            data-theme={contactForm.projectType || "none"}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.modalClose}
              onClick={closeContact}
              aria-label={contact.close}
            >
              <X size={18} />
            </button>

            {contactStatus === "success" ? (
              <div className={styles.modalSuccess}>
                <span className={styles.modalSuccessBadge}>✓</span>
                <strong>{contact.successTitle}</strong>
                <p>{contact.successBody}</p>
                <button type="button" onClick={resetContact}>{contact.again}</button>
              </div>
            ) : (
              <div className={styles.modalGrid}>
                <div className={styles.modalInfo}>
                  <span className={styles.modalEyebrow}>{contact.eyebrow}</span>
                  <h2 id="contact-modal-title" className={styles.modalTitle}>
                    <span>{contact.titleLine1}</span>
                    <span>{contact.titleLine2}</span>
                    <span>{contact.titleLine3}</span>
                  </h2>
                  <p className={styles.modalSubtitle}>{contact.subtitle}</p>

                  <div className={styles.modalAvailability}>
                    <span className={styles.modalAvailDot} aria-hidden="true" />
                    <span>{contact.available}</span>
                  </div>

                  <div className={styles.modalDirect}>
                    <span className={styles.modalDirectTitle}>{contact.directTitle}</span>
                    <div className={styles.modalDirectLinks}>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.modalDirectLink}
                        onClick={() => trackEvent("social_click", { destination: "whatsapp", source: "contact_modal", lang })}
                      >
                        <MessageCircle size={14} />
                        <span>{contact.whatsapp}</span>
                        <ArrowUpRight size={12} />
                      </a>
                      <a
                        href="mailto:luanmedradooliveira@gmail.com"
                        className={styles.modalDirectLink}
                        onClick={() => trackEvent("social_click", { destination: "email", source: "contact_modal", lang })}
                      >
                        <Mail size={14} />
                        <span>{contact.email}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>

                <form className={styles.modalForm} onSubmit={handleContactSubmit}>
                  <div className={styles.formRow}>
                    <label>
                      <span>{contact.nameLabel}</span>
                      <input
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                        autoComplete="name"
                        placeholder={contact.namePlaceholder}
                      />
                    </label>
                    <label>
                      <span>{contact.emailLabel}</span>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                        autoComplete="email"
                        placeholder={contact.emailPlaceholder}
                      />
                    </label>
                  </div>

                  <fieldset className={styles.projectTypeFieldset}>
                    <legend>{contact.typeLabel}</legend>
                    <div className={styles.projectTypes}>
                      {contact.types.map((t) => (
                        <label key={t.id} className={`${styles.typeChip} ${styles[`typeChip_${t.id}`]}`}>
                          <input
                            type="radio"
                            name="projectType"
                            value={t.id}
                            checked={contactForm.projectType === t.id}
                            onChange={handleContactChange}
                            required
                          />
                          <span>
                            <i className={styles.chipDot} aria-hidden="true" />
                            {t.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label className={styles.messageLabel}>
                    <span>{contact.messageLabel}</span>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      required
                      placeholder={contact.messagePlaceholder}
                    />
                  </label>

                  {contactStatus === "error" ? <p className={styles.formError} role="alert">{contactError}</p> : null}

                  <button
                    type="submit"
                    className={styles.formSubmit}
                    disabled={contactStatus === "loading"}
                  >
                    <span>{contactStatus === "loading" ? contact.sending : contact.submit}</span>
                    <ArrowUpRight size={16} className={styles.submitArrow} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
