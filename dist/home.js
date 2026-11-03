(()=>{const q=s=>document.querySelector(s),home=q('.home');for(let i=0;i<24;i++){const star=document.createElement('i');star.style.cssText=`left:${(i*37+13)%97}%;top:${i<12?(i*7+2)%12:56+(i*11)%22}%;animation-delay:${-(i%7)*.63}s;animation-duration:${3+i%4}s`;q('.stars').append(star)}
let enabled=!matchMedia('(prefers-reduced-motion: reduce)').matches;try{const saved=localStorage.getItem('starwish.homeMotion');if(saved!==null)enabled=saved==='on'}catch{}home.classList.toggle('still',!enabled);
const start=q('.start');let entering=false;const town=new Image();town.src='assets/lobby-town.png';
for(let i=0;i<12;i++){const mote=document.createElement('i');mote.className='gate-mote';mote.style.setProperty('--angle',i*30+'deg');mote.style.setProperty('--distance',70+(i%4)*22+'px');q('.star-transition').append(mote)}
start.addEventListener('click',event=>{if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();if(entering)return;entering=true;start.setAttribute('aria-disabled','true');const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||home.classList.contains('still');
if(reduced){window.location.assign(start.href);return}
home.classList.add('departing');let done=false;const navigate=()=>{if(done)return;done=true;try{sessionStorage.setItem('starwish.arrival','yes')}catch{}window.location.assign(start.href)};
window.setTimeout(navigate,1000);
});
window.addEventListener('pageshow',()=>{entering=false;home.classList.remove('departing');start.removeAttribute('aria-disabled')});
})();
