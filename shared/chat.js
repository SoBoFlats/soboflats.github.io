function SoBoChat(containerId){
  this.el=document.getElementById(containerId);
  this.msgs=null;
  this.optsWrap=null;
  this.backBtn=null;
  this.history=[];
  this._init();
}
SoBoChat.prototype._init=function(){
  this.el.innerHTML='<div class="chat-messages" id="'+this.el.id+'_msgs"></div><div id="'+this.el.id+'_opts"></div><button class="chat-back-btn" id="'+this.el.id+'_back" style="display:none" onclick="void(0)">&larr; Back</button>';
  this.msgs=document.getElementById(this.el.id+'_msgs');
  this.optsWrap=document.getElementById(this.el.id+'_opts');
  this.backBtn=document.getElementById(this.el.id+'_back');
  var self=this;
  this.backBtn.addEventListener('click',function(){self.back()});
};
SoBoChat.prototype.addBot=function(text,isHtml,delay){
  var self=this;
  var d=delay!==undefined?delay:500;
  var t=document.createElement('div');t.className='chat-typing';t.innerHTML='<span></span><span></span><span></span>';
  self.msgs.appendChild(t);self._scroll();
  return new Promise(function(resolve){
    setTimeout(function(){
      if(t.parentNode)t.remove();
      var m=document.createElement('div');m.className='chat-msg chat-bot';
      if(isHtml)m.innerHTML=text;else m.textContent=text;
      self.msgs.appendChild(m);
      self.history.push({type:'bot',el:m});
      self._scroll();
      resolve(m);
    },d);
  });
};
SoBoChat.prototype.addUser=function(text){
  var m=document.createElement('div');m.className='chat-msg chat-user';m.textContent=text;
  this.msgs.appendChild(m);
  this.history.push({type:'user',el:m});
  this._scroll();
  return m;
};
SoBoChat.prototype.showOptions=function(items,callback){
  var self=this;
  self.optsWrap.innerHTML='';
  var grid=document.createElement('div');grid.className='q1-options';
  items.forEach(function(it){
    var b=document.createElement('button');b.className='q1-btn'+(it.disabled?' disabled':'');
    b.innerHTML=(it.icon?'<span class="q1-icon">'+it.icon+'</span>':'')+it.label+(it.sub?'<span class="q1-sub">'+it.sub+'</span>':'')+(it.soon?'<span class="q1-soon">COMING SOON</span>':'');
    if(!it.disabled)b.addEventListener('click',function(){
      self.addUser(it.label);
      self.optsWrap.innerHTML='';
      self.history.push({type:'opts',items:items,callback:callback});
      self._updateBack();
      callback(it.val||it.label);
    });
    grid.appendChild(b);
  });
  self.optsWrap.appendChild(grid);
  self._scroll();
  self._updateBack();
};
SoBoChat.prototype.back=function(){
  if(!this.history.length)return;
  var last=this.history[this.history.length-1];
  if(last.type==='opts'){
    this.history.pop();
    if(this.history.length&&this.history[this.history.length-1].type==='user'){
      var u=this.history.pop();if(u.el&&u.el.parentNode)u.el.remove();
    }
    this.showOptions(last.items,last.callback);
  } else {
    while(this.history.length){
      var e=this.history[this.history.length-1];
      if(e.type==='opts')break;
      this.history.pop();
      if(e.el&&e.el.parentNode)e.el.remove();
    }
    if(this.history.length){
      var o=this.history.pop();
      this.showOptions(o.items,o.callback);
    }
  }
  this._updateBack();
};
SoBoChat.prototype._updateBack=function(){
  var hasOpts=this.history.some(function(h){return h.type==='opts'});
  this.backBtn.style.display=hasOpts?'block':'none';
};
SoBoChat.prototype._scroll=function(){
  var self=this;
  setTimeout(function(){self.el.scrollTop=self.el.scrollHeight},50);
};
