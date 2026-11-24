// Register optional offline support only on secure origins (GitHub Pages or localhost).
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js', {scope:'./',updateViaCache:'none'}).catch(() => {
      // Website remains usable even if offline installation is unavailable.
    });
  });
}
// Compare the loaded release with the online directory version; never clear user storage.
(()=>{
 const current='2026.11.24-expansion1-r2'; let checking=false; const get=k=>{try{return sessionStorage.getItem(k)}catch{return null}}; const put=(k,v)=>{try{sessionStorage.setItem(k,v)}catch{}}; const later="porchlight.update.later", pending="porchlight.update.pending"; let dismissed;
 async function confirmed(target){for(let i=0;i<30;i++){const worker=navigator.serviceWorker?.controller;if(worker){const version=await new Promise(resolve=>{const c=new MessageChannel();const t=setTimeout(()=>{c.port1.close();resolve(null)},500);c.port1.onmessage=e=>{clearTimeout(t);c.port1.close();resolve(e.data.version)};worker.postMessage({type:"VERSION"},[c.port2]);});if(version===target)return true;}await new Promise(r=>setTimeout(r,500));}return false;}
 async function check(manual=false){
  if(checking)return; checking=true;
  const status=document.getElementById('porchlight-update-status');
  try{
   const response=await fetch('./data/version.json?check='+Date.now(),{cache:'no-store'});
   if(!response.ok)throw Error('Unavailable');
   const info=await response.json();
   if(info.version===current){if(manual&&status)status.textContent='Porchlight is up to date.';return;}
   if(!info.version||document.getElementById('porchlight-update-banner'))return; if(!manual&&(dismissed===info.version||get(later)===info.version))return;
   const panel=document.createElement('section');panel.id='porchlight-update-banner';panel.className='panel';panel.setAttribute('role','status');
   panel.innerHTML='<h2>New opportunities are waiting!</h2><p>Porchlight’s volunteer directory has been updated. Refresh to explore the latest opportunities in your community.</p><button type="button" id="porchlight-refresh">Update Porchlight</button> <button type="button" id="porchlight-later">Maybe later</button>';
   document.querySelector('main').prepend(panel);
   panel.querySelector('#porchlight-later').onclick=()=>{dismissed=info.version;put(later,info.version);panel.remove()};
 const button=panel.querySelector('#porchlight-refresh'); const progress=document.createElement('p');progress.setAttribute('role','status');panel.append(progress);if(document.getElementById('assessment-app')){button.disabled=true;progress.textContent='Finish your assessment first, then update from another page.';}
   button.onclick=async()=>{button.disabled=true;progress.textContent='Preparing update…';try{const reg=await navigator.serviceWorker?.getRegistration();if(!reg)throw Error();await reg.update();if(!await confirmed(info.version))throw Error();put(pending,info.version);location.reload();}catch{progress.textContent='Update could not be confirmed. Please try again later.';button.disabled=false;}};
  }catch{if(manual&&status)status.textContent='Unable to check online. Reconnect and try again.';}finally{checking=false;}
 }
 window.addEventListener('load',async()=>{if(get(pending)===current&&await confirmed(current)){const msg=document.createElement('p');msg.className='notice';msg.setAttribute('role','status');msg.textContent='Porchlight has been updated.';document.querySelector('main').prepend(msg);put(pending,'');}check();document.getElementById('porchlight-check-update')?.addEventListener('click',()=>check(true));});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)check();});window.addEventListener('online',()=>check());
})();
