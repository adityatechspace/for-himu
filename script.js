function toast(msg){
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show');
  clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>t.classList.remove('show'),3600);
}
function surprise(){
  for(let i=0;i<24;i++){
    let h=document.createElement('div'); h.textContent=['♡','💗','✨','🌸'][i%4];
    h.style.cssText=`position:fixed;z-index:50;left:${Math.random()*100}vw;top:${75+Math.random()*20}vh;font-size:${18+Math.random()*25}px;pointer-events:none`;
    document.body.append(h);
    h.animate([{transform:'translateY(0)',opacity:1},{transform:`translateY(-${300+Math.random()*350}px) rotate(${Math.random()*160-80}deg)`,opacity:0}],1900).onfinish=()=>h.remove();
  }
  toast("Surprise! You are loved more than this little screen can fit. ♡");
}
function makeSparks(box, icon){
  for(let i=0;i<14;i++){
    const x=(Math.random()*260-130)+'px', y=(-40-Math.random()*160)+'px';
    const h=document.createElement('span'); h.className='spark'; h.textContent=icon;
    h.style.left=(50+Math.random()*10-5)+'%'; h.style.top=(45+Math.random()*10-5)+'%';
    h.style.setProperty('--x',x); h.style.setProperty('--y',y); box.append(h);
    setTimeout(()=>h.remove(),1600);
  }
}
function sendLove(type){
  const box=document.getElementById(type==='hug'?'hugbox':'kissbox');
  box.classList.remove('finished','active-hug','active-kiss');
  void box.offsetWidth;
  box.classList.add(type==='hug'?'active-hug':'active-kiss');
  makeSparks(box,type==='hug'?'💗':'💋');
  setTimeout(()=>{
    box.classList.add('finished');
    toast(type==='hug' ? "Hug delivered to Adi! 🫂" : "Kiss delivered to Adi! 💋");
    notifyAdi(type);
  },1100);
}
// Adi's number, international format, no + or spaces.
const ADI_PHONE = "918102256694";

function notifyAdi(type){
  const message = type==='hug'
    ? "Himu just sent you a hug from this little website! 🫂❤️"
    : "Himu just sent you a kiss from this little website! 💋❤️";
  const wa = 'https://wa.me/'+ADI_PHONE+'?text='+encodeURIComponent(message);
  // iOS Messages wants "&body=", most Android apps accept "?body=" — both are included for compatibility.
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const sms = 'sms:+'+ADI_PHONE+(isIOS?'&':'?')+'body='+encodeURIComponent(message);

  document.getElementById('notifyIcon').textContent = type==='hug' ? '🫂' : '💋';
  document.getElementById('notifyMsgPreview').textContent = message;
  document.getElementById('notifyWa').onclick = ()=>{ window.open(wa,'_blank') || (window.location.href=wa); closeNotify(); };
  document.getElementById('notifySms').onclick = ()=>{ window.location.href=sms; closeNotify(); };
  document.getElementById('notifyCopy').onclick = async ()=>{
    try{ await navigator.clipboard.writeText(message); toast('Message copied — paste it anywhere ♡'); }
    catch(e){ toast('Could not copy automatically — please copy it manually.'); }
    closeNotify();
  };
  document.getElementById('notifyModal').classList.add('show');
}
function closeNotify(){ document.getElementById('notifyModal').classList.remove('show'); }

// A soft, low-key stream of ambient hearts drifting up from the bottom of the page.
// Purely decorative — capped so it never gets distracting or heavy.
function spawnAmbientHeart(){
  const icons=['♡','💗','✨'];
  const h=document.createElement('span');
  h.className='ambient-heart';
  h.textContent=icons[Math.floor(Math.random()*icons.length)];
  h.style.left=Math.random()*100+'vw';
  h.style.setProperty('--dx',(Math.random()*60-30)+'px');
  h.style.animationDuration=(9+Math.random()*6)+'s';
  document.body.appendChild(h);
  setTimeout(()=>h.remove(), 16000);
}
setInterval(spawnAmbientHeart, 3200);

