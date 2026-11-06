document.querySelectorAll('[data-utc]').forEach(function(x){try{var d=new Date(x.getAttribute('data-utc'));var f=x.getAttribute('data-f')||'t';
var o=f==='d'?{weekday:'short',day:'numeric',month:'short'}:(f==='dt'?{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',hour12:false}:{weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false});
x.textContent=d.toLocaleString(undefined,o);}catch(e){}});
(function(){var T=document.getElementById('live');if(!T)return;var B=T.getAttribute('data-base')||'';var trk=T.querySelector('.trk');if(!trk)return;
var ORD=["uefa.champions", "uefa.europa", "uefa.europa.conf", "eng.1", "esp.1", "ita.1", "ger.1", "fra.1", "por.1", "ned.1", "bel.1", "tur.1", "sco.1", "gre.1", "aut.1", "sui.1", "den.1", "rou.1", "pol.1", "cze.1", "nor.1", "swe.1", "bra.1", "arg.1", "usa.1", "mex.1"];function rk(l){var i=ORD.indexOf(l);return i<0?100:i}
var prev={},gol={};try{prev=JSON.parse(sessionStorage.getItem('pm_prev')||'{}');gol=JSON.parse(sessionStorage.getItem('pm_gol')||'{}')}catch(e){}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function dur(){var w=trk.scrollWidth/2;trk.style.setProperty('--dur',Math.max(25,Math.round(w/55))+'s')}
function ora(d){try{return new Date(d).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit',hour12:false})}catch(e){return ''}}
function nm(x){x=x||{};var t=x.team||{};return t.shortDisplayName||t.displayName||t.name||''}
function run(){fetch(B+'data/fixtures.json',{cache:'no-store'}).then(function(r){return r.json()}).then(function(d){var now=Date.now(),L={};
if(!trk.children.length){var st=(d.matches||[]).filter(function(m){return rk(m.league)<100&&Math.abs(Date.parse(m.kickoff_utc)-now)<1728e5}).sort(function(a,b){return a.kickoff_utc<b.kickoff_utc?-1:1}).slice(0,24)
.map(function(m){return '<div class="it">'+(m.played?'FT  '+esc(m.home)+' '+m.home_goals+'–'+m.away_goals+' '+esc(m.away):esc(ora(m.kickoff_utc))+'  '+esc(m.home)+' – '+esc(m.away))+'</div>'}).join('');
if(st){trk.innerHTML=st+st;dur()}}
(d.matches||[]).forEach(function(m){var t=Date.parse(m.kickoff_utc);if(t>now-4*36e5&&t<now+14*36e5)L[m.league]=1});
var ls=Object.keys(L).sort(function(a,b){return rk(a)-rk(b)}).slice(0,14);if(!ls.length)return;
return Promise.all(ls.map(function(lg){return fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/'+lg+'/scoreboard').then(function(r){return r.json()}).catch(function(){return null})}))
.then(function(res){var live=[],fin=[],pre=[],ok=0;res.forEach(function(js){if(!js)return;ok++;(js.events||[]).forEach(function(ev){
var c=(ev.competitions||[])[0]||{};var st=((c.status||ev.status||{}).type)||{};var h=null,a=null;(c.competitors||[]).forEach(function(x){if(x.homeAway==='home')h=x;else a=x});
if(!h||!a)return;var id=ev.id,hs=h.score,as=a.score;
if(st.state==='in'){var p=prev[id];if(p){if(+hs>+p[0])gol[id+'h']=now;if(+as>+p[1])gol[id+'a']=now}prev[id]=[hs,as];
var gh=gol[id+'h']&&now-gol[id+'h']<12e4,ga=gol[id+'a']&&now-gol[id+'a']<12e4;
live.push('<div class="it"><span class="lv">'+esc(st.shortDetail||st.detail||'EN DIRECT')+'</span><span class="'+(gh?'gol':'')+'">'+esc(nm(h))+' '+esc(hs)+'</span> – <span class="'+(ga?'gol':'')+'">'+esc(as)+' '+esc(nm(a))+'</span></div>')}
else if(st.state==='post'){fin.push('<div class="it">FT  '+esc(nm(h))+' '+esc(hs)+'–'+esc(as)+' '+esc(nm(a))+'</div>')}
else{pre.push([Date.parse(ev.date),'<div class="it">'+esc(ora(ev.date))+'  '+esc(nm(h))+' – '+esc(nm(a))+'</div>'])}})});
if(!ok)return;pre.sort(function(x,y){return x[0]-y[0]});var it=live.length?live.concat(fin.slice(-6)):fin.slice(-12).concat(pre.slice(0,14).map(function(x){return x[1]}));
try{sessionStorage.setItem('pm_prev',JSON.stringify(prev));sessionStorage.setItem('pm_gol',JSON.stringify(gol))}catch(e){}
if(it.length){var hh=it.join('');trk.innerHTML=hh+hh;dur()}})}).catch(function(){})}
dur();run();setInterval(run,60000)})();
(function(){var b=document.getElementById('thm');if(!b)return;function lab(){b.textContent=document.documentElement.getAttribute('data-theme')==='dark'?'Clair':'Sombre'}lab();
b.addEventListener('click',function(){var t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',t);
try{localStorage.setItem('pm_theme',t)}catch(e){}lab()})})();
(function(){var R=document.getElementById('sres'),Q=document.getElementById('q');if(!R||!Q)return;var B=R.getAttribute('data-base')||'';var D=null;
function nz(s){try{s=String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')}catch(e){s=String(s||'')}return s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var LAB={league:'Leagues',team:'Teams',player:'Players',article:'Articles'};
function show(){var q=nz(Q.value);if(!D)return;if(q.length<2){R.innerHTML='<p class="meta">Tapez au moins deux lettres : un championnat, un club, un joueur ou un article.</p>';return}
var w=q.split(' '),g={league:[],team:[],player:[],article:[]};D.forEach(function(x){var h=x.k;for(var i=0;i<w.length;i++)if(h.indexOf(w[i])<0)return;
var s=(h.indexOf(q)===0?0:(h.indexOf(' '+q)>=0?1:2));if(g[x.t])g[x.t].push([s,x])});var out='';
['team','player','league','article'].forEach(function(t){var L=g[t];if(!L.length)return;L.sort(function(a,b){return a[0]-b[0]});
out+='<h3>'+LAB[t]+' ('+L.length+')</h3>'+L.slice(0,t==='player'?40:25).map(function(z){var x=z[1];return '<a href="'+esc(B+x.u)+'"><b>'+esc(x.n)+'</b><span>'+esc(x.s||'')+'</span></a>'}).join('')});
R.innerHTML=out||'<p class="meta">Nothing found for “'+esc(Q.value)+'”.</p>'}
fetch(B+'data/search.json').then(function(r){return r.json()}).then(function(d){D=d.map(function(x){x.k=nz(x.n+' '+(x.a||''));return x});
try{var p=new URLSearchParams(location.search).get('q');if(p)Q.value=p}catch(e){}show()}).catch(function(){R.innerHTML='<p class="meta">La recherche n'est pas disponible pour le moment.</p>'});
Q.addEventListener('input',show)})();

/* [29zz261] lead story arrows + THETEEP banner */
(function(){var c=document.querySelector('.lcar');if(!c)return;var S=[].slice.call(c.querySelectorAll('.lsl')),i=0;
function show(k){i=(k+S.length)%S.length;S.forEach(function(s,j){s.hidden=j!==i})}
c.addEventListener('click',function(ev){var b=ev.target.closest('.lnav');if(b){ev.preventDefault();show(i+(b.classList.contains('lnext')?1:-1));return}
var x=ev.target.closest('.tban-x');if(x){ev.preventDefault();ev.stopPropagation();c.classList.add('tban-off');try{sessionStorage.setItem('tban_off','1')}catch(_){}return}
var t=ev.target.closest('.tban');if(t&&!ev.target.closest('a')){window.open(t.getAttribute('data-app'),'_blank','noopener')}});
try{if(sessionStorage.getItem('tban_off')==='1')c.classList.add('tban-off')}catch(_){}
document.addEventListener('keydown',function(ev){if(ev.target.closest&&ev.target.closest('input,textarea'))return;if(ev.key==='ArrowRight')show(i+1);if(ev.key==='ArrowLeft')show(i-1)});})();
