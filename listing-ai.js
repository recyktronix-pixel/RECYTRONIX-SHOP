// RECYKTRONIX Listing AI — zdjęcie -> wycena + opis (przez Supabase Edge Function)
(function(){
"use strict";

const $=id=>document.getElementById(id);
let listingImageData=null; // dataURL zdjęcia

function showToast(msg){
  const t=$("toast");if(!t)return;
  t.textContent=msg;t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),3200);
}

function populateListingCategory(){
  const sel=$("listingCategory"),prodSel=$("prodCategory");
  if(!sel||!prodSel||sel.options.length)return;
  sel.innerHTML=prodSel.innerHTML;
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
      img.onerror=reject;
      img.src=reader.result;
    };
    reader.onerror=reject;
    reader.readAsDataURL(file);
  });
}

async function runListingAI(){
  const url=(window.SUPABASE_CONFIG&&window.SUPABASE_CONFIG.listingAiUrl)||"";
  const result=$("listingAiResult");
  if(!url){result.style.display="block";result.innerHTML="<em>AI listing wymaga konfiguracji (supabase-config.js → listingAiUrl).</em>";return;}
  if(!listingImageData){result.style.display="block";result.innerHTML="<em>Najpierw wybierz zdjęcie.</em>";return;}
  const btn=$("listingAiBtn");
  btn.disabled=true;btn.textContent="⏳ Analizuję zdjęcie...";
  result.style.display="block";result.innerHTML="<em>AI analizuje zdjęcie i szacuje wycenę…</em>";
  try{
    const resp=await fetch(url,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        image_base64:listingImageData.split(",")[1],
        mime_type:"image/jpeg",
        hint_name:$("listingName").value.trim(),
        hint_category:$("listingCategory").value
      })
    });
    const data=await resp.json();
    if(!resp.ok)throw new Error(data.error||("HTTP "+resp.status));
    if(data.name&&!$("listingName").value.trim())$("listingName").value=data.name;
    if(data.price)$("listingPrice").value=data.price;
    if(data.description)$("listingDesc").value=data.description;
    if(data.condition)$("listingCondition").value=data.condition;
    result.innerHTML="<strong>✓ AI gotowe:</strong> "+(data.summary||"wycena i opis wstawione do pól");
    showToast("AI uzuzupełniło ogłoszenie");
  }catch(ex){
    result.innerHTML="<em>AI niedostępne: "+(ex.message||ex)+" — uzupełnij pola ręcznie.</em>";
  }finally{
    btn.disabled=false;btn.textContent="✨ AI: wycena + opis";
  }
}

function publishListing(){
  const name=$("listingName").value.trim()||"Nowe ogłoszenie";
  const price=parseFloat($("listingPrice").value);
  const category=$("listingCategory").value;
  const condition=$("listingCondition").value;
  const desc=$("listingDesc").value.trim();
  if(isNaN(price)||price<=0){showToast("Podaj cenę");return;}
  if(typeof products==="undefined"){showToast("Błąd: brak danych produktów");return;}
  products.push({
    id:Date.now(),
    name,
    price,
    category,
    condition,
    stock:1,
    description:desc,
    image:listingImageData||""
  });
  saveProducts();
  renderProducts();
  if(typeof loadAdminData==="function")loadAdminData();
  $("listingName").value="";$("listingPrice").value="";$("listingDesc").value="";
  $("listingPreview").style.display="none";listingImageData=null;
  $("listingPhoto").value="";
  $("listingAiResult").style.display="none";
  showToast("Ogłoszenie opublikowane");
}

function init(){
  const photo=$("listingPhoto");
  if(!photo)return;
  const adminBtn=document.getElementById("adminButton");
  if(adminBtn)adminBtn.addEventListener("click",()=>setTimeout(populateListingCategory,50));
  populateListingCategory();
  photo.addEventListener("change",async()=>{
    const f=photo.files&&photo.files[0];
    if(!f)return;
    try{
      listingImageData=await fileToDataURL(f);
      const pv=$("listingPreview");
      pv.src=listingImageData;pv.style.display="block";
    }catch(_){showToast("Nie udało się wczytać zdjęcia");}
  });
  $("listingAiBtn").addEventListener("click",runListingAI);
  $("listingPublishBtn").addEventListener("click",publishListing);
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
