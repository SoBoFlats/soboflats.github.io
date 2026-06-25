// Share & Download module for all RE tools
// Each tool sets window.sdConfig = { toolName, toolIcon, shareTitle, shareUrl, fileName }
// Each tool defines window.buildCaptureContent = function() { return { subtitle:'...', body:'<html>' } }
(function(){
var cfg, saveType='end';

function injectHTML(){
  cfg=window.sdConfig||{};
  var shareTitle=cfg.shareTitle||cfg.toolName||'Tool';

  // Float button
  var fab=document.createElement('div');fab.className='sd-float-pair';
  fab.innerHTML='<button class="sd-float-btn" id="sdShareBtn" title="Share '+shareTitle+'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></button>';
  document.body.appendChild(fab);

  // Share modal
  var sm=document.createElement('div');sm.className='sd-modal-overlay';sm.id='sdShareModal';
  sm.setAttribute('onclick',"if(event.target===this)sdCloseModal('sdShareModal')");
  sm.innerHTML='<div class="sd-modal-sheet"><div class="sd-modal-handle"></div><div class="sd-modal-title">Share '+shareTitle+'</div><button class="sd-modal-btn" id="sdShareLink">&#128279; Share Calculator Link</button><button class="sd-modal-btn" id="sdShareImage">&#128247; Share as Image</button><button class="sd-modal-cancel" id="sdShareCancel">Cancel</button></div>';
  document.body.appendChild(sm);

  // Save modal
  var sv=document.createElement('div');sv.className='sd-modal-overlay';sv.id='sdSaveModal';
  sv.setAttribute('onclick',"if(event.target===this)sdCloseModal('sdSaveModal')");
  sv.innerHTML='<div class="sd-modal-sheet"><div class="sd-modal-handle"></div>'
    +'<div id="sdStep1"><div class="sd-modal-title">Download '+shareTitle+'</div><div class="sd-modal-note">Choose how you want to download</div>'
    +'<div class="sd-utype-row"><button class="sd-utype-btn active" id="sdBtnEnd">End User</button><button class="sd-utype-btn" id="sdBtnCP">Broker / CP</button></div>'
    +'<button class="sd-modal-btn primary" id="sdStep1Dl">&#128247; Download Image</button><button class="sd-modal-cancel" id="sdStep1Cancel">Cancel</button></div>'
    +'<div id="sdStep2" style="display:none"><div class="sd-modal-title">Download '+shareTitle+'</div><div class="sd-modal-note">Add your contact details to the image?</div>'
    +'<div class="sd-utype-row"><button class="sd-utype-btn" id="sdBtnYes">Yes, add details</button><button class="sd-utype-btn" id="sdBtnNo">No, just save</button></div>'
    +'<div id="sdCpForm" style="display:none"><label class="sd-modal-label">Full Name</label><input type="text" class="sd-modal-input" id="sdCpName" placeholder="Your name">'
    +'<label class="sd-modal-label">Contact Number</label><input type="tel" class="sd-modal-input" id="sdCpPhone" placeholder="Phone number">'
    +'<label class="sd-modal-label">Company (Optional)</label><input type="text" class="sd-modal-input" id="sdCpCompany" placeholder="Company name"></div>'
    +'<button class="sd-modal-btn primary" id="sdStep2Dl">&#128247; Download Image</button><button class="sd-modal-cancel" id="sdStep2Back" style="margin-top:4px">&#8249; Back</button>'
    +'<button class="sd-modal-cancel" id="sdStep2Cancel">Cancel</button></div></div>';
  document.body.appendChild(sv);

  // Capture area
  var cap=document.createElement('div');cap.id='sdCaptureArea';
  cap.style.cssText='display:none;background:#f4f1ea;max-width:430px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;overflow:hidden;border-radius:16px;color:#1a1a1a';
  cap.innerHTML='<div style="padding:16px 18px 12px;border-bottom:1px solid rgba(0,0,0,.08)">'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><span style="font-size:22px" id="sdCapIcon"></span><span style="font-size:18px;font-weight:800;letter-spacing:-.3px" id="sdCapTitle"></span></div>'
    +'<div id="sdCapSubtitle" style="font-size:11px;color:#666;line-height:1.4"></div></div>'
    +'<div id="sdCapBody" style="padding:12px 18px"></div>'
    +'<div style="padding:6px 18px 8px;text-align:center"><span style="font-size:9px;color:#999">Powered by HousieAi.com</span></div>'
    +'<div id="sdCapFooter" style="display:none;background:rgba(72,199,142,.12);border-top:2px solid rgba(72,199,142,.3);padding:10px 18px">'
    +'<div style="display:flex;align-items:center;justify-content:space-between"><div><div id="sdCapFName" style="font-size:14px;font-weight:800;color:#1a1a1a"></div>'
    +'<div id="sdCapFPhone" style="font-size:12px;color:#666;margin-top:1px"></div></div>'
    +'<div id="sdCapFCompany" style="font-size:13px;font-weight:800;color:#1a1a1a;text-align:right;max-width:140px"></div></div></div>';
  document.body.appendChild(cap);

  // Toast
  var to=document.createElement('div');to.id='sdToastOverlay';to.className='sd-toast-overlay';
  to.setAttribute('onclick','sdDismissToast()');
  document.body.appendChild(to);
  var tt=document.createElement('div');tt.id='sdToast';tt.className='sd-toast';
  tt.innerHTML='Image saved! &#128247;<br><small style="color:var(--text3)">Check your downloads folder</small><br><button class="sd-toast-ok" onclick="sdDismissToast()">OK</button>';
  document.body.appendChild(tt);
}

function wireEvents(){
  document.getElementById('sdShareBtn').addEventListener('click',function(){document.getElementById('sdShareModal').classList.add('open')});
  document.getElementById('sdShareLink').addEventListener('click',doShareLink);
  document.getElementById('sdShareImage').addEventListener('click',function(){sdCloseModal('sdShareModal');openSaveModal()});
  document.getElementById('sdShareCancel').addEventListener('click',function(){sdCloseModal('sdShareModal')});
  document.getElementById('sdBtnEnd').addEventListener('click',function(){setSaveType('end')});
  document.getElementById('sdBtnCP').addEventListener('click',function(){setSaveType('cp')});
  document.getElementById('sdStep1Dl').addEventListener('click',doDownloadImage);
  document.getElementById('sdStep1Cancel').addEventListener('click',function(){sdCloseModal('sdSaveModal')});
  document.getElementById('sdBtnYes').addEventListener('click',function(){showCpForm(true)});
  document.getElementById('sdBtnNo').addEventListener('click',function(){showCpForm(false)});
  document.getElementById('sdStep2Dl').addEventListener('click',doDownloadImage);
  document.getElementById('sdStep2Back').addEventListener('click',goBackStep1);
  document.getElementById('sdStep2Cancel').addEventListener('click',function(){sdCloseModal('sdSaveModal')});
}

function openSaveModal(){
  saveType='end';
  document.getElementById('sdStep1').style.display='block';
  document.getElementById('sdStep2').style.display='none';
  document.getElementById('sdBtnEnd').classList.add('active');
  document.getElementById('sdBtnCP').classList.remove('active');
  document.getElementById('sdCpForm').style.display='none';
  document.getElementById('sdSaveModal').classList.add('open');
}

function setSaveType(t){
  saveType=t;
  document.getElementById('sdBtnEnd').classList.toggle('active',t==='end');
  document.getElementById('sdBtnCP').classList.toggle('active',t==='cp');
  if(t==='cp'){
    document.getElementById('sdStep1').style.display='none';
    document.getElementById('sdStep2').style.display='block';
    document.getElementById('sdCpForm').style.display='none';
    document.getElementById('sdBtnYes').classList.remove('active');
    document.getElementById('sdBtnNo').classList.remove('active');
  }else{
    document.getElementById('sdStep1').style.display='block';
    document.getElementById('sdStep2').style.display='none';
  }
}

function showCpForm(show){
  document.getElementById('sdBtnYes').classList.toggle('active',show);
  document.getElementById('sdBtnNo').classList.toggle('active',!show);
  document.getElementById('sdCpForm').style.display=show?'block':'none';
  if(show){
    try{var s=JSON.parse(localStorage.getItem('cp_details')||'null');
    if(s){document.getElementById('sdCpName').value=s.name||'';document.getElementById('sdCpPhone').value=s.phone||'';document.getElementById('sdCpCompany').value=s.company||'';}}catch(e){}
  }else{saveType='cp_nodetails'}
}

function goBackStep1(){
  document.getElementById('sdStep2').style.display='none';
  document.getElementById('sdStep1').style.display='block';
  saveType='end';
  document.getElementById('sdBtnEnd').classList.add('active');
  document.getElementById('sdBtnCP').classList.remove('active');
}

function doShareLink(){
  var url=cfg.shareUrl||window.location.href;
  if(navigator.share)navigator.share({title:cfg.shareTitle||cfg.toolName,url:url}).catch(function(){});
  else{navigator.clipboard.writeText(url).then(function(){alert('Link copied!')}).catch(function(){var t=document.createElement('textarea');t.value=url;document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);alert('Link copied!')})}
  sdCloseModal('sdShareModal');
}

function doDownloadImage(){
  if(typeof window.buildCaptureContent!=='function'){alert('Download not available for this tool.');return}
  var content=window.buildCaptureContent();
  if(!content)return;
  var cap=document.getElementById('sdCaptureArea');
  document.getElementById('sdCapIcon').innerHTML=cfg.toolIcon||'';
  document.getElementById('sdCapTitle').textContent=cfg.toolName||'Calculator';
  document.getElementById('sdCapSubtitle').textContent=content.subtitle||'';
  document.getElementById('sdCapBody').innerHTML=content.body||'';

  var footer=document.getElementById('sdCapFooter');
  if(saveType==='cp'){
    var name=document.getElementById('sdCpName').value.trim(),phone=document.getElementById('sdCpPhone').value.trim(),company=document.getElementById('sdCpCompany').value.trim();
    if(!name||!phone){alert('Please enter your name and phone number.');return}
    try{localStorage.setItem('cp_details',JSON.stringify({name:name,phone:phone,company:company}))}catch(e){}
    document.getElementById('sdCapFName').textContent=name;
    document.getElementById('sdCapFPhone').textContent=phone;
    document.getElementById('sdCapFCompany').textContent=company;
    footer.style.display='block';
  }else{footer.style.display='none'}

  cap.style.display='block';sdCloseModal('sdSaveModal');

  setTimeout(function(){
    if(typeof html2canvas==='undefined'){alert('Image library loading. Please try again.');cap.style.display='none';return}
    html2canvas(cap,{allowTaint:false,useCORS:false,backgroundColor:'#f4f1ea',scale:2,logging:false}).then(function(canvas){
      cap.style.display='none';
      var dataUrl=canvas.toDataURL('image/jpeg',0.92);
      var isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);
      if(isIOS){window.open(dataUrl,'_blank')}
      else{var a=document.createElement('a');a.download=(cfg.fileName||'tool-details')+'.jpg';a.href=dataUrl;document.body.appendChild(a);a.click();document.body.removeChild(a)}
      document.getElementById('sdToastOverlay').style.display='block';
      document.getElementById('sdToast').style.display='block';
    }).catch(function(){cap.style.display='none';alert('Screenshot failed. Please try again.')});
  },100);
}

window.sdCloseModal=function(id){document.getElementById(id).classList.remove('open')};
window.sdDismissToast=function(){document.getElementById('sdToastOverlay').style.display='none';document.getElementById('sdToast').style.display='none'};

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){injectHTML();wireEvents()})}
else{injectHTML();wireEvents()}
})();
