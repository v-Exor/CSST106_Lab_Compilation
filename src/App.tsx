import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Box, ChartColumn, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Code2, ExternalLink, FileText, Image, Info, Layers, LayoutGrid, List, Maximize2, Menu, Scan, ScanEye, Search, Sparkles, SquareDashed, X } from 'lucide-react'
import { laboratories, categories, safeUrl, statusLabels, type Laboratory } from './config/laboratories'
import { portfolio } from './config/portfolio'
import { HeroArtwork, LabArtwork } from './components/Artwork'

const icons = { image: Image, edges: Scan, histogram: ChartColumn, features: ScanEye, pca: Layers, detection: Box, upcoming: Sparkles }

function getRoute() { return window.location.hash.replace(/^#/, '') || '/' }

function ExternalAction({ url, children, className = '', pending = 'Link not configured' }: { url: string; children: ReactNode; className?: string; pending?: string }) {
  const href = safeUrl(url)
  return href ? <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a> : <button className={className} disabled title={pending} aria-label={pending}>{children}</button>
}

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#/" className={`brand ${footer ? 'footer-brand' : ''}`} aria-label="Vision Lab, home"><span className="brand-icon"><ScanEye size={24} strokeWidth={1.8}/></span><span>vision<span className="brand-light">lab</span><span className="brand-period">.</span><small>CSST106 · COMPUTER VISION</small></span></a>
}

function CreatorCredit() {
  if (!portfolio.student.name) return null
  return <div className="creator-ribbon" role="note" aria-label="Portfolio creator"><div className="container creator-credit"><span className="creator-credit-label">Created by</span><strong>{portfolio.student.name}</strong>{portfolio.student.section && <span className="creator-credit-section">{portfolio.student.section}</span>}</div></div>
}

function Header({ route }: { route: string }) {
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [route])
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [])
  const links = [['/', 'Home'], ['/laboratories', 'Laboratories'], ['/about', 'About'], ['/documentation', 'Documentation']]
  return <header className="site-header"><div className="container header-inner">
    <Brand/>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([path, label]) => <a key={path} href={`#${path}`} className={route === path || (path === '/laboratories' && route.startsWith('/lab/')) ? 'active' : ''} aria-current={route === path ? 'page' : undefined}>{label}</a>)}</nav>

    <button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X/> : <Menu/>}</button>
  </div><CreatorCredit/>{open && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">{links.map(([path, label]) => <a key={path} href={`#${path}`} onClick={() => setOpen(false)} aria-current={route === path ? 'page' : undefined}>{label}<ArrowUpRight size={16}/></a>)}</nav>}</header>
}

function Eyebrow({ children, dot = false }: { children: ReactNode; dot?: boolean }) {
  return <span className={`eyebrow ${dot ? 'eyebrow-pill' : ''}`}>{dot && <span className="tiny-orange-dot"/>}{children}</span>
}

function Hero() {
  return <section className="hero container"><div className="hero-copy">
    <Eyebrow dot>A COLLECTION OF CURIOSITY</Eyebrow>
    <h1>Computer Vision<br/><span>Laboratory</span><br/>Portfolio<span className="orange-period">.</span></h1>
    <p className="hero-description">An interactive collection of seven laboratory experiments exploring image processing, feature detection, machine learning, and computer vision techniques.</p>
    <div className="hero-actions"><a className="button primary" href="#/laboratories">Explore Laboratories<ArrowUpRight size={18}/></a></div>
    <div className="hero-footnote"><span className="mini-stack"><Image size={13}/><Scan size={13}/><Layers size={13}/></span><span>Small experiments. Bigger understanding.</span></div>
  </div><HeroArtwork/></section>
}

function Stats() {
  return <section className="stats container" aria-label="Portfolio at a glance">
    <div><span className="stat-number">07<span> /</span></span><span className="stat-label">Laboratory activities<small>A journey through computer vision</small></span></div>
    <div><span className="stat-number">01<span> /</span></span><span className="stat-label">Connected portfolio<small>Everything in one place</small></span></div>
    <div><span className="stat-symbol"><Layers size={27} strokeWidth={1.5}/></span><span className="stat-label">Independent lab destinations<small>Ready to connect when deployed</small></span></div>
    <div><span className="stat-symbol"><ScanEye size={28} strokeWidth={1.5}/></span><span className="stat-label">Vision meets intelligence<small>From pixels to predictions</small></span></div>
  </section>
}

