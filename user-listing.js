// RECYKTRONIX User Listing — użytkownik dodaje ogłoszenie: zdjęcie -> AI -> potwierdzenie wyceny/opisu
(function(){
"use strict";
const $=id=>document.getElementById(id);
const modal=$("listingModal");
let photoData=null,aiPending=false;

function at(k){return (window.t?t(k):k);}
function showToast(msg){
  const t=$("toast");if(!t)return;
  t.textContent=msg;t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),3200);
}

function fileToDataURL(file,maxSize=1024){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=()=>{
      const img=new Image();
      img.onload=()=>{
        const scale=Math.min(1,maxSize/Math.max(img.width,img.height));
        const w=Math.round(img.width*scale),h=Math.round(img.height*scale);
        const c=document.createElement("canvas");c.width=w;c.height=h;
        c.getContext("2d").drawImage(img,0,0,w,h);
        resolve(c.toDataURL("image/jpeg",0.82));
      };
      img.onerror=reject;img.src=reader.result;
    };
    reader.onerror=reject;reader.readAsDataURL(file);
  });
}

function populateCategory(){
  const sel=$("userListingCategory"),prodSel=$("prodCategory");
  if(sel&&prodSel&&sel.options.length===0)sel.innerHTML=prodSel.innerHTML;
}

async function runAI(){
  const url=(window.SUPABASE_CONFIG&&window.SUPABASE_CONFIG.listingAiUrl)||"";
  const msg=$("userListingMsg"),box=$("userListingAiBox");
  if(!url){msg.textContent=at("lstAiNeedCfg");msg.style.color="#ffb86b";return;}
  if(!photoData){msg.textContent=at("lstNeedPhoto");msg.style.color="#ff7b7b";return;}
  const btn=$("userListingAiBtn");
  btn.disabled=true;btn.textContent="⏳ ...";
  msg.textContent="";
  try{
    const resp=await fetch(url,{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        image_base64:photoData.split(",")[1],mime_type:"image/jpeg",
        hint_name:$("userListingName").value.trim(),
        hint_category:$("userListingCategory").value
      })
    });
    const data=await resp.json();
    if(!resp.ok)throw new Error(data.error||("HTTP "+resp.status));
    // wypełnij pola wartościami AI
    if(data.name)$("userListingName").value=data.name;
    if(data.price)$("userListingPrice").value=data.price;
    if(data.description)$("userListingDesc").value=data.description;
    if(data.condition)$("userListingCondition").value=data.condition;
    box.style.display="block";
    aiPending=true;
    msg.textContent=at("lstAiDone");msg.style.color="#4ade80";
  }catch(ex){
    msg.textContent=(ex.message||ex)+" — "+at("lstAiFail");msg.style.color="#ff7b7b";
  }finally{
    btn.disabled=false;btn.textContent=at("lstAi");
  }
}

async function publish(){
  const name=$("userListingName").value.trim()||at("lstDefaultName");
  const price=parseFloat($("userListingPrice").value);
  if(isNaN(price)||price<=0){$("userListingMsg").textContent=at("lstNeedPrice");$("userListingMsg").style.color="#ff7b7b";return;}
  if(typeof products==="undefined"){showToast("error");return;}
  const item={
    id:Date.now(),
    name,
    price,
    category:$("userListingCategory").value,
    condition:$("userListingCondition").value,
    stock:1,
    description:$("userListingDesc").value.trim(),
    image:photoData||"",
    userAdded:true
  };
  products.push(item);
  saveProducts();renderProducts();
  // opcjonalnie: zapisz do Supabase listings
  const cfg=window.SUPABASE_CONFIG||{};
  if(window.supabase&&cfg.url&&cfg.anonKey){
    try{
      const sb=window.supabase.createClient(cfg.url,cfg.anonKey);
      const{data:{session}}=await sb.auth.getSession();
      await sb.from("listings").insert({
        user_id:session?session.user.id:null,
        name:item.name,price:item.price,category:item.category,
        condition:item.condition,description:item.description,image:item.image,status:"pending"
      });
    }catch(_){}
  }
  modal.style.display="none";
  resetForm();
  showToast(at("lstDone"));
}

function resetForm(){
  photoData=null;aiPending=false;
  $("userListingPhoto").value="";
  $("userListingPreview").style.display="none";
  $("userListingName").value="";$("userListingPrice").value="";$("userListingDesc").value="";
  $("userListingAiBox").style.display="none";
  $("userListingMsg").textContent="";
}

function init(){
  const open=$("openListing");
  if(!open||!modal)return;
  open.addEventListener("click",()=>{populateCategory();modal.style.display="flex";});
  $("closeListing").addEventListener("click",()=>{modal.style.display="none";});
  modal.addEventListener("click",e=>{if(e.target===modal)modal.style.display="none";});
  $("userListingPhoto").addEventListener("change",async()=>{
    const f=$("userListingPhoto").files&&$("userListingPhoto").files[0];
    if(!f)return;
    try{
      photoData=await fileToDataURL(f);
      const pv=$("userListingPreview");pv.src=photoData;pv.style.display="block";
    }catch(_){$("userListingMsg").textContent=at("lstBadPhoto");}
  });
  $("userListingAiBtn").addEventListener("click",runAI);
  $("userListingAccept").addEventListener("click",()=>{
    $("userListingAiBox").style.display="none";
    $("userListingMsg").textContent=at("lstAccepted");$("userListingMsg").style.color="#4ade80";
  });
  $("userListingEdit").addEventListener("click",()=>{
    $("userListingAiBox").style.display="none";
    $("userListingPrice").focus();
  });
  $("userListingPublish").addEventListener("click",publish);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
