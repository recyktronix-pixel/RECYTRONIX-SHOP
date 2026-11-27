// RECYKTRONIX Comments — opinie klientów (localStorage + opcjonalnie Supabase)
(function(){
"use strict";
const $=id=>document.getElementById(id);
const LS_KEY="recyktronix-comments";
const cfg=window.SUPABASE_CONFIG||{};
const sb=(window.supabase&&cfg.url&&cfg.anonKey)?window.supabase.createClient(cfg.url,cfg.anonKey):null;

function at(k){return (window.t?t(k):k);}
function load(){try{return JSON.parse(localStorage.getItem(LS_KEY)||"[]");}catch(_){return[];}}
function save(list){localStorage.setItem(LS_KEY,JSON.stringify(list));}

function render(list){
  const box=$("commentsList");if(!box)return;
  if(!list.length){box.innerHTML=`<p class="account-empty" data-i18n="comEmpty">${at("comEmpty")}</p>`;return;}
  box.innerHTML=list.slice().reverse().map(c=>`
    <div class="comment-item">
      <div class="comment-head"><strong>${escapeHtml(c.name)}</strong><span class="comment-stars">${"★".repeat(c.rating)}${"☆".repeat(5-c.rating)}</span><small>${new Date(c.ts).toLocaleDateString()}</small></div>
      <p>${escapeHtml(c.text)}</p>
    </div>`).join("");
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}

async function loadRemote(){
  if(!sb)return load();
  try{
    const{data}=await sb.from("comments").select("*").order("created_at",{ascending:false}).limit(50);
    if(data&&data.length)return data.map(r=>({name:r.name,rating:r.rating,text:r.text,ts:r.created_at}));
  }catch(_){}
  return load();
}

async function init(){
  const form=$("commentForm");if(!form)return;
  render(await loadRemote());
  form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const name=$("commentName").value.trim(),text=$("commentText").value.trim();
    const rating=parseInt($("commentRating").value,10)||5;
    const msg=$("commentMsg");
    if(!name||!text){msg.textContent=at("comBad");msg.style.color="#ff7b7b";return;}
    const item={name,rating,text,ts:new Date().toISOString()};
    const list=load();list.push(item);save(list);
    if(sb){try{await sb.from("comments").insert({name,rating,text});}catch(_){}}
    form.reset();render(load());
    msg.textContent=at("comThanks");msg.style.color="#4ade80";
    setTimeout(()=>{msg.textContent="";},3000);
  });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
