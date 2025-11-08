// Helpers, Theme, Nav, Data, Rendering (see full JS)
const $=(s,e=document)=>e.querySelector(s), $$=(s,e=document)=>[...e.querySelectorAll(s)], byId=id=>document.getElementById(id);
const modeToggle=byId('modeToggle');function applyTheme(m){const r=document.documentElement,i=m==='dark'||(m==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);r.classList.toggle('dark',i);modeToggle&&modeToggle.setAttribute('aria-pressed',String(i))}
function initTheme(){const s=localStorage.getItem('ww2-theme')||'auto';applyTheme(s)}modeToggle?.addEventListener('click',()=>{const c=localStorage.getItem('ww2-theme')||'auto',n=c==='dark'?'light':'dark';localStorage.setItem('ww2-theme',n);applyTheme(n)});
const navToggle=byId('navToggle'),navMenu=byId('navMenu');navToggle?.addEventListener('click',()=>{const e=navToggle.getAttribute('aria-expanded')==='true';navToggle.setAttribute('aria-expanded',String(!e));navMenu.classList.toggle('open');navMenu.style.display=navMenu.classList.contains('open')?'flex':''});
function setYear(){const s=byId('year');s&&(s.textContent=(new Date).getFullYear())}
function initAccordion(r){$$(`${r} .acc-item`).forEach(b=>{b.addEventListener('click',()=>{const e=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!e));const p=b.nextElementSibling;p&&(p.style.display=e?'none':'block')})})}
function initTabs(){const t=$$('.tabs .tab'),p=$$('.tab-panel');t.forEach(tb=>{tb.addEventListener('click',()=>{t.forEach(x=>{x.classList.remove('active');x.setAttribute('aria-selected','false')});p.forEach(x=>x.classList.remove('active'));tb.classList.add('active');tb.setAttribute('aria-selected','true');const pn=byId(tb.getAttribute('aria-controls'));pn?.classList.add('active')})})}
const TIMELINE=[
  {y:1939,th:'europe',title:'유럽 전쟁 발발',note:'유럽에서 전면전이 시작되며 전선이 확대.'},
  {y:1940,th:'europe',title:'유럽 각지 전투',note:'공중전/지상전 심화.'},
  {y:1941,th:'pacific',title:'전장의 확대',note:'전역과 동맹 구도 변화.'},
  {y:1942,th:'africa',title:'북아프리카 공방',note:'사막전·보급로 각축.'},
  {y:1942,th:'pacific',title:'태평양 도서전 확대',note:'항모전·상륙전 격화.'},
  {y:1943,th:'europe',title:'전세 변화',note:'여러 전역에서 주도권 변화.'},
  {y:1944,th:'europe',title:'대규모 상륙·반격',note:'다수의 상륙작전과 전략폭격.'},
  {y:1945,th:'home',title:'종전과 전후 체제',note:'전투 종결과 국제질서 재편.'}
];
const BATTLES=[
  {name:'도시/요충지 공방',theater:'europe',tags:['도시전','지상전']},
  {name:'사막전 공방',theater:'africa',tags:['사막','보급로']},
  {name:'항모 중심 도서전',theater:'pacific',tags:['항모','상륙']},
  {name:'대규모 상륙작전',theater:'europe',tags:['상륙','연합']},
  {name:'해협/해상로 통제',theater:'africa',tags:['해상','보급']},
  {name:'장기 대륙전',theater:'pacific',tags:['장기전','대륙']},
];
const PROFILES=[
  {who:'정치/군 지도자 (요약)',note:'전략 수립, 연합/동맹 관리, 전시체제 운영.'},
  {who:'지휘관/참모 (요약)',note:'전역별 작전 지휘·조정.'},
  {who:'과학/기술 인력 (요약)',note:'암호·레이더·항공·의학 등 기여.'},
  {who:'산업/노동 인력 (요약)',note:'대량생산/물류 기반 유지.'},
  {who:'언론/문화/민간인 (요약)',note:'선전, 사기, 일상 변화.'}
];
const GLOSSARY=[
  {term:'총력전',def:'국가의 군사·경제·사회 전반을 전쟁 목적에 동원하는 형태.'},
  {term:'전격전',def:'기동력과 집중 화력을 활용해 단기간 돌파를 노리는 작전 개념.'},
  {term:'전략폭격',def:'군수/산업 기반과 도시를 목표로 하는 폭격.'},
  {term:'제공권',def:'공역 지배 능력.'},
  {term:'보급선',def:'병참·연료·무기 등 물자를 전선에 공급하는 경로.'}
];
function renderTimeline(maxYear,theater='all'){const list=byId('timelineList');list.innerHTML='';TIMELINE.filter(e=>e.y<=maxYear&&(theater==='all'||e.th===theater)).forEach(e=>{const li=document.createElement('li'),top=document.createElement('div');top.className='top';const badge=document.createElement('span');badge.className='badge '+(e.th==='europe'?'eu':e.th==='africa'?'af':e.th==='pacific'?'pa':'hf');badge.textContent=e.th==='europe'?'유럽':e.th==='africa'?'북아프리카·지중해':e.th==='pacific'?'아시아·태평양':'후방/정책';const year=document.createElement('strong');year.textContent=e.y;top.append(year,badge);const title=document.createElement('div');title.style.fontWeight='700';title.textContent=e.title;const p=document.createElement('p');p.textContent=e.note;li.append(top,title,p);list.append(li)})}
function renderBattles(keyword=''){const wrap=byId('battleList');wrap.innerHTML='';const k=keyword.trim();BATTLES.filter(b=>!k||b.name.includes(k)||b.tags.some(t=>t.includes(k))).forEach(b=>{const art=document.createElement('article');art.className='card';const h3=document.createElement('h3');h3.textContent=b.name;const meta=document.createElement('ul');meta.className='meta';meta.innerHTML=`<li>${b.theater==='europe'?'유럽':b.theater==='africa'?'북아프리카·지중해':'아시아·태평양'}</li>`+b.tags.map(t=>`<li>${t}</li>`).join('');art.append(h3,meta);wrap.append(art)})}
function renderProfiles(){const box=byId('profileCards');box.innerHTML='';PROFILES.forEach(p=>{const art=document.createElement('article');art.className='card';const h3=document.createElement('h3');h3.textContent=p.who;const d=document.createElement('p');d.textContent=p.note;art.append(h3,d);box.append(art)})}
function renderGlossary(){const acc=byId('glossAcc');acc.innerHTML='';GLOSSARY.forEach(g=>{const btn=document.createElement('button');btn.className='acc-item';btn.setAttribute('aria-expanded','false');btn.textContent=g.term;const panel=document.createElement('div');panel.className='acc-panel';panel.innerHTML=`<p>${g.def}</p>`;acc.append(btn,panel)});initAccordion('#glossary')}
const globalSearch=byId('globalSearch');const searchable=()=>[...$$('#overview,#causes,#powers,#timeline,#battles,#tech,#homefront,#profiles,#glossary,#refs').map(s=>({el:s,text:s.textContent}))];
globalSearch?.addEventListener('input',()=>{const q=globalSearch.value.trim();searchable().forEach(({el,text})=>{const hit=!q||text.toLowerCase().includes(q.toLowerCase());el.style.opacity=hit?'1':'0.25'})});
const contactForm=byId('contactForm'),contactResult=byId('contactResult');contactForm?.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(contactForm).entries());if(!d.name||!d.email||!d.message){contactResult.textContent='필수 항목을 입력해주세요.';contactResult.style.color='var(--warn)';return}contactResult.textContent='문의가 접수되었습니다. (데모)';contactResult.style.color='var(--ok)';contactForm.reset()});
const yearRange=byId('yearRange'),yearOut=byId('yearOut'),theaterFilter=byId('theaterFilter');byId('resetFilter')?.addEventListener('click',()=>{yearRange.value=1945;yearOut.textContent='1945';theaterFilter.value='all';renderTimeline(1945,'all')});
yearRange?.addEventListener('input',()=>{yearOut.textContent=yearRange.value;renderTimeline(parseInt(yearRange.value,10),theaterFilter.value)});
theaterFilter?.addEventListener('change',()=>{renderTimeline(parseInt(yearRange.value,10),theaterFilter.value)});
const quizForm=byId('quizForm'),quizResult=byId('quizResult');quizForm?.addEventListener('submit',e=>{e.preventDefault();const selects=$$('select',quizForm);let s=0;selects.forEach(x=>{if(x.value===x.dataset.answer)s++});quizResult.textContent=`정답: ${s} / ${selects.length}`;quizResult.style.color=s===selects.length?'var(--ok)':'var(--warn)'});
document.addEventListener('DOMContentLoaded',()=>{setYear();initTheme();initTabs();initAccordion('#causes');renderTimeline(parseInt(yearRange?.value||'1945',10),theaterFilter?.value||'all');renderBattles('');renderProfiles();renderGlossary();document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){e.preventDefault();globalSearch?.focus()}})});