function LabCard({ lab }: { lab: Laboratory }) {
  const Icon = icons[lab.icon]
  return <article className={`lab-card ${lab.id === '07' ? 'upcoming-card' : ''}`}>
    <a className="card-art-link" href={`#/lab/${lab.id}`} aria-label={`Explore Laboratory ${lab.id}: ${lab.title}`}><LabArtwork kind={lab.icon}/><span className="art-category">{lab.category}</span><span className="art-open"><ArrowUpRight size={18}/></span></a>
    <div className="card-body"><div className="card-topline"><span className="lab-number">LABORATORY {lab.id}</span><span className={`status status-${lab.status}`}><i/>{statusLabels[lab.status]}</span></div>
      <h3><a href={`#/lab/${lab.id}`}>{lab.title}</a></h3><p>{lab.description}</p>
      <div className="tags">{lab.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="card-actions"><ExternalAction url={lab.liveUrl} className="launch-button" pending={`Laboratory ${lab.id} live URL not configured`}><Icon size={15}/>Launch Laboratory<ArrowUpRight size={15}/></ExternalAction></div>
      <a className="details-link" href={`#/lab/${lab.id}`}>Explore Details<ArrowRight size={14}/></a>
    </div>
  </article>
}

function Collection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2'
  const [category, setCategory] = useState<string>('All activities')
  const [query, setQuery] = useState('')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const filtered = laboratories.filter(lab => (category === 'All activities' || lab.category === category) && `${lab.id} ${lab.title} ${lab.description} ${lab.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase().trim()))
  return <section className={`collection ${standalone ? 'standalone-collection' : ''}`} id="laboratories"><div className="container">
    <div className="section-heading"><div><Eyebrow>THE LABORATORY COLLECTION</Eyebrow><Heading>Seven experiments.<br className="mobile-break"/> <span>Endless perspectives.</span></Heading><p>A hands-on journey from the fundamentals of images to intelligent visual systems.</p></div><span className="collection-count"><span>07</span> activities to explore<ArrowDown size={16}/></span></div>
    <div className="collection-toolbar"><div className="filters" role="group" aria-label="Filter laboratories by topic">{categories.map(item => <button className={category === item ? 'selected' : ''} onClick={() => setCategory(item)} key={item} aria-pressed={category === item}>{item === 'All activities' && <LayoutGrid size={14}/>} {item}{item === 'All activities' && <span>7</span>}</button>)}</div>
      <div className="collection-tools"><label className="search-field"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a laboratory…" aria-label="Search laboratories"/>{query && <button className="clear-search" onClick={() => setQuery('')} aria-label="Clear search"><X size={13}/></button>}</label><div className="layout-toggle" role="group" aria-label="Collection layout"><button aria-label="Grid view" aria-pressed={layout === 'grid'} onClick={() => setLayout('grid')} className={layout === 'grid' ? 'selected' : ''}><LayoutGrid size={16}/></button><button aria-label="List view" aria-pressed={layout === 'list'} onClick={() => setLayout('list')} className={layout === 'list' ? 'selected' : ''}><List size={18}/></button></div></div>
    </div>
    <p className="sr-only" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'activity' : 'activities'} found</p>
    {filtered.length ? <div className={`lab-grid ${layout === 'list' ? 'list-layout' : ''}`}>{filtered.map(lab => <LabCard lab={lab} key={lab.id}/>)}</div> : <div className="empty-state"><Search size={32}/><h3>No laboratories found</h3><p>Try another keyword or explore all seven activities.</p><button className="button secondary" onClick={() => {setCategory('All activities');setQuery('')}}>Reset filters<ArrowRight size={16}/></button></div>}
    <div className="collection-note"><Info size={16}/><p>This portfolio is ready to explore. Laboratory documents, implementations, and deployed links are awaiting connection.</p><a href="#/documentation">How it connects<ArrowUpRight size={14}/></a></div>
  </div></section>
}

function AboutTeaser() {
  return <section className="about-teaser container"><div className="about-visual" aria-hidden="true"><span className="about-cross cross-one">+</span><span className="about-cross cross-two">+</span><div className="about-visual-center"><ScanEye size={60} strokeWidth={1}/><span>SEE BEYOND THE SURFACE</span></div><div className="about-ring"/><span className="about-coordinate">x: curiosity &nbsp; y: discovery</span></div><div><Eyebrow>MORE THAN A COMPILATION</Eyebrow><h2>Learning to see.<br/><span>Building to understand.</span></h2><p>Computer vision turns visual information into understanding. This collection brings the learning process together, connecting each laboratory’s ideas, documentation, and independent application in one considered space.</p><a href="#/about" className="inline-link">About this project<ArrowUpRight size={17}/></a></div></section>
}

function DocsBanner() {
  return <section className="container"><div className="docs-banner"><div className="docs-banner-icon"><BookOpen size={28} strokeWidth={1.5}/></div><div><Eyebrow>THE THINKING BEHIND THE WORK</Eyebrow><h2>A little context goes a long way.</h2><p>Explore the activity guide, project structure, and how everything connects.</p></div><a className="button secondary" href="#/documentation">Read Documentation<ArrowUpRight size={17}/></a></div></section>
}

function PageHeading({ eyebrow, title, accent, children }: { eyebrow: string; title: string; accent?: string; children: ReactNode }) {
  return <div className="page-heading"><Eyebrow>{eyebrow}</Eyebrow><h1>{title} {accent && <span>{accent}</span>}</h1><p>{children}</p></div>
}

function About() {
  return <div className="container page-content"><PageHeading eyebrow="ABOUT THE PROJECT" title="A place for curiosity" accent="to become understanding.">One compilation. Seven laboratory activities. A connected view of the ideas and practice behind computer vision.</PageHeading>
    <div className="about-page-grid"><div className="content-panel"><span className="panel-icon"><ScanEye/></span><h2>Learning through exploration</h2><p>Created for CSST106 — Computer Vision, this portfolio organizes seven laboratory activities into a single web interface. It traces a path from image fundamentals and edge detection to feature analysis, dimensionality reduction, and object detection.</p><p>Each activity has a central detail page for its context and supporting materials, with a dedicated destination for its independently hosted application. Where embedding is supported, that application can be accessed directly from this portfolio.</p><div className="notice"><Info size={18}/><p>This website is the compilation portal. Laboratory algorithms run in their separate applications. Activity-specific instructions and verified results will be added when supplied.</p></div></div>
    <aside className="content-panel student-panel"><Eyebrow>THE PERSON BEHIND THE PIXELS</Eyebrow><div className="student-avatar"><ScanEye size={35}/></div><h2>{portfolio.student.name || 'Student portfolio'}</h2><p className="muted">Academic information</p><dl><div><dt>Student name</dt><dd>{portfolio.student.name || 'Not yet provided'}</dd></div><div><dt>Course</dt><dd>{portfolio.course} — {portfolio.courseName}</dd></div><div><dt>Section</dt><dd>{portfolio.student.section || 'Not yet provided'}</dd></div><div><dt>Instructor</dt><dd>{portfolio.student.instructor || 'Not yet provided'}</dd></div></dl><p className="small-note">Student information can be updated in the portfolio configuration.</p></aside></div>
    <div className="section-heading technology-heading"><div><Eyebrow>BUILT WITH INTENTION</Eyebrow><h2>Simple foundations. <span>Room to grow.</span></h2></div></div><div className="principle-grid">{[[Code2,'A modern foundation','React, TypeScript, Vite, and Tailwind CSS provide a lightweight, maintainable static website.'],[Layers,'One connected experience','Shared navigation and centralized configuration keep all seven laboratory destinations organized.'],[ScanEye,'An honest record of learning','Materials, outputs, and completion statuses reflect the work actually supplied and verified.']].map(([Icon,title,description]) => { const I = Icon as typeof Code2;return <div className="content-panel principle" key={String(title)}><I size={23}/><h3>{String(title)}</h3><p>{String(description)}</p></div>})}</div>
  </div>
}

const documentation = [
  { title: 'How to explore the collection', body: 'Browse all seven activities from Laboratories. Search by title, number, or technique, and use topic filters to narrow the collection. Explore Details opens each activity’s central page. The Workspace tab provides embedded access when enabled; Launch Laboratory opens the configured independent application in a new tab.' },
  { title: 'Accessing the laboratories', body: 'Launch Laboratory opens the published activity in a separate tab. Explore Details shows its overview, workspace, and supporting resources.' },
  { title: 'The integrated laboratory workspace', body: 'Set embed to true only after verifying the independent application permits embedding and works inside an iframe. Some camera, fullscreen, download, or external authentication features may require a separate tab. The workspace always offers the external launch alternative. Cross-origin embedding restrictions cannot reliably be detected by this portal; if a frame stays blank, use Open in New Tab.' },
  { title: 'Activity instructions, reports, and results', body: 'The topic summaries come from the master project brief. Word laboratory documents, source implementations, reports, screenshots, and actual results have not been supplied. These must be used as the source of truth before adding procedures, algorithms, conclusions, or verified completion statuses. Add reports under public/reports and set reportUrl, or use an HTTPS document link.' },
  { title: 'GitHub Pages deployment', body: 'The included GitHub Actions workflow installs locked dependencies, checks TypeScript, builds the portfolio, and deploys dist to GitHub Pages. In the repository, choose Settings → Pages → Source → GitHub Actions. The relative Vite base and hash routes support repository subpaths and page refreshes. See README.md for the full setup and custom-domain guidance.' },
  { title: 'Browser support and laboratory runtimes', body: 'This portal is a static React website. GitHub Pages cannot execute Python or a backend server. The SURF laboratory must disclose its actual algorithm and runtime support; ORB or SIFT are different algorithms. YOLOv8 must run real inference before being marked available. Any browser adaptation of an original Python implementation should be explicitly documented in the independent lab.' },
]

function Documentation() {
  return <div className="container page-content"><PageHeading eyebrow="THE PROJECT GUIDE" title="Everything connects." accent="Start here.">A guide to navigating the collection, connecting independent applications, and keeping an accurate record of each activity.</PageHeading>
    <div className="documentation-grid"><aside className="docs-sidebar"><span className="panel-icon"><BookOpen/></span><h3>Portfolio guide</h3><p>From exploration to deployment.</p><a href="#/laboratories">Browse laboratories<ArrowUpRight size={15}/></a><div className="docs-sidebar-note"><Clock3 size={18}/><strong>Materials are pending</strong><p>Activity documents and reports will appear here when provided.</p></div></aside><div className="accordion">{documentation.map((item,i) => <details key={item.title} open={i===0}><summary><span className="doc-number">0{i+1}</span><span>{item.title}</span><ChevronDown size={18}/></summary><p>{item.body}</p></details>)}</div></div>
    <div className="section-heading"><div><Eyebrow>ACTIVITY INDEX</Eyebrow><h2>The collection, <span>at a glance.</span></h2></div></div><div className="activity-index">{laboratories.map(lab => <a href={`#/lab/${lab.id}`} key={lab.id}><span className="index-number">{lab.id}</span><span><strong>{lab.title}</strong><small>{lab.category}</small></span><span className="index-status">{statusLabels[lab.status]}</span><ArrowUpRight size={18}/></a>)}</div>
  </div>
}

function Workspace({ lab }: { lab: Laboratory }) {
  const url = safeUrl(lab.liveUrl)
  const [started, setStarted] = useState(false)
  const [loaded, setLoaded] = useState(false)
  return <div className="workspace"><div className="workspace-toolbar"><span><ScanEye size={18}/>Integrated workspace</span><ExternalAction url={lab.liveUrl} className="inline-link" pending="Live laboratory URL not configured">Open in New Tab<ExternalLink size={14}/></ExternalAction></div>
    {url && lab.embed && started ? <><div className="embed-notice"><Info size={15}/><p>If the application does not appear, use Open in New Tab. Its hosting or browser permissions may prevent embedding.</p></div>{!loaded && <div className="frame-loading" role="status"><span className="spinner"/>Loading laboratory frame…</div>}<iframe src={url} title={`Laboratory ${lab.id}: ${lab.title}`} className="lab-frame" onLoad={() => setLoaded(true)} sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-pointer-lock" allow="fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></> : <div className="workspace-empty"><span className="workspace-empty-icon"><SquareDashed size={42} strokeWidth={1.2}/></span><Eyebrow>ONE CONNECTED EXPERIENCE</Eyebrow><h2>{!url ? 'A space for the experiment.' : lab.embed ? 'Your laboratory, right here.' : 'This laboratory opens separately.'}</h2><p>{!url ? 'The independent laboratory hasn’t been connected yet. Its application will be accessible here once a deployed URL is added.' : lab.embed ? 'Load the independent application inside this portfolio. You can also open it in its own tab.' : 'Embedding is not enabled for this activity. Open its independent website to explore the application.'}</p>{url && lab.embed ? <button className="button primary" onClick={() => setStarted(true)}>Load Laboratory<Maximize2 size={16}/></button> : <ExternalAction url={lab.liveUrl} className="button primary" pending="Awaiting the deployed laboratory URL">{url ? 'Launch Laboratory' : 'Live link pending'}<ArrowUpRight size={16}/></ExternalAction>}<span className="small-note">{!url ? 'Connection settings live in src/config/laboratories.ts' : 'Hosted independently · connected through this portfolio'}</span></div>}
  </div>
}

function LabDetail({ lab }: { lab: Laboratory }) {
  const [tab, setTab] = useState('Overview')
  const index = laboratories.findIndex(item => item.id === lab.id)
  const Icon = icons[lab.icon]
  const report = safeUrl(lab.reportUrl) || (lab.reportUrl.startsWith('reports/') && !lab.reportUrl.includes('..') && !/[?#\\]/.test(lab.reportUrl) ? `${import.meta.env.BASE_URL}${lab.reportUrl}` : undefined)
  return <div className="container page-content detail-page"><a href="#/laboratories" className="back-link"><ArrowLeft size={15}/>Back to laboratories</a>
    <div className="detail-hero"><div><div className="detail-eyebrow"><Eyebrow>LABORATORY {lab.id} / {lab.category.toUpperCase()}</Eyebrow><span className={`status status-${lab.status}`}><i/>{statusLabels[lab.status]}</span></div><h1>{lab.title}<span className="orange-period">.</span></h1><p className="detail-subtitle">{lab.subtitle}</p><p>{lab.description}</p><div className="detail-actions"><ExternalAction url={lab.liveUrl} className="button primary" pending="Live laboratory URL not configured">Launch Laboratory<ArrowUpRight size={17}/></ExternalAction></div></div><div className="detail-art"><LabArtwork kind={lab.icon} large/><span>CONCEPT ILLUSTRATION · NOT LABORATORY OUTPUT</span></div></div>
    <div className="detail-tabs" role="tablist" aria-label="Activity details">{[['Overview',BookOpen],['Workspace',Maximize2],['Resources',FileText]].map(([name,I])=>{const TIcon=I as typeof BookOpen;const label=String(name);return <button key={label} role="tab" id={`tab-${label}`} aria-selected={tab === label} aria-controls={`panel-${label}`} tabIndex={tab === label ? 0 : -1} onClick={() => setTab(label)} onKeyDown={event => { if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) { event.preventDefault();const names=['Overview','Workspace','Resources'];const next=event.key==='Home'?0:event.key==='End'?2:(names.indexOf(tab)+(event.key==='ArrowRight'?1:2))%3;setTab(names[next]);document.getElementById(`tab-${names[next]}`)?.focus() } }} className={tab===label?'active':''}><TIcon size={16}/>{label}</button>})}</div>
    <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0} className="tab-content">
      {tab === 'Overview' && <div className="detail-content-grid"><div><section className="content-panel"><span className="panel-icon"><Icon/></span><h2>About this activity</h2><p>{lab.description}</p><h3>Topic-level objectives</h3>{lab.objectives.length ? <ul className="objective-list">{lab.objectives.map(objective => <li key={objective}><Check size={15}/>{objective}</li>)}</ul> : <p>Objectives will be added when the activity instructions are provided.</p>}<div className="notice"><Info size={18}/><p>{lab.note}</p></div></section><section className="content-panel"><h2>Procedure & implementation</h2><p>The detailed procedure, required tools, and implementation notes will be documented from the actual laboratory instructions and source code.</p><div className="pending-row"><Clock3 size={17}/><span>Awaiting source materials</span></div><h3>Results & conclusions</h3><p>No verified outputs or conclusions have been supplied for this activity. Screenshots and demonstrations will be added with the implementation.</p></section></div><aside><section className="content-panel"><Eyebrow>ACTIVITY AT A GLANCE</Eyebrow><dl className="detail-facts"><div><dt>Activity</dt><dd>Laboratory {lab.id} of 07</dd></div><div><dt>Focus</dt><dd>{lab.category}</dd></div><div><dt>Techniques</dt><dd className="tags">{lab.tags.map(tag=><span key={tag}>{tag}</span>)}</dd></div><div><dt>Expected input</dt><dd>{lab.input}</dd></div><div><dt>Expected output</dt><dd>{lab.output}</dd></div></dl></section><a href="#/documentation" className="help-card"><CircleHelp size={23}/><strong>How does it all connect?</strong><span>Read the portfolio guide<ArrowUpRight size={15}/></span></a></aside></div>}
      {tab === 'Workspace' && <Workspace key={lab.id} lab={lab}/>}
      {tab === 'Resources' && <div className="content-panel resources-panel"><Eyebrow>SUPPORTING THE EXPLORATION</Eyebrow><h2>Activity resources</h2><p>Original instructions and actual implementations are the source of truth for this activity.</p><div className="resource-row"><span className="panel-icon"><FileText/></span><div><h3>Laboratory report & instructions</h3><p>{report ? 'Open the supplied supporting document.' : 'No report or laboratory document has been supplied.'}</p></div>{report ? <a href={report} className="button secondary" target="_blank" rel="noopener noreferrer">Open document<ArrowUpRight size={15}/></a> : <span className="resource-pending">Awaiting materials</span>}</div></div>}
    </div>
    <nav className="lab-pagination" aria-label="Previous and next laboratory">{index>0 ? <a href={`#/lab/${laboratories[index-1].id}`}><ChevronLeft size={20}/><span><small>PREVIOUS LABORATORY</small><strong>{laboratories[index-1].title}</strong></span></a> : <span/>}{index<laboratories.length-1 ? <a href={`#/lab/${laboratories[index+1].id}`}><span><small>NEXT LABORATORY</small><strong>{laboratories[index+1].title}</strong></span><ChevronRight size={20}/></a> : <a href="#/laboratories"><span><small>BACK TO THE COLLECTION</small><strong>All laboratories</strong></span><LayoutGrid size={20}/></a>}</nav>
  </div>
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-main"><div><Brand footer/><p>Exploring the visual world,<br/>one laboratory at a time.</p></div><div className="footer-nav"><span>THE PORTFOLIO</span><a href="#/laboratories">Laboratories</a><a href="#/about">About the project</a><a href="#/documentation">Documentation</a></div><div className="footer-labs"><span>THE COLLECTION</span><div>{laboratories.map(lab=><a href={`#/lab/${lab.id}`} key={lab.id} aria-label={`Laboratory ${lab.id}: ${lab.title}`}>{lab.id}</a>)}</div><small>Seven experiments. One connected space.</small></div><a className="footer-top" href="#/" aria-label="Go to home"><ArrowUpRight size={21}/></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {portfolio.student.name || 'Vision Lab'} · {portfolio.course} — {portfolio.courseName}</span><span>Made for learning. Built with curiosity.<span className="tiny-orange-dot"/></span></div></footer>
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)
  useEffect(() => { const onHash = () => setRoute(getRoute()); window.addEventListener('hashchange', onHash);return () => window.removeEventListener('hashchange', onHash) }, [])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (!firstRender.current) mainRef.current?.focus({preventScroll:true})
    firstRender.current=false
    const lab = route.startsWith('/lab/') ? laboratories.find(item => item.id === route.split('/')[2]) : undefined
    const title = lab?.title || ({'/laboratories':'Laboratories','/about':'About','/documentation':'Documentation'} as Record<string,string>)[route]
    document.title = title ? `${title} · Vision Lab · CSST106` : 'Computer Vision Laboratory Portfolio · CSST106'
  }, [route])
  const lab=route.startsWith('/lab/') ? laboratories.find(item=>route === `/lab/${item.id}`) : undefined
  let content: ReactNode
  if(route==='/') content=<><Hero/><Stats/><Collection/><AboutTeaser/><DocsBanner/></>
  else if(route==='/laboratories') content=<Collection standalone/>
  else if(route==='/about') content=<About/>
  else if(route==='/documentation') content=<Documentation/>
  else if(lab) content=<LabDetail key={lab.id} lab={lab}/>
  else content=<div className="container not-found"><SquareDashed size={45}/><Eyebrow>A DIFFERENT PATH</Eyebrow><h1>This page isn’t in the collection.</h1><p>Head back to the laboratory collection to continue exploring.</p><a className="button primary" href="#/laboratories">Explore Laboratories<ArrowRight size={16}/></a></div>
  return <><a href="#main" className="skip-link" onClick={event=>{event.preventDefault();mainRef.current?.focus();mainRef.current?.scrollIntoView()}}>Skip to content</a><Header route={route}/><main id="main" ref={mainRef} tabIndex={-1} className="main-content"><div key={route} className="route-page">{content}</div></main><Footer/></>
}
