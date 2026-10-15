const toast=document.querySelector('.toast');let toastTimer;
function notify(message){if(!toast)return;toast.textContent=message;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),2600);}
document.querySelectorAll('.demo-check').forEach(button=>{button.addEventListener('click',()=>{const row=button.closest('.demo-row');const completed=row.classList.toggle('is-done');button.setAttribute('aria-pressed',String(completed));const title=row.querySelector('strong').textContent;button.setAttribute('aria-label','演示：'+(completed?'取消完成':'完成')+title);});});
document.querySelector('.reset-demo')?.addEventListener('click',()=>{document.querySelectorAll('.interactive-sheet .demo-row').forEach(row=>{row.classList.remove('is-done');const button=row.querySelector('.demo-check');button.setAttribute('aria-pressed','false');button.setAttribute('aria-label','演示：完成'+row.querySelector('strong').textContent);});});
const dialog=document.querySelector('.alarm-dialog');let previousFocus;
document.querySelector('[data-open-alarm]')?.addEventListener('click',()=>{previousFocus=document.activeElement;dialog.showModal();});
function closeAlarm(){dialog?.close();previousFocus?.focus();}
document.querySelector('[data-close-alarm]')?.addEventListener('click',closeAlarm);
dialog?.addEventListener('close',()=>previousFocus?.focus());
document.querySelectorAll('[data-alarm-action]').forEach(button=>button.addEventListener('click',()=>{closeAlarm();notify(button.dataset.alarmAction==='完成'?'完成了这一段预览。':'预览已关闭，不会创建真实提醒。');}));
document.querySelector('[data-copy-hash]')?.addEventListener('click',async()=>{const hash=document.querySelector('#checksum-value').textContent.trim();try{await navigator.clipboard.writeText(hash);notify('校验码已复制。');}catch{notify('请手动复制上方校验码。');}});
if(location.hostname==='127.0.0.1'||location.hostname==='localhost'){const updates=new EventSource('/__updates');updates.addEventListener('message',()=>location.reload());}
