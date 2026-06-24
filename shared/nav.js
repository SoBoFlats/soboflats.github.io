(function(){
var WA_SVG='<svg width="__W__" height="__H__" viewBox="0 0 24 24" fill="#25d366" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
function wa(w,h){return WA_SVG.replace('__W__',w).replace('__H__',h)}

var NAV_HTML='\
<div class="nav-overlay" id="navOverlay" onclick="closeNav()"></div>\
<div class="nav-tray" id="navTray">\
  <div class="nav-intro">\
    <button class="nav-tray-close" onclick="closeNav()">&#215;</button>\
    <div class="nav-intro-header">\
      <img src="./intro_oswal.jpeg" class="nav-intro-img" onerror="this.style.display=\'none\'" alt="Oswal Properties" onclick="event.stopPropagation();openNavThumb(this.src)">\
      <a href="./index.html" style="min-width:0;text-decoration:none"><div class="nav-tray-logo">Oswal Properties</div><div class="nav-tray-sub">Luxury &middot; Residential &middot; SoBo</div></a>\
    </div>\
    <p class="nav-intro-text"><b>RERA approved</b> Real Estate Consultancy firm, since 9 years professionally (30+ years locally). We specialise <b>ONLY</b> in <b>Luxury Residential Properties in South Bombay</b>.</p>\
    <p class="nav-intro-text nav-rera-text" style="margin-top:6px;font-size:10px">RERA Reg. No: A51900031717</p>\
  </div>\
  <div class="nav-profile-row">\
    <img src="./photo.jpeg" class="nav-profile-photo" onerror="this.style.display=\'none\'" alt="Vaibhav Oswal" onclick="event.stopPropagation();event.preventDefault();openNavThumb(this.src)">\
    <div class="nav-profile-info">\
      <div class="nav-profile-name">Vaibhav Oswal</div>\
      <div class="nav-profile-phone"><a href="https://wa.me/918828340668" target="_blank" rel="noopener">'+wa(11,11)+'88283 40668</a></div>\
    </div>\
    <button class="nav-team-toggle" id="teamToggleBtn" onclick="toggleTeam()" title="Team">&#8964;</button>\
  </div>\
  <div class="nav-team-section" id="navTeamSection">\
    <a class="nav-team-row" href="https://wa.me/917400494703" target="_blank" rel="noopener">\
      <img src="./team_vandana.jpeg" class="nav-team-photo" onerror="this.style.display=\'none\'" alt="" onclick="event.stopPropagation();event.preventDefault();openNavThumb(this.src)">\
      <div><div class="nav-team-name">Vandana Bhandari</div><div class="nav-team-role">Channel Sales, Rent</div><div class="nav-team-phone">'+wa(10,10)+'74004 94703</div></div>\
    </a>\
    <a class="nav-team-row" href="https://wa.me/919324059959" target="_blank" rel="noopener">\
      <img src="./team_aditi.jpeg" class="nav-team-photo" onerror="this.style.display=\'none\'" alt="" onclick="event.stopPropagation();event.preventDefault();openNavThumb(this.src)">\
      <div><div class="nav-team-name">Aditi Jain</div><div class="nav-team-role">Direct Sales, Rent</div><div class="nav-team-phone">'+wa(10,10)+'93240 59959</div></div>\
    </a>\
    <a class="nav-team-row" href="https://wa.me/919137848224" target="_blank" rel="noopener">\
      <img src="./team_bhavin.jpeg" class="nav-team-photo" onerror="this.style.display=\'none\'" alt="" onclick="event.stopPropagation();event.preventDefault();openNavThumb(this.src)">\
      <div><div class="nav-team-name">Bhavin Thakkar</div><div class="nav-team-role">Direct Sales, Rent</div><div class="nav-team-phone">'+wa(10,10)+'91378 48224</div></div>\
    </a>\
  </div>\
  <div class="nav-tray-items">\
    <a href="./index.html" class="nav-tray-item" data-nav="home">\
      <span class="nav-tray-icon">&#127968;</span>\
      <span class="nav-tray-label">Home</span>\
      <span class="nav-tray-chevron">&#8250;</span>\
    </a>\
    <a href="./RentPortfolio.html" class="nav-tray-item" data-nav="portfolio">\
      <span class="nav-tray-icon">&#128203;</span>\
      <span class="nav-tray-label">Rent Portfolio</span>\
      <span class="nav-tray-chevron">&#8250;</span>\
    </a>\
    <div class="nav-tray-item disabled-item">\
      <span class="nav-tray-icon">&#127963;</span>\
      <span class="nav-tray-label">Resale Portfolio</span>\
      <span class="nav-tray-soon">Coming Soon</span>\
    </div>\
    <a href="./sitevisit.html" class="nav-tray-item" data-nav="sitevisit">\
      <span class="nav-tray-icon">&#128197;</span>\
      <span class="nav-tray-label">Book Site Visit</span>\
      <span class="nav-tray-chevron">&#8250;</span>\
    </a>\
    <a href="./queries.html" class="nav-tray-item" data-nav="queries">\
      <span class="nav-tray-icon">&#128221;</span>\
      <span class="nav-tray-label">Listing Details</span>\
      <span class="nav-tray-chevron">&#8250;</span>\
    </a>\
    <a href="./requirement.html" class="nav-tray-item" data-nav="requirement">\
      <span class="nav-tray-icon">&#128203;</span>\
      <span class="nav-tray-label">Post Your Requirement</span>\
      <span class="nav-tray-chevron">&#8250;</span>\
    </a>\
    <a href="./PostYourProperty.html" class="nav-tray-item" data-nav="postproperty">\
      <span class="nav-tray-icon">&#128206;</span>\
      <span class="nav-tray-label">List Your Property</span>\
      <span class="nav-tray-chevron">&#8250;</span>\
    </a>\
    <a href="./BrokerTools.html" class="nav-tray-item" data-nav="retools">\
      <span class="nav-tray-icon">&#128736;</span>\
      <span class="nav-tray-label">Real Estate Tools</span>\
      <span class="nav-tray-chevron">&#8250;</span>\
    </a>\
    <a href="./WhatsappCommunity.html" class="nav-tray-item" data-nav="community">\
      <span class="nav-tray-icon">'+wa(18,18)+'</span>\
      <span class="nav-tray-label">Join WhatsApp Community</span>\
      <span class="nav-tray-chevron">&#8250;</span>\
    </a>\
  </div>\
  <div class="nav-theme-row">\
    <span class="nav-theme-label">Theme: Day / Night</span>\
    <button class="nav-theme-btn" id="navThemeToggle" onclick="navToggleTheme()">&#9790;</button>\
  </div>\
  <div class="nav-tray-footer">\
    <button class="nav-build-btn" onclick="toggleBuildContact()">\
      <span style="font-size:22px">&#128161;</span>\
      <span class="nav-build-label">Want an app like this?\
        <span class="nav-build-sub">Build your own portfolio</span>\
      </span>\
      <span id="buildChevron" style="font-size:16px;color:rgba(255,217,102,.55);transition:transform .2s">&#8250;</span>\
    </button>\
    <div class="nav-contact-card" id="navContactCard">\
      <div class="nav-contact-name">Vaibhav Oswal</div>\
      <div class="nav-contact-role">Real Estate &amp; Tech</div>\
      <a class="nav-contact-wa" href="https://wa.me/918828340668?text=I%20saw%20your%20Portfolio%20app%20and%20I%20want%20to%20build%20one%20for%20myself." target="_blank" rel="noopener">\
        '+wa(20,20)+'\
        WhatsApp &middot; 8828340668\
      </a>\
    </div>\
  </div>\
</div>\
<div id="navThumbOverlay" class="nav-thumb-overlay" onclick="closeNavThumb()">\
  <img id="navThumbImg" src="" alt="" class="nav-thumb-full">\
  <button class="nav-thumb-close" onclick="closeNavThumb()">&times;</button>\
</div>\
<button class="hamburger-btn" onclick="openNav()" aria-label="Menu">\
  <svg width="17" height="13" viewBox="0 0 17 13" fill="none">\
    <rect width="17" height="2" rx="1" fill="currentColor"/>\
    <rect y="5.5" width="17" height="2" rx="1" fill="currentColor"/>\
    <rect y="11" width="17" height="2" rx="1" fill="currentColor"/>\
  </svg>\
</button>';

var ACTIVE_MAP={
  'index.html':'home',
  'RentPortfolio.html':'portfolio',
  'queries.html':'queries',
  'requirement.html':'requirement',
  'sitevisit.html':'sitevisit',
  'PostYourProperty.html':'postproperty',
  'BrokerTools.html':'retools',
  'WhatsappCommunity.html':'community'
};

function inject(){
  document.body.insertAdjacentHTML('afterbegin',NAV_HTML);
  var path=window.location.pathname;
  var file=path.substring(path.lastIndexOf('/')+1)||'index.html';
  var navId=ACTIVE_MAP[file];
  if(!navId&&/^\d+\.html$/.test(file))navId='portfolio';
  if(navId){
    var el=document.querySelector('[data-nav="'+navId+'"]');
    if(el)el.classList.add('active-item');
  }
  var m=file.match(/^(\d+)\.html$/);
  if(m){
    var s=m[1];
    document.querySelectorAll('.nav-tray-item').forEach(function(a){
      var h=a.getAttribute('href');if(!h)return;
      if(h.indexOf('sitevisit.html')>=0)a.setAttribute('href',h+(h.indexOf('?')>=0?'&':'?')+'serial='+s);
      else if(h.indexOf('queries.html')>=0)a.setAttribute('href',h+(h.indexOf('?')>=0?'&':'?')+'serial='+s);
    });
  }
  var btn=document.getElementById('navThemeToggle');
  if(btn)btn.textContent=document.documentElement.getAttribute('data-theme')==='light'?'☀':'☮';
}

function fixSubdirPaths(){
  if(window.location.pathname.indexOf('/tools/')< 0)return;
  var tray=document.getElementById('navTray');if(!tray)return;
  tray.querySelectorAll('a[href^="./"]').forEach(function(a){a.setAttribute('href','../'+a.getAttribute('href').substring(2))});
  tray.querySelectorAll('img[src^="./"]').forEach(function(img){img.setAttribute('src','../'+img.getAttribute('src').substring(2))});
}

var origInject=inject;
inject=function(){origInject();fixSubdirPaths()};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);
else inject();

window.openNav=function(){document.getElementById('navOverlay').classList.add('open');document.getElementById('navTray').classList.add('open');};
window.closeNav=function(){document.getElementById('navOverlay').classList.remove('open');document.getElementById('navTray').classList.remove('open');};
window.openNavThumb=function(src){if(!src)return;var ov=document.getElementById('navThumbOverlay');var im=document.getElementById('navThumbImg');if(!ov||!im)return;im.src=src;ov.classList.add('show');};
window.closeNavThumb=function(){var ov=document.getElementById('navThumbOverlay');if(ov)ov.classList.remove('show');};
window.toggleTeam=function(){
  var s=document.getElementById('navTeamSection');var b=document.getElementById('teamToggleBtn');
  var open=s.classList.toggle('open');
  var isLight=document.documentElement.getAttribute('data-theme')==='light';
  if(b){b.style.transform=open?'rotate(180deg)':'';b.style.color=open?(isLight?'rgba(0,0,0,.75)':'rgba(255,255,255,.75)'):'';}
};
window.toggleBuildContact=function(){
  var card=document.getElementById('navContactCard');var chev=document.getElementById('buildChevron');
  var open=card.classList.toggle('open');
  if(chev)chev.style.transform=open?'rotate(90deg)':'';
};
window.navToggleTheme=function(){if(typeof toggleTheme==='function')toggleTheme();};
})();
