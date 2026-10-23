(()=>{const $=s=>document.getElementById(s);let D,cur,list=[],idx=0;const q=new URLSearchParams(location.search);
fetch('index.json').then(r=>r.json()).then(d=>{D=d;const C={};d.cars.forEach(c=>C[c.id]=c);d.items.forEach(i=>i.c=C[i.car]);
cur=d.parts.includes(q.get('part'))?q.get('part'):d.parts[0];
const opt=(el,vals)=>vals.forEach(v=>{const o=document.createElement('option');o.value=o.textContent=v;el.appendChild(o)});
opt($('fbrand'),[...new Set(d.cars.map(c=>c.brand))].sort());opt($('fregion'),['歐美','日韓','中國','其他'].filter(r=>d.cars.some(c=>c.region==r)));
opt($('fbody'),[...new Set(d.cars.map(c=>c.body))]);opt($('fyear'),[...new Set(d.cars.map(c=>String(c.year)))].sort().reverse());
['fbrand','fregion','fbody','fyear'].forEach(k=>{const v=q.get(k.slice(1));if(v)$(k).value=v;$(k).onchange=draw});draw()});
function pass(i){const c=i.c;return(!$('fbrand').value||c.brand==$('fbrand').value)&&(!$('fregion').value||c.region==$('fregion').value)&&(!$('fbody').value||c.body==$('fbody').value)&&(!$('fyear').value||String(c.year)==$('fyear').value)}
function draw(){const P=$('ptparts');P.innerHTML='';D.parts.forEach(p=>{const n=D.items.filter(i=>i.parts.includes(p)&&pass(i)).length;const b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-selected',p==cur);b.innerHTML=p+'<small>'+n+'</small>';b.onclick=()=>{cur=p;draw()};P.appendChild(b)});
list=D.items.filter(i=>i.parts.includes(cur)&&pass(i));const cars=new Set(list.map(i=>i.car)).size;$('ptcount').textContent=`${cur}：${list.length} 張 · ${cars} 款車`;
const u=new URLSearchParams({part:cur});['brand','region','body','year'].forEach(k=>{const v=$('f'+k).value;if(v)u.set(k,v)});history.replaceState(null,'','?'+u);
const G=$('ptgrid');G.innerHTML=list.length?'':'<p class="pt-empty">這個條件下沒有圖片，換個篩選試試。</p>';
list.forEach((i,k)=>{const b=document.createElement('button');b.type='button';b.className='pt-card';b.innerHTML=`<div class="im"><img src="img/${i.f}" alt="${i.c.name} ${cur}" loading="lazy" width="400" height="300"></div><b>${i.c.name}</b><span>${i.c.brand} · ${i.c.region} · ${i.c.body} · ${i.c.year}</span>`;b.onclick=()=>open(k);G.appendChild(b)})}
function open(k){idx=(k+list.length)%list.length;const i=list[idx];$('ptimg').src='img/'+i.f;$('ptimg').alt=i.c.name+' '+cur;
$('ptcap').innerHTML=`<b>${i.c.name}</b> · ${cur}<div class="m">${i.trim}　|　${i.c.brand} · ${i.c.region} · ${i.c.body}　|　圖片來源：<a href="${i.src}" target="_blank" rel="noopener">汽車之家原圖頁 ↗</a>　<a href="${i.c.page}" target="_blank" rel="noopener">車系圖庫 ↗</a>　(${idx+1}/${list.length})</div>`;if(!$('ptdlg').open)$('ptdlg').showModal()}
$('ptx').onclick=()=>$('ptdlg').close();$('ptprev').onclick=()=>open(idx-1);$('ptnext').onclick=()=>open(idx+1);
$('ptdlg').addEventListener('click',e=>{if(e.target==$('ptdlg'))$('ptdlg').close()});
addEventListener('keydown',e=>{if(!$('ptdlg').open)return;if(e.key=='ArrowLeft')open(idx-1);if(e.key=='ArrowRight')open(idx+1)});})();
