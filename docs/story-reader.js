(function readerMain(){
 'use strict';
 const $=id=>document.getElementById(id);
 const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 async function start(){
   const nav=$('readerNav'),article=$('readerArticle');
   try{
     const response=await fetch('data/stories.json',{cache:'no-store'});
     if(!response.ok)throw new Error('Unable to fetch stories: HTTP '+response.status);
     const archive=await response.json(),entries=archive.stories||[];
     if(!entries.length)throw new Error('No published chapters');
     const requested=new URLSearchParams(window.location.search).get('turn');
     let index=entries.findIndex(s=>s.id===requested);
     if(index<0)index=0;
     const story=entries[index];
     nav.innerHTML=entries.map((s,i)=>`<a href="?turn=${encodeURIComponent(s.id)}" class="${index===i?'selected':''}" ${index===i?'aria-current="page"':''}><span>YEAR ${s.year} · DAY ${s.day}</span><strong>${esc(s.title)}</strong></a>`).join('');
     const sections=story.sections.map(sec=>`<section class="story-section"><h2>${esc(sec.heading)}</h2>${sec.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</section>`).join('');
     const older=entries[index+1],newer=entries[index-1];
     article.innerHTML=`<div class="story-meta">YEAR ${esc(story.year)} · ${esc(story.display_year)} · ${esc(story.season)}, DAY ${esc(story.day)} · ${esc(story.days_advanced)} DAYS ADVANCED</div><h1>${esc(story.title)}</h1><p class="story-deck">${esc(story.deck)}</p>${sections}<div class="story-tools">${older?`<a href="?turn=${encodeURIComponent(older.id)}">← Previous chapter</a>`:'<span>Beginning of this archive</span>'}${newer?`<a href="?turn=${encodeURIComponent(newer.id)}">Next chapter →</a>`:'<a href="index.html">Explore current Taluma →</a>'}</div><p class="reader-note">Read the original chapter in <a href="https://github.com/xymff/empires-of-dust/blob/main/docs/stories/${encodeURIComponent(story.id)}.md">GitHub</a>. These story editions preserve the events of each turn; the downloadable JSON is the authoritative simulation state.</p>`;
     document.title=story.title+' | Taluma · Empires of Dust';
   }catch(e){nav.textContent='Archive unavailable';article.innerHTML='<h1>Unable to load the stories</h1><p>Try refreshing this page. The main dashboard is available from the navigation above.</p>';}
 }
 start();
})();
