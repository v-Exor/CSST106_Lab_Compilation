import { useId } from 'react'
import type { Laboratory } from '../config/laboratories'

/** Original vector illustrations for the portfolio; these are not laboratory outputs. */
export function LabArtwork({ kind, large = false }: { kind: Laboratory['icon']; large?: boolean }) {
  const id = useId().replaceAll(':', '')
  return <svg viewBox="0 0 400 190" className={`lab-art ${large ? 'large' : ''}`} aria-hidden="true">
    <defs>
      <linearGradient id={`${id}orange`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffad64"/><stop offset="1" stopColor="#ef6c19"/></linearGradient>
      <linearGradient id={`${id}cream`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff8ef"/><stop offset="1" stopColor="#ffe4cc"/></linearGradient>
      <pattern id={`${id}grid`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#eacdb6" strokeWidth=".65"/></pattern>
    </defs>
    <rect width="400" height="190" fill={`url(#${id}cream)`}/>
    <rect width="400" height="190" fill={`url(#${id}grid)`} opacity=".65"/>
    {kind === 'image' && <g transform="translate(106 20)">
      <rect x="9" y="8" width="180" height="136" rx="9" fill="white" stroke="#e8c5a5" transform="rotate(-9 99 76)"/>
      <rect width="180" height="136" rx="8" fill="#fffaf6" stroke="#efb785"/>
      <rect x="10" y="10" width="160" height="116" rx="4" fill="#ffe5ca"/>
      <circle cx="126" cy="41" r="18" fill="#ffb76b"/>
      <path d="M10 113L59 56l46 52 22-30 43 48H10Z" fill={`url(#${id}orange)`}/>
      <path d="M10 113L59 56l18 21-14-5-20 28-8-3Z" fill="#fff1e3"/>
      <g stroke="#fff5ea" opacity=".48">{Array.from({length:8},(_,i)=><path key={i} d={`M${10+i*20} 10v116M10 ${10+i*20}h160`}/>)}</g>
    </g>}
    {kind === 'edges' && <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M66 145l78-106 67 88 40-61 83 79H66Z" stroke="#e8b892" strokeWidth="14" opacity=".2"/>
      <path d="M66 145l78-106 67 88 40-61 83 79H66Z" stroke="#f07a2a" strokeWidth="2"/>
      <path d="M92 146l56-76 63 76m11-17 30-40 59 57M144 39v107m107-80v80" stroke="#f7b884" strokeDasharray="4 5"/>
      <g stroke="#bc581b" strokeWidth="2">{[[66,145],[144,39],[211,127],[251,66],[334,145]].map(([x,y])=><rect key={x} x={x-4} y={y-4} width="8" height="8" fill="#fff7ef"/>)}</g>
    </g>}
    {kind === 'histogram' && <g transform="translate(70 27)">
      <path d="M0 0v128h270" fill="none" stroke="#d1a98a"/>
      {[20,33,48,76,105,119,108,88,77,61,69,87,92,76,55,30,17].map((h,i)=><rect key={i} x={11+i*14} y={127-h} width="10" height={h} rx="2" fill={`url(#${id}orange)`} opacity={.5+i*.027}/>)}
      <path d="M10 109C42 113 48 20 83 13s44 68 72 40 38-17 57 12 28 42 37 46" fill="none" stroke="#b5541a" strokeWidth="1.7"/>
    </g>}
    {kind === 'features' && <g>
      <path d="M95 143l51-100 96-15 63 75-49 56-161-16Z" fill="#ffd6ad" fillOpacity=".4" stroke="#e6ac7b"/>
      <path d="M95 143l147-115 14 131L146 43l159 60L95 143" fill="none" stroke="#efb17e"/>
      {[[95,143],[146,43],[242,28],[305,103],[256,159],[200,95],[152,111],[254,88]].map(([x,y],i)=><g key={x}><circle cx={x} cy={y} r={11+i%3*3} fill="white" fillOpacity=".6" stroke="#ef7c29"/><path d={`M${x-5} ${y}h10m-5-5v10`} stroke="#c15c1a"/><circle cx={x} cy={y} r="23" fill="none" stroke="#eda96f" strokeDasharray="2 5"/></g>)}
    </g>}
    {kind === 'pca' && <g>
      <path d="M83 149L316 40M145 20l115 147" stroke="#d2ab8c" strokeDasharray="4 5"/>
      <ellipse cx="204" cy="94" rx="117" ry="41" transform="rotate(-27 204 94)" fill="#ffb87e" fillOpacity=".12" stroke="#f0b989"/>
      {Array.from({length:45},(_,i)=>{const x=105+((i*43)%190); const y=140-(x-105)*.47+Math.sin(i*3.7)*28;return <circle key={i} cx={x} cy={y} r={i%5===0?4:2.6} fill={i%3===0?'#bc5a20':'#f6954e'} opacity=".75"/>})}
      <path d="M83 151L319 38m-13 2 13-2-5 13" fill="none" stroke="#cf601a" strokeWidth="2"/>
      <text x="313" y="26" fill="#a45a2b" fontSize="10" fontFamily="monospace">PC1</text>
    </g>}
    {kind === 'detection' && <g>
      <path d="M48 148l60-69 53 47 58-86 127 108H48Z" fill="#f5d3b4"/>
      <path d="M63 148l45-51 53 51h-98Zm100 0 56-88 105 88H163Z" fill="#ecc09b"/>
      <circle cx="292" cy="44" r="16" fill="#ffd69e"/>
      <rect x="78" y="64" width="99" height="93" rx="2" fill="none" stroke="#ec741f" strokeWidth="1.8"/>
      <rect x="195" y="29" width="137" height="130" rx="2" fill="none" stroke="#ec741f" strokeWidth="1.8"/>
      <rect x="195" y="16" width="65" height="14" rx="2" fill="#ec741f"/><text x="201" y="26" fill="white" fontSize="9" fontFamily="monospace">object</text>
      <rect x="78" y="51" width="65" height="14" rx="2" fill="#ec741f"/><text x="84" y="61" fill="white" fontSize="9" fontFamily="monospace">object</text>
    </g>}
    {kind === 'upcoming' && <g fill="none" stroke="#dfa878">
      <circle cx="200" cy="94" r="57" strokeDasharray="4 7"/><circle cx="200" cy="94" r="36" fill="#fff8f0"/>
      <path d="M200 80v28m-14-14h28" stroke="#e58841" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="134" cy="42" r="4" fill="#ffc68b" stroke="none"/><circle cx="279" cy="129" r="6" fill="#ffc68b" stroke="none"/>
    </g>}
  </svg>
}

export function HeroArtwork() {
  return <div className="hero-artwork" aria-label="Decorative illustration of a computer vision research workspace">
    <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
    <div className="art-dot dot-one"/><div className="art-dot dot-two"/>
    <div className="floating-label label-top"><span className="tiny-orange-dot"/> A DIFFERENT WAY OF SEEING</div>
    <div className="vision-window">
      <div className="window-bar"><div className="window-dots"><i/><i/><i/></div><span>vision / exploration</span><span className="window-number">01 — 07</span></div>
      <div className="vision-scene">
        <svg viewBox="0 0 510 310" aria-hidden="true">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f7d6b0"/><stop offset="1" stopColor="#f0b57a"/></linearGradient>
            <linearGradient id="dune" x1="0" y1="0" x2=".6" y2="1"><stop stopColor="#d37b3d"/><stop offset="1" stopColor="#b85421"/></linearGradient>
            <pattern id="herogrid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="white" strokeOpacity=".16" strokeWidth=".6"/></pattern>
          </defs>
          <rect width="510" height="310" fill="url(#sky)"/>
          <circle cx="368" cy="72" r="39" fill="#fff1d4"/>
          <path d="M0 224C93 170 121 203 226 141S408 164 510 109V310H0Z" fill="#df9d65"/>
          <path d="M0 280L188 91l206 219H0Z" fill="url(#dune)"/>
          <path d="M188 91L143 236l-53 74H0Z" fill="#eab486"/>
          <path d="M188 91l-45 145 35-30 10-115Z" fill="#f8d5ae"/>
          <path d="M243 310l135-153 132 116v37H243Z" fill="#a84b24"/>
          <path d="M378 157l-29 92-106 61 135-153Z" fill="#e0945e"/>
          <path d="M0 276c93-11 126-8 194 14s99-9 150-4 119 22 166 14v10H0Z" fill="#f3c89f"/>
          <rect width="510" height="310" fill="url(#herogrid)"/>
          <g fill="none" stroke="#fff9ed" strokeWidth="1.5"><rect x="65" y="65" width="236" height="215" rx="3"/><rect x="317" y="131" width="143" height="146" rx="3"/><path d="M173 170h24m-12-12v24"/></g>
          <rect x="65" y="45" width="110" height="20" rx="3" fill="#fff8ee"/><text x="73" y="59" fill="#88431f" fontSize="10" fontFamily="monospace">visual exploration</text>
          <g fill="#fff8ed">{[[88,273],[187,92],[287,273],[377,158],[326,269],[451,267]].map(([x,y])=><g key={x}><circle cx={x} cy={y} r="4"/><circle cx={x} cy={y} r="9" fill="none" stroke="#fff8ed" strokeOpacity=".6"/></g>)}</g>
        </svg>
        <div className="scene-caption"><span>ILLUSTRATIVE VISUAL</span><span>NOT AN INFERENCE RESULT</span></div>
        <div className="scan-line"/>
      </div>
      <div className="window-footer"><span><i/> Explore. Understand. Build.</span><span>CSST106</span></div>
    </div>
    <div className="floating-feature"><span className="feature-mark">⌘</span><div><strong>From pixels to possibilities.</strong><span>Seven labs. One connected experience.</span></div></div>
    <div className="floating-pixels" aria-hidden="true">{Array.from({length:16},(_,i)=><i key={i} style={{opacity:.2+(i*7%10)/12}}/>)}</div>
    <span className="art-caption">A LITTLE CURIOSITY. A WHOLE NEW PERSPECTIVE.</span>
  </div>
}
