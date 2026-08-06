const API = 'http://localhost:8765';
const $ = id => document.getElementById(id);
const videoUrl=$('videoUrl'),format=$('format'),downloadBtn=$('downloadBtn');
const statusCard=$('statusCard'),statusText=$('statusText'),statusSpinner=$('statusSpinner'),statusContent=$('statusContent');
const serverStatus=$('serverStatus'),setupGuide=$('setupGuide'),mainUI=$('mainUI');
const historyList=$('historyList'),clearHistory=$('clearHistory');

const openFolderBtn = document.getElementById('openFolderBtn');
const copyTrigger = document.querySelector('.copy-trigger');
const copyNotice = document.getElementById('copyNotice');

async function autoFill(){
  try{
    const[tab]=await chrome.tabs.query({active:true,currentWindow:true});
    if(tab?.url&&!tab.url.startsWith('chrome://')&&!tab.url.startsWith('brave://')&&!tab.url.startsWith('about:'))
      videoUrl.value=tab.url;
  }catch(e){}
}
autoFill();

async function checkServer(){
  try{
    const res=await fetch(API+'/status',{signal:AbortSignal.timeout(2000)});
    if(res.ok){
      serverStatus.className='status-pill online';
      serverStatus.querySelector('.status-text').textContent='Online';
      setupGuide.classList.add('hidden');
      mainUI.classList.remove('hidden');
      return true;
    }
  }catch(e){}
  serverStatus.className='status-pill offline';
  serverStatus.querySelector('.status-text').textContent='Offline';
  setupGuide.classList.remove('hidden');
  mainUI.classList.add('hidden');
  return false;
}
checkServer();
setInterval(checkServer,5000);

downloadBtn.addEventListener('click',async()=>{
  const url=videoUrl.value.trim();
  if(!url){videoUrl.focus();return;}
  downloadBtn.disabled=true;
  downloadBtn.querySelector('span').textContent='Processing...';
  statusCard.classList.remove('hidden');
  statusSpinner.style.display='block';
  statusText.textContent='Starting download...';
  statusContent.className='status-content';
  try{
    const res=await fetch(API+'/download',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({url,format:format.value,output_dir:'./downloads'})
    });
    const data=await res.json();
    if(data.error)throw new Error(data.error);
    pollProgress(data.task_id,url);
  }catch(e){
    showResult('error',e.message);
    addHistory(url,false);
    downloadBtn.disabled=false;
    downloadBtn.querySelector('span').textContent='Download';
  }
});

function pollProgress(taskId,url){
  const interval=setInterval(async()=>{
    try{
      const res=await fetch(API+'/progress/'+taskId);
      const d=await res.json();
      if(d.status==='downloading'){
        statusText.textContent=`${d.progress||0}% — ${d.speed||''} ETA: ${d.eta||'?'}`;
      }else if(d.status==='processing'){
        statusText.textContent='Converting...';
      }else if(d.status==='completed'){
        showResult('success','Download complete!');
        addHistory(url,true,d.title||d.filename);
        clearInterval(interval);
        downloadBtn.disabled=false;
        downloadBtn.querySelector('span').textContent='Download';
      }else if(d.status==='error'){
        showResult('error',d.error||'Unknown error');
        addHistory(url,false);
        clearInterval(interval);
        downloadBtn.disabled=false;
        downloadBtn.querySelector('span').textContent='Download';
      }
    }catch(e){clearInterval(interval);}
  },1000);
}

function showResult(type,msg){
  statusSpinner.style.display='none';
  statusText.textContent=msg;
  statusContent.className='status-content '+type;
  if(type==='success')setTimeout(()=>statusCard.classList.add('hidden'),4000);
}

function addHistory(url,success,title){
  const empty=historyList.querySelector('.empty-state');
  if(empty)empty.remove();
  const item=document.createElement('div');
  item.className='history-item';
  const display=title||(url.length>32?url.substring(0,32)+'...':url);
  const time=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  item.innerHTML='<div class="h-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></div><div class="h-info"><div class="h-title" title="'+display+'">'+display+'</div><div class="h-time">'+time+'</div></div><span class="h-badge '+(success?'done':'failed')+'">'+(success?'Done':'Failed')+'</span>';
  historyList.prepend(item);
  while(historyList.children.length>20)historyList.removeChild(historyList.lastChild);
}

clearHistory.addEventListener('click',()=>{
  historyList.innerHTML='<div class="empty-state"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><p>No downloads yet</p></div>';
});

videoUrl.addEventListener('keydown',e=>{if(e.key==='Enter')downloadBtn.click();});

// ============================================================
// v1.2.2 - COPY & RUN (sadece start-server.bat kopyalar)
// ============================================================

openFolderBtn.addEventListener('click', async () => {
  const fileName = 'start-server.bat';

  try {
    await navigator.clipboard.writeText(fileName);
  } catch (err) {
    console.error('Copy failed:', err);
  }

  const instructions = document.getElementById('openInstructions');
  if (instructions) {
    instructions.classList.remove('hidden');
  }

  const btnSpan = openFolderBtn.querySelector('span');
  const originalText = btnSpan.textContent;
  btnSpan.textContent = 'Copied!';
  openFolderBtn.style.background = 'linear-gradient(135deg, #00d68f, #00a87a)';

  setTimeout(() => {
    btnSpan.textContent = originalText;
    openFolderBtn.style.background = '';
  }, 2000);
});

if (copyTrigger) {
  copyTrigger.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('start-server.bat');
      if (copyNotice) {
        copyNotice.classList.remove('hidden');
        setTimeout(() => copyNotice.classList.add('hidden'), 2000);
      }
      copyTrigger.style.background = 'rgba(0, 214, 143, 0.2)';
      setTimeout(() => copyTrigger.style.background = '', 300);
    } catch (err) { console.error('Copy failed:', err); }
  });
}