// A gentle message that changes once a day — same message all day, new one tomorrow.
const dailyMessages=[
  "Distance is just a small pause between two people who are always together in every way that matters.",
  "Somewhere in Bihar or Gujarat, whichever one you're not in, someone is smiling just thinking of you.",
  "You don't need a reason to be loved this much. You just are.",
  "If today felt heavy, let this be the reminder that you're carrying it beautifully.",
  "Two cities, one sky, one heart that keeps choosing you — today and every day.",
  "Whatever kind of day you're having, it's allowed. And you're still my favourite person in it.",
  "This is just a tiny nudge to smile — no reason needed, Himu."
];
function updateDaily(){
  const day=Math.floor(Date.now()/86400000);
  document.getElementById('dailyMsg').textContent = dailyMessages[day % dailyMessages.length];
}
updateDaily();

let timer,score=0;
function startHearts(){clearInterval(timer);score=0;document.getElementById('score').textContent=score;const f=document.getElementById('field');f.innerHTML='';timer=setInterval(()=>{let h=document.createElement('span');h.className='fall';h.textContent='💗';h.style.left=Math.random()*90+'%';h.onclick=()=>{score++;document.getElementById('score').textContent=score;h.remove()};f.append(h);setTimeout(()=>h.remove(),2800)},500);setTimeout(()=>clearInterval(timer),15000)}
function quiz(x){document.getElementById('quizresult').textContent=x==='right'?'Correct. Obviously. 😌🫂':'Nice try... but the answer is a hug.'}
const metDate = new Date("2026-08-24T00:00:00+05:30");
function updateLive(){
  const now=new Date();
  document.getElementById("clock").textContent=now.toLocaleTimeString("en-IN",{hour12:true});
  document.getElementById("today").textContent=now.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const diff=Math.max(0,now-metDate), days=Math.floor(diff/86400000), hours=Math.floor(diff/3600000)%24, mins=Math.floor(diff/60000)%60, secs=Math.floor(diff/1000)%60;
  document.getElementById("since").textContent=`${days} days ${hours}h ${mins}m ${secs}s`;
  document.getElementById("days").textContent=days;
  document.getElementById("hours").textContent=hours;
  document.getElementById("mins").textContent=mins;
  document.getElementById("secs").textContent=secs;
}
updateLive(); setInterval(updateLive,1000);

const reasonTexts=[
  ["You deserve a peaceful evening. 🌙","Put the day down for a while. You don't have to carry everything at once. Rest, breathe, and let yourself be cared for."],
  ["Someone is proud of you. 🫶","Even when you don't notice your own progress, it is still there. Keep going at your own pace. Adi is cheering for you."],
  ["Your smile is dangerously cute. 😌","Official reminder: your smile has unfair amounts of power. Please use it responsibly. Or don't. I like it either way."],
  ["You are allowed to slow down. ☕","There is no race. Take your time, have your little moment, and remember that being soft with yourself is strength."]
];
function reason(i){document.getElementById("reasonTitle").textContent=reasonTexts[i][0];document.getElementById("reasonText").textContent=reasonTexts[i][1];document.getElementById("reasonModal").classList.add("show")}
function closeReason(){document.getElementById("reasonModal").classList.remove("show")}

function wish(){
  const wishes=["May your next smile arrive sooner than you expect. ✨","May today be softer with you. 🌙","May something unexpectedly lovely happen today. 🌸","Wish accepted. Now go be your adorable self. 💗"];
  document.getElementById('wish').textContent=wishes[Math.floor(Math.random()*wishes.length)];
}
let cards=['♡','♡','💗','💗','🌸','🌸','✨','✨'],first=null,lock=false,matches=0;
function newMemory(){cards.sort(()=>Math.random()-.5);first=null;lock=false;matches=0;const m=document.getElementById('memory');m.innerHTML='';cards.forEach((x,i)=>{let b=document.createElement('button');b.textContent='?';b.dataset.v=x;b.onclick=()=>flip(b);m.append(b)})}
function flip(b){if(lock||b===first||b.dataset.done)return;b.textContent=b.dataset.v;if(!first){first=b;return}if(first.dataset.v===b.dataset.v){first.dataset.done=b.dataset.done=true;first=null;if(++matches===4)document.getElementById('memresult').textContent='You found all the love! 💗'}else{lock=true;let f=first;setTimeout(()=>{f.textContent=b.textContent='?';first=null;lock=false},650)}}
newMemory();

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
