import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowUp, CheckCircle, List, X, Square } from '@phosphor-icons/react';
import { sendContactRequest } from './contact.js';

const paths = [
  { name: 'Leggere i numeri', category: 'Economia e finanza', title: 'Capire dove sei.\nScegliere dove andare.', description: 'Un bilancio racconta molto, se sai dove guardare. Mettiamo in relazione risultati, flussi di cassa e fabbisogni finanziari per dare una base concreta alle scelte dell’impresa.', items: ['Analisi di bilancio e flussi di cassa', 'Pianificazione economico-finanziaria', 'Controllo di gestione e reporting'], question: 'Vorrei un confronto sui numeri della mia impresa.' },
  { name: 'Rafforzare gli assetti', category: 'Organizzazione e governance', title: 'Una struttura solida.\nUna visione d’insieme.', description: 'L’organizzazione deve aiutare l’impresa a leggere ciò che accade e ad anticipare le difficoltà. Lavoriamo sugli assetti organizzativi, amministrativi e contabili, adeguati alla natura e alle dimensioni dell’impresa, collegando responsabilità, informazioni e decisioni.', items: ['Assetti organizzativi, amministrativi e contabili', 'Indicatori e segnali di squilibrio', 'Strumenti a supporto delle decisioni'], question: 'Vorrei un confronto sugli assetti della mia impresa.' },
  { name: 'Affrontare una crisi', category: 'Crisi e ristrutturazione', title: 'Fare chiarezza.\nCostruire un percorso.', description: 'Nei momenti complessi serve una lettura indipendente della situazione. Analizziamo gli squilibri, valutiamo le alternative di risanamento e affianchiamo l’impresa nella definizione del percorso.', items: ['Analisi della situazione aziendale', 'Piani di risanamento e ristrutturazione', 'Confronto con banche e creditori'], question: 'Vorrei un confronto su una situazione di crisi aziendale.' },
  { name: 'Preparare un passaggio', category: 'Fiscalità e continuità', title: 'Dare forma al futuro.\nCon attenzione al presente.', description: 'Una riorganizzazione o un passaggio generazionale coinvolgono persone, patrimonio e continuità. Colleghiamo gli aspetti fiscali e contabili alle prospettive dell’impresa, per valutare le scelte nel loro insieme.', items: ['Pianificazione fiscale e contabilità', 'Riorganizzazioni aziendali', 'Passaggi generazionali e successione'], question: 'Vorrei un confronto su un passaggio o una riorganizzazione aziendale.' },
];

function TextLink({ children, className = '', ...props }) {
  return <a className={`text-link ${className}`} {...props}><span>{children}</span><ArrowUpRight size={26} weight="regular" aria-hidden="true" /></a>;
}

function usePageMotion(heroRef, financeRef) {
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const targets = [...document.querySelectorAll('[data-reveal]')];
    const profile = document.querySelector('.studio-profile');
    let observer;
    let frame = 0;
    const root = document.documentElement;
    function update() {
      frame = 0;
      const y = window.scrollY;
      const max = root.scrollHeight - innerHeight;
      root.style.setProperty('--page-progress', max > 0 ? y / max : 0);
      if (media.matches) return;
      const heroHeight = heroRef.current?.offsetHeight || innerHeight;
      const rect = financeRef.current?.getBoundingClientRect();
      const profileRect = profile?.getBoundingClientRect();
      heroRef.current?.style.setProperty('--hero-progress', Math.min(y / heroHeight, 1).toFixed(4));
      if (rect) {
        const p = Math.max(-1, Math.min(1, (innerHeight / 2 - (rect.top + rect.height / 2)) / innerHeight));
        financeRef.current.style.setProperty('--image-shift', `${p * 48}px`);
      }
      if (profileRect) {
        const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - (profileRect.top + profileRect.height / 2)) / innerHeight));
        profile.style.setProperty('--profile-travel', `${progress * 22}px`);
      }
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(update); }
    function setup() {
      observer?.disconnect();
      if (media.matches) {
        root.classList.remove('motion-ready');
        heroRef.current?.style.setProperty('--hero-progress', 0);
        financeRef.current?.style.setProperty('--image-shift', '0px');
        profile?.style.setProperty('--profile-travel', '0px');
        targets.forEach(el => el.classList.add('is-visible'));
      } else {
        root.classList.add('motion-ready');
        observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
        targets.forEach(el => observer.observe(el));
      }
      update();
    }
    setup();
    media.addEventListener('change', setup);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      observer?.disconnect();
      media.removeEventListener('change', setup);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove('motion-ready');
    };
  }, [heroRef, financeRef]);
}

