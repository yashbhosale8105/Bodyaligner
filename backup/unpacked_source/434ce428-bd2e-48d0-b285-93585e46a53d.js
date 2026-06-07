/* ============================================================
   BodyAligner — app.js
   ============================================================ */
(function(){
  'use strict';
  const $  = (s,c)=> (c||document).querySelector(s);
  const $$ = (s,c)=> [...(c||document).querySelectorAll(s)];

  /* ---------- NAV ---------- */
  const nav = $('#nav');
  const hero = $('#top');
  function onScroll(){
    const sc = window.scrollY > 40;
    nav.classList.toggle('scrolled', sc);
    // dark nav only while over hero
    const overHero = window.scrollY < hero.offsetHeight - 90;
    nav.classList.toggle('on-dark', overHero && !sc);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // mobile menu
  const mm = $('#mobileMenu');
  $('#navToggle').addEventListener('click', ()=> mm.classList.add('open'));
  $('#menuClose').addEventListener('click', ()=> mm.classList.remove('open'));
  $$('#mobileMenu a').forEach(a=> a.addEventListener('click', ()=> mm.classList.remove('open')));

  /* ---------- SCROLL REVEAL ---------- */
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        if(e.target.hasAttribute('data-stagger')){
          $$(':scope > *', e.target).forEach((c,ci)=> c.style.transitionDelay = (ci*70)+'ms');
        }
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.14, rootMargin:'0px 0px -8% 0px'});
  function observe(){ $$('.reveal,.reveal-l,.reveal-r,.reveal-scale,[data-stagger]').forEach(el=>{ if(!el.classList.contains('in')) io.observe(el); }); }

  /* ---------- EXERCISES ---------- */
  const EX = [
    {cat:'spine', tag:'Spine & back', name:'Cat-Cow Flow', dur:'4 min', g:['#2fa898','#0f3d3e'], desc:'A gentle spinal mobiliser that warms the whole back, easing morning stiffness and restoring segmental movement.', steps:['Start on all fours, wrists under shoulders','Inhale, drop the belly and lift the chest','Exhale, round the spine toward the ceiling','Flow slowly for 10 unhurried rounds']},
    {cat:'spine', tag:'Spine & back', name:'McGill Curl-Up', dur:'5 min', g:['#7adbd0','#1c5152'], desc:'A spine-sparing core hold that builds the deep endurance your lower back relies on through the day.', steps:['Lie on your back, one knee bent','Hands under the small of your back','Lift head and shoulders a few centimetres','Hold 8 seconds, breathe, repeat ×6']},
    {cat:'neck', tag:'Neck & shoulder', name:'Chin Tuck Reset', dur:'3 min', g:['#e07a5f','#1c5152'], desc:'The single best desk-worker exercise — retrains a forward head posture and calms tension headaches.', steps:['Sit tall, eyes level on the horizon','Glide the chin straight back, making a "double chin"','Hold 5 seconds without tilting','Release slowly, repeat ×10']},
    {cat:'neck', tag:'Neck & shoulder', name:'Scapular Wall Slides', dur:'4 min', g:['#2fa898','#155152'], desc:'Opens tight shoulders and switches on the mid-back muscles that hold you upright.', steps:['Stand with back flat against a wall','Arms in a goalpost, elbows touching wall','Slide arms overhead keeping contact','Lower under control ×12']},
    {cat:'hips', tag:'Hips & knees', name:'Glute Bridge', dur:'5 min', g:['#7adbd0','#0f3d3e'], desc:'Wakes up the glutes to offload an aching lower back and protect the knees during daily loading.', steps:['Lie on your back, knees bent, feet flat','Drive through heels to lift the hips','Squeeze glutes at the top for 3 seconds','Lower slowly, repeat ×12']},
    {cat:'hips', tag:'Hips & knees', name:'90/90 Hip Switch', dur:'6 min', g:['#e07a5f','#155152'], desc:'Restores rotational hip mobility — the missing range behind so many stiff backs and cranky knees.', steps:['Sit with both knees bent at 90°','Rotate both knees to one side','Keep the chest tall and feet light','Switch side to side ×10']},
    {cat:'mobility', tag:'Mobility', name:'Thoracic Opener', dur:'4 min', g:['#2fa898','#0f3d3e'], desc:'A feel-good rotation drill that returns mid-back mobility lost to long hours at a screen.', steps:['Side-lying, knees stacked at 90°','Top arm sweeps open like a book','Follow your hand with your eyes','Breathe into the stretch, ×8 each side']},
    {cat:'mobility', tag:'Mobility', name:'World\u2019s Greatest Stretch', dur:'6 min', g:['#7adbd0','#1c5152'], desc:'A full-body flow hitting hips, spine and shoulders — the perfect pre-activity primer.', steps:['Step into a deep lunge','Drop the back knee, sink the hips','Rotate and reach the lead arm skyward','Return and switch ×6 each side']},
    {cat:'core', tag:'Core', name:'Dead Bug', dur:'5 min', g:['#e07a5f','#0f3d3e'], desc:'Teaches your core to stay braced while the limbs move — exactly how the back needs to work in life.', steps:['Lie down, arms up, knees over hips','Lower opposite arm and leg slowly','Keep the lower back pinned to the floor','Return and alternate ×10']},
  ];

  const exGrid = $('#exGrid');
  function thumbStyle(g){ return `background:linear-gradient(150deg, ${g[0]}, ${g[1]});`; }
  function renderEx(filter){
    exGrid.innerHTML = '';
    EX.filter(e=> filter==='all' || e.cat===filter).forEach((e,i)=>{
      const card = document.createElement('article');
      card.className = 'ex-card reveal';
      card.style.transitionDelay = (i*60)+'ms';
      card.innerHTML = `
        <div class="thumb" style="${thumbStyle(e.g)}"></div>
        <div class="ov"></div>
        <span class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
        <div class="meta">
          <div class="tag">${e.tag}</div>
          <h4>${e.name}</h4>
          <span class="dur"><svg viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${e.dur}</span>
        </div>`;
      card.addEventListener('click', ()=> openModal(e));
      exGrid.appendChild(card);
      requestAnimationFrame(()=> io.observe(card));
    });
  }
  $('#exFilters').addEventListener('click', (ev)=>{
    const b = ev.target.closest('.chip'); if(!b) return;
    $$('.chip', $('#exFilters')).forEach(c=> c.classList.remove('active'));
    b.classList.add('active');
    renderEx(b.dataset.filter);
  });

  /* modal */
  const modal = $('#exModal');
  function openModal(e){
    $('#mTag').textContent = e.tag;
    $('#mTitle').textContent = e.name;
    $('#mDesc').textContent = e.desc;
    $('#modalVideo').style.cssText = thumbStyle(e.g);
    $('#mSteps').innerHTML = e.steps.map((s,i)=>`<div class="s"><b>${String(i+1).padStart(2,'0')}</b> ${s}</div>`).join('');
    modal.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeModal(){ modal.classList.remove('open'); document.body.style.overflow=''; }
  $('#modalClose').addEventListener('click', closeModal);
  $('#modalBack').addEventListener('click', closeModal);
  $('#heroPlay').addEventListener('click', ()=> openModal({tag:'Welcome', name:'How we work', desc:'A look inside a BodyAligner session — from your first assessment to the moment you walk out moving freely.', g:['#2fa898','#0f3d3e'], steps:['Meet your dedicated physio','Full posture & movement screen','Hands-on treatment','Leave with your video plan']}));
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

  /* ---------- BOOKING ---------- */
  const book = {
    step:0, service:null, day:null, time:null,
    name:'', phone:'', email:''
  };
  const steps = $$('.book-step');
  const progSteps = $$('.book-progress .step');
  const nextBtn = $('#bookNext');
  const backBtn = $('#bookBack');

  // build days
  const dayGrid = $('#dayGrid');
  const dNames = ['Mon','Tue','Wed','Thu','Fri'];
  const base = new Date();
  for(let i=0;i<5;i++){
    const d = new Date(base); d.setDate(base.getDate()+i+1);
    const wd = d.getDay();
    if(wd===0||wd===6){ base.setDate(base.getDate()+1); i--; continue; }
    const btn = document.createElement('button');
    btn.className='day'; btn.dataset.val = dNames[(wd+6)%7]+' '+d.getDate();
    btn.innerHTML = `<div class="dn">${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][wd]}</div><div class="dd">${d.getDate()}</div>`;
    dayGrid.appendChild(btn);
  }
  // times
  const timeGrid = $('#timeGrid');
  ['08:00','09:30','11:00','12:30','14:00','15:30','17:00','18:30'].forEach(t=>{
    const b=document.createElement('button'); b.className='time'; b.dataset.val=t; b.textContent=t; timeGrid.appendChild(b);
  });

  function groupSelect(group, val, el){
    $$(`[data-group="${group}"] .opt, [data-group="${group}"] .day, [data-group="${group}"] .time`).forEach(x=>x.classList.remove('sel'));
    el.classList.add('sel');
    if(group==='service') book.service=val;
    if(group==='day') book.day=val;
    if(group==='time') book.time=val;
    checkValid();
  }
  document.addEventListener('click',(ev)=>{
    const opt = ev.target.closest('[data-group] .opt, [data-group] .day, [data-group] .time');
    if(!opt) return;
    const group = opt.closest('[data-group]').dataset.group;
    groupSelect(group, opt.dataset.val, opt);
  });

  ['fName','fPhone','fEmail'].forEach(id=> $('#'+id).addEventListener('input', checkValid));

  function checkValid(){
    let ok=false;
    if(book.step===0) ok = !!book.service;
    else if(book.step===1) ok = !!book.day && !!book.time;
    else if(book.step===2) ok = $('#fName').value.trim() && $('#fPhone').value.trim() && $('#fEmail').value.trim();
    else if(book.step===3) ok = true;
    nextBtn.disabled = !ok;
  }

  function goStep(n){
    book.step = n;
    steps.forEach(s=> s.classList.toggle('active', +s.dataset.step===n));
    progSteps.forEach((p,i)=>{ p.classList.toggle('done', i<n); p.classList.toggle('active', i===n); });
    backBtn.classList.toggle('show', n>0 && n<4);
    if(n===3){
      book.name=$('#fName').value; book.phone=$('#fPhone').value; book.email=$('#fEmail').value;
      $('#bookSummary').innerHTML = `
        <div class="row"><span>Service</span><span>${book.service}</span></div>
        <div class="row"><span>When</span><span>${book.day} · ${book.time}</span></div>
        <div class="row"><span>Name</span><span>${book.name}</span></div>
        <div class="row"><span>Contact</span><span>${book.phone}</span></div>`;
      nextBtn.textContent = 'Confirm booking';
      nextBtn.innerHTML = 'Confirm booking <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12l5 5L20 7"/></svg>';
    } else {
      nextBtn.innerHTML = 'Continue <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    }
    checkValid();
  }
  nextBtn.addEventListener('click', ()=>{
    if(book.step<3){ goStep(book.step+1); }
    else {
      // confirm
      $('#bookReview').style.display='none';
      $('#bookDone').style.display='block';
      $('#bookNav').style.display='none';
      progSteps.forEach(p=>{ p.classList.add('done'); });
    }
  });
  backBtn.addEventListener('click', ()=>{ if(book.step>0) goStep(book.step-1); });

  /* ---------- TEAM ---------- */
  const TEAM = [
    {name:'Dr. Mara Whitfield', role:'Clinical Director, MSc Physio', badge:'Spinal lead', creds:'15 yrs · Manual therapy'},
    {name:'Tomas Reyes', role:'Sports Physiotherapist', badge:'Sports rehab', creds:'Ex-pro team physio'},
    {name:'Aisha Karim', role:'Musculoskeletal Physio', badge:'Post-surgical', creds:'Ortho recovery specialist'},
    {name:'Ben Olsen', role:'Movement & Posture Coach', badge:'Ergonomics', creds:'Clinical Pilates instructor'},
  ];
  const teamGrid = $('#teamGrid');
  TEAM.forEach(m=>{
    const el=document.createElement('article'); el.className='member';
    el.innerHTML = `
      <div class="ph">
        <image-slot id="team-${m.name.split(' ').pop().toLowerCase()}" shape="rounded" radius="0" placeholder="Drop photo"></image-slot>
        <span class="badge">${m.badge}</span>
      </div>
      <h4>${m.name}</h4>
      <div class="role">${m.role}</div>
      <div class="creds">${m.creds}</div>`;
    teamGrid.appendChild(el);
  });

  /* ---------- TESTIMONIALS ---------- */
  const TESTI = [
    {q:'After two years of back pain I\u2019d given up. Eight weeks with Mara and I\u2019m back to lifting my kids without a second thought.', n:'Priya S.', c:'Chronic lower-back pain', i:'P'},
    {q:'The video plan was the difference. I actually knew what to do at home, and the progress reviews kept me honest.', n:'James R.', c:'Post-ACL recovery', i:'J'},
    {q:'They found a hip issue three other clinics missed. Properly thorough, and genuinely kind people.', n:'Elena M.', c:'Runner · IT band', i:'E'},
    {q:'Booked online on a Sunday, seen on Tuesday. My posture at my desk has completely changed.', n:'Daniel K.', c:'Neck & shoulder tension', i:'D'},
    {q:'Tomas got me back on the pitch ahead of schedule and stronger than before the injury. Can\u2019t recommend enough.', n:'Marcus T.', c:'Hamstring rehab', i:'M'},
    {q:'Calm, clear and never rushed. For the first time I understand my own body and what keeps me pain-free.', n:'Sofia L.', c:'Sciatica', i:'S'},
  ];
  const track = $('#testiTrack');
  TESTI.forEach(t=>{
    const c=document.createElement('div'); c.className='testi-card';
    c.innerHTML = `
      <div class="stars">${'<svg viewBox="0 0 24 24"><path d="M12 2l3 6 6 .9-4.3 4.2 1 6L12 17l-5.7 2.1 1-6L4 8.9 10 8z"/></svg>'.repeat(5)}</div>
      <blockquote>"${t.q}"</blockquote>
      <div class="who"><span class="av">${t.i}</span><div><div class="nm">${t.n}</div><div class="cx">${t.c}</div></div></div>`;
    track.appendChild(c);
  });
  let tIndex=0;
  function perView(){ return window.innerWidth<=600?1:(window.innerWidth<=900?2:3); }
  function slide(){
    const pv = perView();
    const max = Math.max(0, TESTI.length - pv);
    tIndex = Math.min(tIndex, max);
    const card = track.children[0];
    const step = card.getBoundingClientRect().width + 24;
    track.style.transform = `translateX(${-tIndex*step}px)`;
  }
  $('#testiNext').addEventListener('click', ()=>{ const pv=perView(); tIndex=Math.min(tIndex+1, TESTI.length-pv); slide(); });
  $('#testiPrev').addEventListener('click', ()=>{ tIndex=Math.max(tIndex-1,0); slide(); });
  window.addEventListener('resize', slide);

  /* ---------- FAQ ---------- */
  const FAQ = [
    {q:'Do I need a doctor\u2019s referral?', a:'No referral needed — you can book directly with us. If you\u2019re claiming through insurance, some providers ask for a GP referral first, so it\u2019s worth a quick check with them.'},
    {q:'What should I wear to my appointment?', a:'Comfortable, loose clothing you can move in — think gym wear. For some assessments it helps to expose the area being treated, so bring shorts or a vest if your issue is a knee, shoulder or back.'},
    {q:'How many sessions will I need?', a:'It varies with the condition, but most patients see meaningful change within 3–6 sessions. After your initial assessment we\u2019ll give you a clear, honest roadmap — never an open-ended commitment.'},
    {q:'Do you accept insurance?', a:'Yes. We\u2019re approved with all major health insurers and can bill most of them directly, so you don\u2019t pay upfront. Bring your policy and authorisation number to your first visit.'},
    {q:'Can I follow the exercises at home?', a:'Absolutely — that\u2019s the point. Every patient gets a personalised video programme from our library, accessible on any device, so you can keep progressing between visits.'},
    {q:'What\u2019s your cancellation policy?', a:'Life happens. You can reschedule or cancel free of charge up to 24 hours before your appointment, right from your confirmation text.'},
  ];
  const faqWrap = $('#faqWrap');
  FAQ.forEach((f,i)=>{
    const item=document.createElement('div'); item.className='faq-item';
    item.innerHTML = `
      <button class="faq-q"><span>${f.q}</span><span class="pm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></button>
      <div class="faq-a"><p>${f.a}</p></div>`;
    const q=$('.faq-q',item), a=$('.faq-a',item);
    q.addEventListener('click', ()=>{
      const open=item.classList.contains('open');
      $$('.faq-item').forEach(x=>{ x.classList.remove('open'); $('.faq-a',x).style.maxHeight=null; });
      if(!open){ item.classList.add('open'); a.style.maxHeight=a.scrollHeight+'px'; }
    });
    faqWrap.appendChild(item);
  });

  /* ---------- INIT ---------- */
  renderEx('all');
  goStep(0);
  observe();
  requestAnimationFrame(observe);
})();
