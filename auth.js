// RECYKTRONIX Auth — Supabase (rejestracja, logowanie, konto, historia zamówień, rabat -5%)
(function(){
"use strict";

const AI={
 pl:{login:"Logowanie",register:"Rejestracja",email:"E-mail",password:"Hasło (min. 6 znaków)",name:"Imię i nazwisko",submitLogin:"Zaloguj się",submitRegister:"Zarejestruj się",logout:"Wyloguj",orders:"Moje zamówienia",noOrders:"Brak zamówień",member:"Członek — rabat −5%",account:"Konto",soon:"Logowanie będzie dostępne wkrótce",error:"Błąd",checkEmail:"Sprawdź e-mail i spróbuj ponownie",order:"Zamówienie",total:"Razem",date:"Data",items:"Pozycji",close:"Zamknij"},
 de:{login:"Anmelden",register:"Registrieren",email:"E-Mail",password:"Passwort (min. 6 Zeichen)",name:"Vollständiger Name",submitLogin:"Anmelden",submitRegister:"Registrieren",logout:"Abmelden",orders:"Meine Bestellungen",noOrders:"Keine Bestellungen",member:"Mitglied — 5% Rabatt",account:"Konto",soon:"Login demnächst verfügbar",error:"Fehler",checkEmail:"E-Mail prüfen und erneut versuchen",order:"Bestellung",total:"Gesamt",date:"Datum",items:"Positionen",close:"Schließen"},
 en:{login:"Sign in",register:"Sign up",email:"Email",password:"Password (min. 6 chars)",name:"Full name",submitLogin:"Sign in",submitRegister:"Create account",logout:"Sign out",orders:"My orders",noOrders:"No orders yet",member:"Member — 5% off",account:"Account",soon:"Login coming soon",error:"Error",checkEmail:"Check your email and try again",order:"Order",total:"Total",date:"Date",items:"Items",close:"Close"},
 nl:{login:"Inloggen",register:"Registreren",email:"E-mail",password:"Wachtwoord (min. 6 tekens)",name:"Volledige naam",submitLogin:"Inloggen",submitRegister:"Account aanmaken",logout:"Uitloggen",orders:"Mijn bestellingen",noOrders:"Geen bestellingen",member:"Lid — 5% korting",account:"Account",soon:"Login binnenkort beschikbaar",error:"Fout",checkEmail:"Controleer e-mail en probeer opnieuw",order:"Bestelling",total:"Totaal",date:"Datum",items:"Artikelen",close:"Sluiten"},
 ru:{login:"Вход",register:"Регистрация",email:"Email",password:"Пароль (мин. 6 символов)",name:"Полное имя",submitLogin:"Войти",submitRegister:"Создать аккаунт",logout:"Выйти",orders:"Мои заказы",noOrders:"Нет заказов",member:"Участник — скидка 5%",account:"Аккаунт",soon:"Вход скоро будет доступен",error:"Ошибка",checkEmail:"Проверьте email и повторите",order:"Заказ",total:"Итого",date:"Дата",items:"Позиций",close:"Закрыть"}
};
const at=k=>(AI[currentLang]||AI.en)[k]||k;

const cfg=window.SUPABASE_CONFIG||{};
const sbReady=!!(window.supabase&&cfg.url&&cfg.anonKey);
const sb=sbReady?window.supabase.createClient(cfg.url,cfg.anonKey):null;

const $=id=>document.getElementById(id);
const authModal=$("authModal"),accountModal=$("accountModal"),accountButton=$("accountButton");
let authMode="login";

function showToast(msg){
  const t=$("toast");if(!t)return;
  t.textContent=msg;t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2600);
}

function setMemberUI(){
  const u=window.RECY_USER;
  window.RECY_MEMBER=!!u;
  if(accountButton){
    accountButton.textContent=u?"👤":"♙";
    accountButton.classList.toggle("logged",!!u);
    accountButton.title=u?`${at("account")}: ${u.email}`:at("account");
  }
  const disc=$("cartDiscount");
  if(disc&&disc.style.display!=="none")disc.style.display=u?"flex":"none";
  if(typeof renderCart==="function"&&$("cartModal")&&$("cartModal").style.display!=="none")renderCart();
}

function openAuth(mode){
  if(!sb){showToast(at("soon"));return;}
  authMode=mode||"login";
  $("tabLogin").classList.toggle("active",authMode==="login");
  $("tabRegister").classList.toggle("active",authMode==="register");
  $("authName").style.display=authMode==="register"?"":"none";
  $("authName").required=authMode==="register";
  $("authPassword").setAttribute("autocomplete",authMode==="login"?"current-password":"new-password");
  $("authTitle").textContent=at(authMode==="login"?"login":"register");
  $("authSubmit").textContent=at(authMode==="login"?"submitLogin":"submitRegister");
  $("authError").textContent="";
  authModal.style.display="flex";
}

function closeAuth(){authModal.style.display="none";}

async function submitAuth(e){
  e.preventDefault();
  const email=$("authEmail").value.trim(),password=$("authPassword").value;
  const name=$("authName").value.trim();
  const err=$("authError");err.textContent="";
  $("authSubmit").disabled=true;
  try{
    if(authMode==="login"){
      const{error}=await sb.auth.signInWithPassword({email,password});
      if(error)throw error;
      showToast(at("member"));
    }else{
      const{error}=await sb.auth.signUp({email,password,options:{data:{full_name:name||email.split("@")[0]}}});
      if(error)throw error;
      showToast(at("checkEmail"));
    }
    closeAuth();
  }catch(ex){
    err.textContent=ex.message||at("error");
  }finally{
    $("authSubmit").disabled=false;
  }
}

async function openAccount(){
  if(!sb){showToast(at("soon"));return;}
  const{data:{session}}=await sb.auth.getSession();
  if(!session){openAuth("login");return;}
  const u=session.user;
  const name=(u.user_metadata&&u.user_metadata.full_name)||u.email;
  let ordersHtml=`<p class="account-email">${u.email}</p>`;
  ordersHtml+=`<div class="account-member">${at("member")}</div>`;
  ordersHtml+=`<h4>${at("orders")}</h4><div id="ordersList" class="orders-list">…</div>`;
  ordersHtml+=`<button id="logoutBtn" class="pay-toggle account-logout">${at("logout")}</button>`;
  $("accountBody").innerHTML=ordersHtml;
  accountModal.style.display="flex";
  $("logoutBtn").addEventListener("click",async()=>{
    await sb.auth.signOut();accountModal.style.display="none";showToast(at("logout"));
  });
  try{
    const{data}=await sb.from("orders").select("*").eq("user_id",u.id).order("created_at",{ascending:false}).limit(20);
    const list=$("ordersList");
    if(!data||!data.length){list.innerHTML=`<p class="account-empty">${at("noOrders")}</p>`;return;}
    list.innerHTML=data.map(o=>{
      const d=new Date(o.created_at).toLocaleDateString(currentLang==="pl"?"pl-PL":"en-GB");
      const names=(o.items||[]).map(id=>{const p=(typeof products!=="undefined"?products:[]).find(x=>x.id===id);return p?p.name:id;}).join(", ");
      return `<div class="order-row"><div><strong>${at("order")} ${o.order_no}</strong><span>${d} · ${names}</span></div><strong>€${Number(o.total).toFixed(2)}</strong></div>`;
    }).join("");
  }catch(_){
    const list=$("ordersList");if(list)list.innerHTML=`<p class="account-empty">${at("noOrders")}</p>`;
  }
}

async function saveOrder(detail){
  if(!sb)return;
  try{
    const{data:{session}}=await sb.auth.getSession();
    if(!session)return;
    const items=(detail.items||[]).map(id=>{
      const p=(typeof products!=="undefined"?products:[]).find(x=>x.id===id);
      return p?{id:p.id,name:p.name,price:p.price}:id;
    });
    await sb.from("orders").insert({
      user_id:session.user.id,
      order_no:detail.orderNo,
      items,
      total:detail.total,
      status:"new"
    });
  }catch(_){}
}

function init(){
  if(!accountButton)return;
  accountButton.addEventListener("click",()=>{window.RECY_USER?openAccount():openAuth("login");});
  $("closeAuth").addEventListener("click",closeAuth);
  $("tabLogin").addEventListener("click",()=>openAuth("login"));
  $("tabRegister").addEventListener("click",()=>openAuth("register"));
  $("authForm").addEventListener("submit",submitAuth);
  authModal.addEventListener("click",e=>{if(e.target===authModal)closeAuth();});
  $("closeAccount").addEventListener("click",()=>{accountModal.style.display="none";});
  accountModal.addEventListener("click",e=>{if(e.target===accountModal)accountModal.style.display="none";});
  window.addEventListener("recytronix:checkout",e=>{saveOrder(e.detail);});
  if(sb){
    sb.auth.getSession().then(({data:{session}})=>{
      window.RECY_USER=session?{id:session.user.id,email:session.user.email}:null;
      setMemberUI();
    });
    sb.auth.onAuthStateChange((_e,session)=>{
      window.RECY_USER=session?{id:session.user.id,email:session.user.email}:null;
      setMemberUI();
    });
  }else{
    accountButton.addEventListener("click",()=>showToast(at("soon")));
  }
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