function StudioPortrait() {
  const stage = useRef(null);
  const frame = useRef(0);
  const rotation = useRef([0, 0]);
  function reset() {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = 0;
    stage.current?.style.setProperty('--portrait-rx', '0deg');
    stage.current?.style.setProperty('--portrait-ry', '0deg');
  }
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    media.addEventListener('change', reset);
    return () => { media.removeEventListener('change', reset); if (frame.current) cancelAnimationFrame(frame.current); };
  }, []);
  function move(event) {
    if (event.pointerType === 'touch' || !matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    rotation.current = [((event.clientY - box.top) / box.height - .5) * -3.2, ((event.clientX - box.left) / box.width - .5) * 4];
    if (!frame.current) frame.current = requestAnimationFrame(() => {
      stage.current?.style.setProperty('--portrait-rx', `${rotation.current[0]}deg`);
      stage.current?.style.setProperty('--portrait-ry', `${rotation.current[1]}deg`);
      frame.current = 0;
    });
  }
  return <figure className="studio-profile" data-reveal>
    <div className="profile-stage" ref={stage} onPointerMove={move} onPointerLeave={reset}>
      <div className="profile-photo-window"><img className="profile-image" src="/assets/antonio-balsamo.jpg" alt="Dott. Antonio Balsamo" width="1122" height="1402" loading="lazy" /></div>
    </div>
    <figcaption className="profile-caption"><span className="eyebrow">Il tuo interlocutore</span><h3>Dott. Antonio<br />Balsamo</h3><p>Dottore Commercialista<br />Revisore Legale</p></figcaption>
  </figure>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  useEffect(() => {
    function escape(e) {
      if (e.key === 'Escape' && open) { setOpen(false); trigger.current?.focus(); }
    }
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  return <header className="site-header">
    <a className="wordmark" href="#inizio" aria-label="Studio Balsamo, inizio pagina"><strong>STUDIO BALSAMO</strong><span>Commercialista · Consulenza d’impresa</span></a>
    <button className="menu-toggle" ref={trigger} aria-expanded={open} aria-controls="navigation" aria-label={open ? 'Chiudi menu' : 'Apri menu'} onClick={() => setOpen(!open)}>{open ? <X size={26} /> : <List size={26} />}</button>
    <nav id="navigation" className={`navigation${open ? ' is-open' : ''}`} aria-label="Navigazione principale" onClick={e => { if (e.target.closest('a')) setOpen(false); }}>
      <a className="mobile-nav-item" href="#percorsi">Le tue scelte</a><a href="#studio">Lo Studio</a><Square className="nav-mark" size={8} weight="fill" aria-hidden="true" /><a href="#contatti">Contatti <ArrowUpRight size={20} aria-hidden="true" /></a>
    </nav>
  </header>;
}

function ContactForm({ topic, onTopicChange }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [errors, setErrors] = useState({});
  const success = useRef(null);
  const inFlight = useRef(false);
  useEffect(() => { if (submitted) success.current?.focus(); }, [submitted]);
  async function submit(e) {
    e.preventDefault();
    if (inFlight.current) return;
    const data = new FormData(e.currentTarget);
    const next = {};
    if (!data.get('nome')?.trim()) next.nome = 'Inserisci il tuo nome.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get('email')?.trim() || '')) next.email = 'Inserisci un indirizzo email valido.';
    if (!data.get('messaggio')?.trim()) next.messaggio = 'Descrivi brevemente la tua richiesta.';
    setErrors(next);
    setSendError('');
    if (Object.keys(next).length) { e.currentTarget.elements[Object.keys(next)[0]].focus(); return; }
    data.set('nome', data.get('nome').trim());
    data.set('email', data.get('email').trim());
    data.set('messaggio', data.get('messaggio').trim());
    data.set('argomento', paths[Number(topic)] && topic !== '' ? paths[Number(topic)].name : 'Un primo confronto');
    data.set('_subject', 'Nuova richiesta di contatto dal sito Studio Balsamo');
    inFlight.current = true;
    setSending(true);
    try {
      await sendContactRequest(data);
      setSubmitted(true);
    } catch {
      setSendError('Non è stato possibile confermare l’invio. I dati restano nel modulo. Puoi riprovare oppure scrivere a info@studiobalsamo.com.');
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }
  if (submitted) return <div className="form-success" ref={success} tabIndex={-1} role="status"><CheckCircle size={38} weight="light" aria-hidden="true" /><h3>La richiesta è stata inviata.</h3><p>Grazie per aver contattato lo Studio. Ti risponderemo all’indirizzo email indicato.</p><button className="text-link" onClick={() => { setSubmitted(false); setErrors({}); setSendError(''); }}>Scrivi un altro messaggio <ArrowRight size={22} aria-hidden="true" /></button></div>;
  return <form className="contact-form" noValidate onSubmit={submit} aria-busy={sending}>
    <div className="form-heading"><span className="eyebrow">Iniziamo da qui</span><p>I campi con * sono richiesti.</p></div>
    <div className="field-row">
      <div className="field"><label htmlFor="contact-name">Nome e cognome *</label><input id="contact-name" name="nome" autoComplete="name" placeholder="Il tuo nome" aria-invalid={!!errors.nome} aria-describedby={errors.nome ? 'error-name' : undefined} required />{errors.nome && <span className="field-error" id="error-name">{errors.nome}</span>}</div>
      <div className="field"><label htmlFor="contact-email">Email *</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="nome@azienda.it" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'error-email' : undefined} required />{errors.email && <span className="field-error" id="error-email">{errors.email}</span>}</div>
    </div>
    <div className="field"><label htmlFor="contact-topic">Da dove partiamo?</label><select id="contact-topic" name="argomento" value={topic} onChange={e => onTopicChange(e.target.value)}><option value="">Un primo confronto</option>{paths.map((path, i) => <option key={path.name} value={i}>{path.name}</option>)}</select></div>
    <div className="field"><label htmlFor="contact-message">La tua situazione *</label><textarea id="contact-message" name="messaggio" rows={3} placeholder="Raccontaci brevemente la tua impresa e le tue priorità." aria-invalid={!!errors.messaggio} aria-describedby={errors.messaggio ? 'error-message' : undefined} required />{errors.messaggio && <span className="field-error" id="error-message">{errors.messaggio}</span>}</div>
    {sendError && <p className="send-error" role="alert">{sendError}</p>}
    <div className="form-bottom"><button className="submit-link" type="submit" disabled={sending}>{sending ? 'Invio in corso…' : 'Invia la richiesta'} <ArrowUpRight size={29} aria-hidden="true" /></button><p>Usiamo i dati per rispondere alla richiesta.<br />L’invio avviene tramite Formspree.</p></div>
  </form>;
}

export function App() {
  const hero = useRef(null);
  const finance = useRef(null);
  const tabs = useRef([]);
  const [active, setActive] = useState(0);
  const [topic, setTopic] = useState('');
  usePageMotion(hero, finance);
  function changeTab(e, i) {
    let next;
    if (['ArrowDown', 'ArrowRight'].includes(e.key)) next = (i + 1) % paths.length;
    if (['ArrowUp', 'ArrowLeft'].includes(e.key)) next = (i + paths.length - 1) % paths.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = paths.length - 1;
    if (next !== undefined) { e.preventDefault(); setActive(next); tabs.current[next]?.focus(); }
  }
  return <>
    <a className="skip-link" href="#main">Vai al contenuto</a>
    <div className="reading-progress" aria-hidden="true" />
    <main id="main">
      <section className="hero" id="inizio" aria-labelledby="hero-title" ref={hero}>
        <Header />
        <h1 className="hero-title" id="hero-title"><span className="hero-title-top"><span>Le decisioni</span></span><span className="hero-title-bottom"><span>si prendono insieme.</span></span></h1>
        <div className="hero-portrait"><img src="/assets/antonio-balsamo-cutout.webp" alt="Antonio Balsamo, commercialista" width="1122" height="1402" fetchPriority="high" /></div>
        <p className="hero-intro">Bilanci, assetti e scelte<br className="desktop-break" /> d’impresa.<br />Una visione chiara.<br />Un rapporto diretto.</p>
        <div className="hero-person"><div className="person-name"><p>Antonio Balsamo</p><span>Commercialista</span></div><TextLink href="#contatti">Confrontiamoci</TextLink></div>
      </section>

      <section className="numbers" id="numeri" aria-labelledby="numbers-title" ref={finance}>
        <img className="numbers-image" src="/assets/bilancio-editoriale.webp" alt="Conto economico e stato patrimoniale, calcolatrice e annotazioni di pianificazione aziendale. Dati esemplificativi." width="1729" height="910" />
        <p className="image-note">Dati esemplificativi</p>
        <div className="numbers-copy" data-reveal><h2 id="numbers-title">Entriamo<br />nei numeri.</h2><p>Dalla lettura del bilancio alle scelte che contano.</p></div>
      </section>

      <section className="paths section-pad" id="percorsi" aria-labelledby="paths-title">
        <div className="section-kicker" data-reveal><span className="eyebrow">Le tue scelte</span><span className="eyebrow">Un percorso, da costruire insieme</span></div>
        <h2 className="section-title" id="paths-title" data-reveal>Ogni impresa ha<br />un <span className="coral">prossimo passo.</span></h2>
        <div className="paths-layout" data-reveal>
          <div className="path-tabs" role="tablist" aria-label="Esplora le esigenze dell’impresa" aria-orientation="vertical">{paths.map((path, i) => <button ref={el => { tabs.current[i] = el; }} key={path.name} id={`path-tab-${i}`} type="button" role="tab" aria-selected={active === i} aria-controls={`path-panel-${i}`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => changeTab(e, i)}><span className="path-number">0{i + 1}</span><span>{path.name}</span><ArrowUpRight size={28} aria-hidden="true" /></button>)}</div>
          {paths.map((path, i) => <div className="path-panel" id={`path-panel-${i}`} key={path.name} role="tabpanel" aria-labelledby={`path-tab-${i}`} hidden={active !== i} tabIndex={0}><div className="path-content" key={active}><p className="eyebrow">{path.category}</p><h3>{path.title.split('\n').map(line => <span key={line}>{line}</span>)}</h3><p className="path-description">{path.description}</p><ul>{path.items.map(item => <li key={item}>{item}</li>)}</ul><TextLink href="#contatti" onClick={() => setTopic(String(i))}>Parliamo di questo</TextLink></div></div>)}
        </div>
      </section>

      <section className="studio section-pad" id="studio" aria-labelledby="studio-title">
        <div className="section-kicker" data-reveal><span className="eyebrow">Lo Studio</span><span className="eyebrow">Antonio Balsamo</span></div>
        <h2 className="studio-title" id="studio-title" data-reveal>Dietro un bilancio,<br />c’è <span>la tua impresa.</span></h2>
        <div className="studio-body"><StudioPortrait /><div className="studio-description" data-reveal><p className="lead">E dietro ogni decisione, una persona.<br />Per questo il rapporto è diretto.</p><p>Affianchiamo imprenditori e aziende nella gestione della crisi, nella ristrutturazione dei debiti e nelle scelte che incidono sull’equilibrio e sulla continuità dell’attività.</p><p>Partiamo dall’ascolto e da una lettura rigorosa dei dati. Mettiamo in relazione gli aspetti economici, finanziari e organizzativi per costruire una visione chiara delle alternative.</p><p className="network-note">Quando l’incarico lo richiede, il confronto si estende a professionisti dell’area legale, del lavoro e della revisione.</p></div></div>
        <div className="working-lines" aria-label="Come lavoriamo">{[['Ascoltare.', 'Comprendere l’impresa, il contesto e le priorità.'], ['Mettere a fuoco.', 'Leggere i dati e valutare le alternative.'], ['Accompagnare.', 'Definire i passi e seguirne l’attuazione.']].map(([title, description], i) => <div className="working-line" data-reveal key={title}><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight size={30} aria-hidden="true" /></div>)}</div>
      </section>

      <section className="contact section-pad" id="contatti" aria-labelledby="contact-title">
        <div className="section-kicker" data-reveal><span className="eyebrow">Il prossimo passo</span><span className="eyebrow">In presenza o a distanza</span></div>
        <h2 className="contact-title" id="contact-title" data-reveal>Cominciamo<br />da <span>un confronto.</span></h2>
        <div className="contact-layout"><div className="contact-intro" data-reveal><p>Raccontaci la tua impresa.<br />Mettiamo a fuoco le priorità,<br />poi scegliamo come procedere.</p><a className="email-link" href="mailto:info@studiobalsamo.com">info@studiobalsamo.com <ArrowUpRight size={23} aria-hidden="true" /></a><div className="offices"><span className="eyebrow">Su appuntamento</span><p>Firenze · Caltanissetta · Agrigento</p></div></div><div data-reveal><ContactForm topic={topic} onTopicChange={setTopic} /></div></div>
      </section>
    </main>
    <footer className="footer"><div className="footer-top"><a href="#inizio" className="footer-wordmark">Studio Balsamo.</a><a className="back-top" href="#inizio" aria-label="Torna all’inizio"><ArrowUp size={27} aria-hidden="true" /></a></div><div className="footer-bottom"><span>© 2026 Studio Balsamo</span><span>Commercialista · Consulenza d’impresa</span><span>Firenze · Caltanissetta · Agrigento</span></div></footer>
  </>;
}
