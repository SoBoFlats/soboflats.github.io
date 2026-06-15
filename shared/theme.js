function toggleTheme(){
  var h=document.documentElement,d=h.getAttribute('data-theme')==='dark';
  h.setAttribute('data-theme',d?'light':'dark');
  var sym=d?'☀':'☮';
  ['themeToggle','navThemeToggle'].forEach(function(id){var e=document.getElementById(id);if(e)e.textContent=sym});
  try{localStorage.setItem('theme',d?'light':'dark')}catch(e){}
}
(function(){
  try{
    var t=localStorage.getItem('theme')||'light';
    document.documentElement.setAttribute('data-theme',t);
    var sym=t==='light'?'☀':'☮';
    ['themeToggle','navThemeToggle'].forEach(function(id){var e=document.getElementById(id);if(e)e.textContent=sym});
  }catch(e){}
})();
