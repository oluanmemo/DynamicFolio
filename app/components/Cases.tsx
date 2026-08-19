'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMode } from '../context/ModeContext';
import Image from 'next/image';
import styles from './Cases.module.css';

interface InternationalChannel {
  id: string;
  name: string;
  logo: string;
  niche: string;
  nicheEn: string;
  subs: string;
  subsEn: string;
  stat: string;
  statEn: string;
  roleTag: string;
  roleTagEn: string;
  href: string;
}

const internationalChannels: InternationalChannel[] = [
  {
    id: "truesailing",
    name: "True Sailing Life",
    logo: "/True Sailing Life.jpg",
    niche: "15K inscritos · Canal internacional",
    nicheEn: "15K subscribers · International channel",
    subs: "~80% dos uploads editados",
    subsEn: "~80% of uploads edited",
    stat: "Edição recorrente de montagem e ritmo",
    statEn: "Recurring assembly & pacing edit",
    roleTag: "Edição recorrente",
    roleTagEn: "Recurring editor",
    href: "https://www.youtube.com/@TrueSailingLife",
  },
  {
    id: "switch",
    name: "Switch Game List",
    logo: "/Switch Game List.jpg",
    niche: "Canais multi-idioma · EN / ES / FR",
    nicheEn: "Multi-language channels · EN / ES / FR",
    subs: "Gaming · Long-form",
    subsEn: "Gaming · Long-form",
    stat: "Edição contínua multi-canal",
    statEn: "Ongoing multi-channel editing",
    roleTag: "Edição recorrente",
    roleTagEn: "Recurring editor",
    href: "https://www.youtube.com/@SwitchGameList",
  },
  {
    id: "ukmotorhome",
    name: "UK Motorhome Guide",
    logo: "/UKMotorhomeGuide.jpg",
    niche: "Reino Unido · 11 vídeos publicados",
    nicheEn: "UK · 11 published videos",
    subs: "Maioria dos 11 vídeos editada",
    subsEn: "Majority of 11 videos edited",
    stat: "Long-form internacional",
    statEn: "International long-form",
    roleTag: "Edição recorrente",
    roleTagEn: "Recurring editor",
    href: "https://www.youtube.com/@UKMotorhomeGuide",
  },
  {
    id: "roadlife",
    name: "Road Life Guide",
    logo: "/RoadLifeGuide.jpg",
    niche: "Operação internacional de conteúdo",
    nicheEn: "International content operation",
    subs: "Long-form internacional",
    subsEn: "International long-form",
    stat: "Edição recorrente e montagem",
    statEn: "Recurring editing & assembly",
    roleTag: "Edição recorrente",
    roleTagEn: "Recurring editor",
    href: "https://www.youtube.com/@RoadLifeGuide",
  },
  {
    id: "moneycultures",
    name: "Money Cultures",
    logo: "/Money Cultures.jpg",
    niche: "Finanças & Conteúdo dark",
    nicheEn: "Finance & Dark content",
    subs: "Cortes dinâmicos e retenção",
    subsEn: "Dynamic cuts & retention",
    stat: "Edição recorrente",
    statEn: "Recurring editing",
    roleTag: "Edição recorrente",
    roleTagEn: "Recurring editor",
    href: "https://www.youtube.com/@MoneyCultures",
  },
  {
    id: "globaltravel",
    name: "Global Travel List",
    logo: "/Global Travel List.jpg",
    niche: "Listas de viagem / Top 10",
    nicheEn: "Travel lists / Top 10",
    subs: "Pesquisa de assets e acabamento",
    subsEn: "Asset research & polish",
    stat: "Edição recorrente",
    statEn: "Recurring editing",
    roleTag: "Edição recorrente",
    roleTagEn: "Recurring editor",
    href: "https://www.youtube.com/@GlobalTravelList",
  },
];

