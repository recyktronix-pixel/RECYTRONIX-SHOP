// RECYKTRONIX Listings Sync — zatwierdzone ogłoszenia użytkowników z Supabase + moderacja w adminie
(function(){
"use strict";
const cfg=window.SUPABASE_CONFIG||{};
const sbReady=!!(window.supabase&&cfg.url&&cfg.anonKey);
const sb=sbReady?window.supabase.createClient(cfg.url,cfg.anonKey):null;
const $=id=>document.getElementById(id);

function toProduct(row){
  return {
    id:"lst-"+row.id,
    remoteId:row.id,
    name:row.name,
    price:Number(row.price)||0,
    category:row.category||"other",
    condition:row.condition||"new",
    stock:1,
    description:row.description||"",
    image:row.image||"",
    userAdded:true
  };
}

async function syncApproved(){
  if(!sb||typeof products==="undefined")return;
  try{
    const{data}=await sb.from("listings").select("*").eq("status","approved");
    if(!data||!data.length)return;
    let changed=false;
    data.forEach(row=>{
      const pid="lst-"+row.id;
      if(!products.some(p=>String(p.id)===pid)){
        products.push(toProduct(row));changed=true;
      }
    });
    if(changed&&typeof renderProducts==="function")renderProducts();
  }catch(_){}
}

async function loadPending(){
  const list=$("adminListingsList");if(!list)return;
  if(!sb){list.innerHTML='<p class="admin-hint">Wymaga konfiguracji Supabase (supabase-config.js).</p>';return;}
  try{
    const{data}=await sb.from("listings").select("*").eq("status","pending").order("created_at",{ascending:false});
    if(!data||!data.length){list.innerHTML='<p class="admin-hint">Brak oczekujących ogłoszeń.</p>';return;}
    list.innerHTML=data.map(r=>`
      <div class="admin-item">
        <div class="admin-item-info">
          <div class="admin-item-name">${escapeHtml(r.name)} <small>(${Number(r.price).toFixed(2)} EUR)</small></div>
          <div class="admin-item-details">${escapeHtml(r.category||"-")} | ${r.condition||"new"} | ${escapeHtml((r.description||"").slice(0,80))}</div>
        </div>
        <div class="admin-item-actions">
          <button class="lst-approve" data-id="${r.id}">✓ Zatwierdź</button>
          <button class="lst-reject" data-id="${r.id}">✕ Odrzuć</button>
        </div>
      </div>`).join("");
    list.querySelectorAll(".lst-approve").forEach(b=>b.addEventListener("click",()=>moderate(b.dataset.id,"approved",b)));
    list.querySelectorAll(".lst-reject").forEach(b=>b.addEventListener("click",()=>moderate(b.dataset.id,"rejected",b)));
  }catch(e){
    list.innerHTML='<p class="admin-hint">Błąd: '+escapeHtml(String(e.message||e))+'</p>';
  }
}

async function moderate(id,status,btn){
  btn.disabled=true;
  try{
    const{error}=await sb.from("listings").update({status}).eq("id",id);
    if(error)throw error;
    btn.closest(".admin-item").remove();
    if(status==="approved")syncApproved();
  }catch(e){
    btn.disabled=false;alert("Błąd: "+(e.message||e));
  }
}

function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}

function init(){
  // sync przy starcie (z opóźnieniem, żeby products się załadowały)
  setTimeout(syncApproved,800);
  // moderacja: ładuj listę po otwarciu admina i przy zakładce Listings
  const adminBtn=$("adminButton");
  if(adminBtn)adminBtn.addEventListener("click",()=>setTimeout(loadPending,300));
  document.querySelectorAll(".admin-tab").forEach(t=>{
    t.addEventListener("click",()=>{if(t.dataset.tab==="listings")setTimeout(loadPending,50);});
  });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
