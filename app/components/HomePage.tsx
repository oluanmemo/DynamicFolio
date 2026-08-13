"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, MessageCircle, X } from "lucide-react";
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
    nav: { dev: "DEV", editing: "EDIÇÃO", about: "SOBRE", contact: "CONTATO" },
    role: "Desenvolvimento · Edição",
    available: "Disponível para projetos",
    heroTop: "Código, produto e edição",
    heroAccent: "no mesmo ritmo.",
    heroBody: "Crio experiências digitais que podem ser usadas, assistidas e publicadas — com direção visual, implementação e acabamento.",
    devCta: "Explorar DEV",
    editingCta: "Explorar Edição",
    scroll: "Provas reais, logo abaixo",
    authority: ["Google Play", "Sites no ar", "Conteúdo em inglês", "Freelance"],
    devEyebrow: "Desenvolvimento / trabalhos selecionados",
    devTitle: "Produto real. Interface com intenção.",
    devBody: "Três provas, três contextos: direção visual, produto próprio e operação corporativa.",
    devAll: "Ver todos em DEV",
    editingEyebrow: "Edição / trabalhos selecionados",
    editingTitle: "A edição aparece no resultado.",
    editingBody: "Três formatos escolhidos pela força da prova — sem preencher categorias por obrigação.",
    editingAll: "Ver todos em Edição",
    aboutEyebrow: "Sobre",
    aboutTitle: "Eu gosto de construir coisas que chegam ao mundo.",
    aboutBody: "Algumas começam no Figma, outras no VS Code e outras em uma timeline. Meu trabalho acontece no encontro entre produto, desenvolvimento e audiovisual.",
    aboutDetail: "Do primeiro freelance de identidade a produtos publicados, eu assumo contexto, escolhas e entrega — sem esconder o que foi feito em equipe.",
    logoCase: "Primeiro projeto freelance — identidade J&F",
    contactEyebrow: "Contato",
    contactTitle: "Qual é o próximo trabalho?",
    contactBody: "Escolha a frente mais próxima do que você precisa ou me conte a ideia diretamente.",
    contactDev: "Desenvolvimento",
    contactEditing: "Edição",
    contactGeneral: "Falar comigo",
    footer: "© 2026 Luan Medrado · Feito no Brasil",
  },
  en: {
    nav: { dev: "DEV", editing: "EDITING", about: "ABOUT", contact: "CONTACT" },
    role: "Development · Editing",
    available: "Available for projects",
    heroTop: "Code, product and editing",
    heroAccent: "moving in sync.",
    heroBody: "I create digital experiences people can use, watch and publish — with visual direction, implementation and polish.",
    devCta: "Explore DEV",
    editingCta: "Explore Editing",
    scroll: "Real work, right below",
    authority: ["Google Play", "Live websites", "English content", "Freelance"],
    devEyebrow: "Development / selected work",
    devTitle: "Real products. Intentional interfaces.",
    devBody: "Three proofs, three contexts: visual direction, an original product and corporate operations.",
    devAll: "View all DEV work",
    editingEyebrow: "Editing / selected work",
    editingTitle: "The edit shows in the result.",
    editingBody: "Three formats selected for the strength of the work — without filling categories by obligation.",
    editingAll: "View all Editing work",
    aboutEyebrow: "About",
    aboutTitle: "I like building things that make it into the world.",
    aboutBody: "Some start in Figma, others in VS Code and others in a timeline. My work happens where product, development and audiovisual meet.",
    aboutDetail: "From my first freelance identity project to published products, I own the context, choices and delivery — without hiding what was collaborative.",
    logoCase: "First freelance project — J&F identity",
    contactEyebrow: "Contact",
    contactTitle: "What should we make next?",
    contactBody: "Choose the path closest to what you need or tell me about the idea directly.",
    contactDev: "Development",
    contactEditing: "Editing",
    contactGeneral: "Talk to me",
    footer: "© 2026 Luan Medrado · Made in Brazil",
  },
} as const;