export default function Cases() {
  const { lang } = useLanguage();
  const { mode } = useMode();
  const [activeChannelIdx, setActiveChannelIdx] = useState(0);

  if (mode !== 'editor') return null;

  const activeChannel = internationalChannels[activeChannelIdx];

  return (
    <section id="cases" className={styles.casesSection}>
      <div className={styles.container}>
        {/* CASE 01 */}
        <article className={styles.caseCard}>
          <div className={styles.caseHeader}>
            <div className={styles.caseNumber}>CASE 01</div>
            <span className={styles.caseBadge}>
              {lang === 'pt' ? 'Operação Internacional' : 'International Operation'}
            </span>
          </div>

          <h2 className={styles.title}>
            {lang === 'pt' ? 'Edição para canais internacionais' : 'Editing for International Channels'}
          </h2>
          <h3 className={styles.subtitle}>
            {lang === 'pt' 
              ? 'Operação recorrente de conteúdo para YouTube em múltiplos nichos e idiomas.'
              : 'Recurring YouTube content operation across multiple niches and languages.'}
          </h3>

          {/* 9:16 Short-form Video + Proof & Interactive Channels */}
          <div className={styles.case1Split}>
            {/* Left: 9:16 Video Player with contextual badge */}
            <div className={styles.videoCol}>
              <div className={styles.videoWrapper}>
                <div className={styles.videoBadgeOverlay}>
                  SHORT-FORM TEST · EN · SELF-INITIATED
                </div>
                <video
                  src="/reel-en.mp4"
                  poster="/proofs/reel-nanogram.webp"
                  controls
                  playsInline
                  muted
                  loop
                  className={styles.verticalVideo}
                />
              </div>
              <p className={styles.videoCaption}>
                {lang === 'pt'
                  ? 'Teste criado de forma independente para prospecção internacional. Pesquisa, roteiro e voice-over com IA, seleção visual, memes, motion, sound design e edição em inglês.'
                  : 'Self-initiated short-form test built for international outreach. Research, AI script and voice-over, visual asset selection, memes, motion, sound design and English pacing.'}
              </p>
            </div>

            {/* Right: Quick Proof Metrics + Interactive Channel Details */}
            <div className={styles.proofCol}>
              {/* 2x2 Metric Grid */}
              <div className={styles.proofGrid}>
                <div className={styles.proofMiniCard}>
                  <span className={styles.proofMiniVal}>6+ canais</span>
                  <span className={styles.proofMiniDesc}>
                    {lang === 'pt' ? 'Canais atendidos' : 'Client channels'}
                  </span>
                </div>
                <div className={styles.proofMiniCard}>
                  <span className={styles.proofMiniVal}>~6 vídeos/sem</span>
                  <span className={styles.proofMiniDesc}>
                    {lang === 'pt' ? 'Fluxo recorrente' : 'Recurring pipeline'}
                  </span>
                </div>
                <div className={styles.proofMiniCard}>
                  <span className={styles.proofMiniVal}>EN / ES / FR</span>
                  <span className={styles.proofMiniDesc}>
                    {lang === 'pt' ? 'Conteúdo multi-idioma' : 'Multi-language content'}
                  </span>
                </div>
                <div className={styles.proofMiniCard}>
                  <span className={styles.proofMiniVal}>200K+ views</span>
                  <span className={styles.proofMiniDesc}>
                    {lang === 'pt' ? 'Em vídeos editados' : 'On edited videos'}
                  </span>
                </div>
              </div>

              {/* Interactive Channel Details Box */}
              <div className={styles.channelActiveBox}>
                <div className={styles.channelActiveHeader}>
                  <div className={styles.channelActiveAvatar}>
                    <Image 
                      src={activeChannel.logo} 
                      alt={activeChannel.name} 
                      fill 
                      sizes="44px" 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                  <div className={styles.channelActiveMeta}>
                    <span className={styles.channelActiveName}>{activeChannel.name}</span>
                    <span className={styles.channelActiveNiche}>
                      {lang === 'en' ? activeChannel.nicheEn : activeChannel.niche}
                    </span>
                  </div>
                </div>

                <div className={styles.channelActiveStats}>
                  <span className={styles.channelStatTag}>
                    {lang === 'en' ? activeChannel.subsEn : activeChannel.subs}
                  </span>
                  <span className={styles.channelStatTag}>
                    {lang === 'en' ? activeChannel.statEn : activeChannel.stat}
                  </span>
                  <span className={styles.channelRoleTag}>
                    {lang === 'en' ? activeChannel.roleTagEn : activeChannel.roleTag}
                  </span>
                </div>

                <a
                  href={activeChannel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelDirectLink}
                >
                  {lang === 'pt' ? 'Ver canal no YouTube' : 'View channel on YouTube'}
                </a>
              </div>

              {/* Horizontal Channel Selector Strip */}
              <div className={styles.channelStripLabel}>
                {lang === 'pt' ? 'Clique ou passe o mouse nos canais atendidos:' : 'Click or hover to inspect client channels:'}
              </div>
              <div className={styles.channelLogoRow}>
                {internationalChannels.map((channel, idx) => (
                  <button
                    key={channel.id}
                    type="button"
                    className={`${styles.channelThumbBtn} ${idx === activeChannelIdx ? styles.channelThumbActive : ''}`}
                    onClick={() => setActiveChannelIdx(idx)}
                    onMouseEnter={() => setActiveChannelIdx(idx)}
                    aria-label={`Ver detalhes de ${channel.name}`}
                  >
                    <Image 
                      src={channel.logo} 
                      alt={channel.name} 
                      fill 
                      sizes="42px" 
                      style={{ objectFit: 'cover' }} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.roles}>
            {(lang === 'pt' 
              ? ['Edição', 'Pesquisa visual', 'B-roll', 'Sound Design', 'Montagem', 'Entrega']
              : ['Editing', 'Visual Research', 'B-roll', 'Sound Design', 'Assembly', 'Delivery']
            ).map(role => (
              <span key={role} className={styles.roleTag}>{role}</span>
            ))}
          </div>

          <p className={styles.workflow}>
            <strong>{lang === 'pt' ? 'Workflow:' : 'Workflow:'}</strong>{' '}
            {lang === 'pt'
              ? 'recebimento de roteiro + voice-over \u2192 seleção e pesquisa visual \u2192 montagem \u2192 B-roll/inserts \u2192 trilha e sound design \u2192 revisão \u2192 exportação e entrega com timestamps.'
              : 'incoming script + voice-over \u2192 visual research & selection \u2192 assembly \u2192 B-roll/inserts \u2192 score and sound design \u2192 review \u2192 export and timestamped delivery.'}
          </p>

          <div className={styles.result}>
            {lang === 'pt' 
              ? 'Centenas de vídeos editados para uma operação recorrente de conteúdo internacional.'
              : 'Hundreds of videos edited for a recurring international content operation.'}
          </div>

          <div className={styles.case1FooterActions}>
            <a href="#trabalhos" className={styles.jumpToWorksBtn}>
              {lang === 'pt' ? 'Assistir edições selecionadas' : 'Watch selected edits'}
            </a>
          </div>
        </article>

        {/* CASE 02 */}
        <article className={styles.caseCard} id="case-vanlife">
          <div className={styles.caseHeader}>
            <div className={styles.caseNumber}>CASE 02</div>
            <span className={styles.caseBadge}>
              {lang === 'pt' ? 'Canal Próprio / Content Producer' : 'Owned Channel / Content Producer'}
            </span>
          </div>

          <h2 className={styles.title}>Van Life Insider</h2>
          <h3 className={styles.subtitle}>
            {lang === 'pt' ? 'Um canal construído de ponta a ponta' : 'A channel built end-to-end'}
          </h3>

          {/* Media Box for Van Life */}
          <div className={styles.vanLifeHero}>
            <div className={styles.vanLifeBackdrop}>
              <Image 
                src="/VanLifeInsider.jpg" 
                alt="" 
                fill 
                sizes="800px" 
                className={styles.vanLifeBackdropImg} 
              />
            </div>
            <div className={styles.vanLifeAvatarWrap}>
              <Image 
                src="/VanLifeInsider.jpg" 
                alt="Van Life Insider" 
                width={64} 
                height={64} 
                className={styles.vanLifeAvatar} 
              />
            </div>
            <div className={styles.vanLifeViewsLabel}>
              {lang === 'pt' ? 'Destaque de Performance Orgânica' : 'Organic Performance Highlight'}
            </div>
            <div className={styles.vanLifeViewsBig}>45.000+</div>
            <div className={styles.vanLifeViewsLabel}>
              {lang === 'pt' ? 'Visualizações em um único vídeo long-form' : 'Views on a single long-form video'}
            </div>
            <a
              href="https://www.youtube.com/@VanLifeInsider"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ytButton}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              {lang === 'pt' ? 'Assistir no YouTube' : 'Watch on YouTube'}
            </a>
          </div>

          <p className={styles.text}>
            {lang === 'pt'
              ? 'Canal próprio com produção completa: pesquisa, roteiro, thumbnail, edição, publicação e análise de performance.'
              : 'Self-owned channel with full production: research, scripting, thumbnails, editing, publishing and performance analysis.'}
          </p>

          <div className={styles.processFlow}>
            {lang === 'pt'
              ? 'Pesquisa \u2192 Roteiro \u2192 Thumbnail \u2192 Edição \u2192 Publicação \u2192 Análise'
              : 'Research \u2192 Script \u2192 Thumbnail \u2192 Editing \u2192 Publishing \u2192 Analysis'}
          </div>

          <div className={styles.metrics}>
            <span>{lang === 'pt' ? '22 vídeos long-form' : '22 long-form videos'}</span>
            <span className={styles.separator}>|</span>
            <span>71K+ views totais</span>
            <span className={styles.separator}>|</span>
            <span>580+ inscritos</span>
            <span className={styles.separator}>|</span>
            <span>{lang === 'pt' ? '45K no maior vídeo' : '45K on top video'}</span>
          </div>

          <div className={styles.note}>
            {lang === 'pt'
              ? '* Case de produção completa, unindo estratégia de conteúdo, embalagem, edição e análise de performance.'
              : '* End-to-end production case uniting content strategy, packaging, editing and performance analysis.'}
          </div>
        </article>

        {/* CASE 03 */}
        <article className={styles.caseCard}>
          <div className={styles.caseHeader}>
            <div className={styles.caseNumber}>CASE 03</div>
            <span className={styles.caseBadge}>
              {lang === 'pt' ? 'Corporativo · Produto Digital' : 'Corporate · Digital Product'}
            </span>
          </div>

          <h2 className={styles.title}>Grupo Multi · E-Multitech</h2>
          <h3 className={styles.subtitle}>
            {lang === 'pt' ? 'Comunicação audiovisual para produto digital' : 'Audiovisual communication for a digital product'}
          </h3>

          {/* Smartphone Mockup / Product Video */}
          <div className={styles.mediaContainer}>
            <div className={styles.videoTopBadge}>
              {lang === 'pt' ? 'Vídeo institucional · 1:02 · Motion + UI demo' : 'Institutional video · 1:02 · Motion + UI demo'}
            </div>
            <video
              src="/Multilaser.mp4"
              poster="/proofs/emultitech.webp"
              controls
              playsInline
              muted
              className={styles.videoPlayer}
            />
          </div>

          <p className={styles.text}>
            {lang === 'pt'
              ? 'Produzi 3 vídeos institucionais para apresentação de produtos e sistemas internos do Grupo Multi, combinando edição, motion, captura de interface e ferramentas de IA.'
              : 'Produced 3 institutional videos for internal systems and product presentation at Grupo Multi, combining editing, motion, interface capture and AI tools.'}
          </p>

          <div className={styles.roles}>
            {['Premiere Pro', 'After Effects', 'ElevenLabs', 'GPT'].map(tool => (
              <span key={tool} className={styles.roleTag}>{tool}</span>
            ))}
          </div>

          <ol className={styles.breakdown}>
            <li>{lang === 'pt' ? '01 Mockup de smartphone criado e animado no After Effects' : '01 Smartphone mockup created and animated in After Effects'}</li>
            <li>{lang === 'pt' ? '02 Captura da interface real do produto' : '02 Real product interface capture'}</li>
            <li>{lang === 'pt' ? '03 Roteiro com apoio de IA e narração via ElevenLabs' : '03 Script supported by AI and voiceover via ElevenLabs'}</li>
            <li>{lang === 'pt' ? '04 Motion, trilha e montagem final' : '04 Motion, score and final assembly'}</li>
          </ol>

          <a
            href="https://www.behance.net/gallery/243412563/Apresentacao-E-Multitech"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.behanceGhostBtn}
          >
            {lang === 'pt'
              ? 'Case completo no Behance + processo de criação'
              : 'Full case on Behance + creative process'}
          </a>
        </article>
      </div>
    </section>
  );
}