const contactCopy = {
  pt: {
    eyebrow: "Contato direto",
    title: "Me conte o que você precisa",
    body: "Objetivo, prazo e uma referência já são um ótimo começo.",
    name: "Nome",
    email: "Email",
    type: "Tipo de projeto",
    types: ["Edição de vídeo", "Site / landing page", "Interface web", "App / produto", "Outro"],
    message: "Mensagem",
    messagePlaceholder: "Qual é a ideia e onde você quer chegar?",
    submit: "Enviar mensagem",
    sending: "Enviando...",
    success: "Mensagem recebida.",
    successBody: "Vou ler com atenção e responder com o próximo passo.",
    again: "Enviar outra",
    error: "Não foi possível enviar. Tente novamente.",
    close: "Fechar contato",
  },
  en: {
    eyebrow: "Direct contact",
    title: "Tell me what you need",
    body: "A goal, deadline and one reference are already a great start.",
    name: "Name",
    email: "Email",
    type: "Project type",
    types: ["Video editing", "Website / landing page", "Web interface", "App / product", "Other"],
    message: "Message",
    messagePlaceholder: "What is the idea and where do you want to take it?",
    submit: "Send message",
    sending: "Sending...",
    success: "Message received.",
    successBody: "I’ll read it carefully and reply with the next step.",
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
          <strong>LUAN MEDRADO</strong>
          <span>{lang === "pt" ? "DESENVOLVIMENTO · EDIÇÃO" : "DEVELOPMENT · EDITING"}</span>
        </Link>

        <nav className={styles.desktopNav} aria-label={lang === "en" ? "Main navigation" : "Navegação principal"}>
          <a href="#dev">{c.nav.dev}</a>
          <a href="#editing">{c.nav.editing}</a>
          <a href="#sobre">{c.nav.about}</a>
          <button type="button" onClick={() => openContact("home_nav")}>{c.nav.contact}</button>
        </nav>

        <div className={styles.topbarTools}>
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
          <a href="#dev" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>01 — {c.nav.dev}</a>
          <a href="#editing" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>02 — {c.nav.editing}</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>03 — {c.nav.about}</a>
          <button type="button" onClick={() => openContact("home_mobile_nav")} tabIndex={menuOpen ? 0 : -1}>04 — {c.nav.contact}</button>
        </nav>
      </div>

      <section className={styles.hero} id="hero">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.availability}><span />{c.available}</div>
            <p className={styles.role}>{c.role}</p>
            <h1><span>{c.heroTop}</span><em>{c.heroAccent}</em></h1>
            <p className={styles.heroBody}>{c.heroBody}</p>
            <div className={styles.heroActions}>
              <a href="#dev" className={styles.devButton} onClick={() => navigateTo("dev")}>
                <span>01</span>{c.devCta}<ArrowRight size={18} />
              </a>
              <a href="#editing" className={styles.editingButton} onClick={() => navigateTo("editing")}>
                <span>02</span>{c.editingCta}<ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div ref={portraitRef} className={styles.heroPortrait} aria-label={lang === "en" ? "Portrait of Luan Medrado" : "Retrato de Luan Medrado"} onPointerMove={movePortrait} onPointerLeave={resetPortrait}>
            <span className={styles.portraitAccent} aria-hidden="true" />
            <div className={styles.portraitFrame}>
              <Image src="/profile-pic.png" alt="Luan Medrado" fill priority sizes="(min-width: 900px) 42vw, 88vw" className={styles.portraitImage} />
            </div>
          </div>
        </div>
        <a className={styles.scrollCue} href="#authority"><ArrowDown size={15} />{c.scroll}</a>
      </section>

      <div className={styles.authority} id="authority" aria-label={lang === "en" ? "Selected credentials" : "Credenciais selecionadas"}>
        {c.authority.map((item, index) => <span key={item}>{item}{index < c.authority.length - 1 ? <b>·</b> : null}</span>)}
      </div>

      <section className={`${styles.proofSection} ${styles.devSection}`} id="dev" data-home-reveal>
        <div className={styles.sectionHeader}>
          <div>
            <p>{c.devEyebrow}</p>
            <h2>{c.devTitle}</h2>
          </div>
          <div className={styles.sectionIntro}>
            <span>{c.devBody}</span>
            <Link href={devHref} onClick={() => navigateTo("dev")}>{c.devAll}<ArrowUpRight size={16} /></Link>
          </div>
        </div>
        <DevShowcase lang={lang} />
      </section>

      <section className={`${styles.proofSection} ${styles.editingSection}`} id="editing" data-home-reveal>
        <div className={styles.sectionHeader}>
          <div>
            <p>{c.editingEyebrow}</p>
            <h2>{c.editingTitle}</h2>
          </div>
          <div className={styles.sectionIntro}>
            <span>{c.editingBody}</span>
            <Link href={editingHref} onClick={() => navigateTo("editing")}>{c.editingAll}<ArrowUpRight size={16} /></Link>
          </div>
        </div>
        <EditingShowcase lang={lang} />
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
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) closeContact(); }}>
          <div className={styles.modalPanel}>
            <button ref={closeButtonRef} type="button" className={styles.modalClose} onClick={closeContact} aria-label={contact.close}><X size={20} /></button>
            <div className={styles.modalHeader}>
              <span>{contact.eyebrow}</span>
              <h2 id="contact-modal-title">{contact.title}</h2>
              <p>{contact.body}</p>
            </div>
            {contactStatus === "success" ? (
              <div className={styles.modalSuccess}>
                <strong>{contact.success}</strong>
                <p>{contact.successBody}</p>
                <button type="button" onClick={resetContact}>{contact.again}</button>
              </div>
            ) : (
              <form className={styles.modalForm} onSubmit={handleContactSubmit}>
                <div className={styles.formRow}>
                  <label><span>{contact.name}</span><input name="name" value={contactForm.name} onChange={handleContactChange} required autoComplete="name" /></label>
                  <label><span>{contact.email}</span><input type="email" name="email" value={contactForm.email} onChange={handleContactChange} required autoComplete="email" /></label>
                </div>
                <fieldset>
                  <legend>{contact.type}</legend>
                  <div className={styles.projectTypes}>
                    {contact.types.map((type) => (
                      <label key={type}>
                        <input type="radio" name="projectType" value={type} checked={contactForm.projectType === type} onChange={handleContactChange} required />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label><span>{contact.message}</span><textarea name="message" value={contactForm.message} onChange={handleContactChange} required placeholder={contact.messagePlaceholder} /></label>
                {contactStatus === "error" ? <p className={styles.formError} role="alert">{contactError}</p> : null}
                <button type="submit" className={styles.formSubmit} disabled={contactStatus === "loading"}>{contactStatus === "loading" ? contact.sending : contact.submit}<ArrowRight size={17} /></button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
