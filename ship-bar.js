// RECYKTRONIX Shipping bar — kierunek wysyłki + przewoźnik (localStorage)
(function(){
"use strict";
const $=id=>document.getElementById(id);
const LS="recyktronix-ship";
const COUNTRIES=[
  ["PL","Polska"],["DE","Niemcy"],["NL","Holandia"],["BE","Belgia"],["FR","Francja"],
  ["IT","Włochy"],["ES","Hiszpania"],["PT","Portugalia"],["AT","Austria"],["CZ","Czechy"],
  ["SK","Słowacja"],["HU","Węgry"],["HR","Chorwacja"],["SI","Słowenia"],["SE","Szwecja"],
  ["DK","Dania"],["FI","Finlandia"],["NO","Norwegia"],["CH","Szwajcaria"],["IE","Irlandia"],
  ["LU","Luksemburg"],["EE","Estonia"],["LV","Łotwa"],["LT","Litwa"],["GR","Grecja"],
  ["RO","Rumunia"],["BG","Bułgaria"],["GB","Wielka Brytania"],["UA","Ukraina"]
];
const CARRIERS=["DPD","DHL","InPost","Paczkomaty InPost","GLS","UPS","FedEx","Kurier / odbiór"];

function load(){try{return JSON.parse(localStorage.getItem(LS)||"{}");}catch(_){return{};}}
function fill(sel,items,selected){
  sel.innerHTML=items.map(([v,l])=>`<option value="${v}"${v===selected?" selected":""}>${l}</option>`).join("");
}

function init(){
  const from=$("shipFrom"),to=$("shipTo"),car=$("shipCarrier");
  if(!from||!to||!car)return;
  const saved=load();
  fill(from,COUNTRIES,saved.from||"DE");
  fill(to,COUNTRIES,saved.to||"PL");
  car.innerHTML=CARRIERS.map(c=>`<option${c===(saved.carrier||"DPD")?" selected":""}>${c}</option>`).join("");
  const persist=()=>localStorage.setItem(LS,JSON.stringify({from:from.value,to:to.value,carrier:car.value}));
  [from,to,car].forEach(el=>el.addEventListener("change",persist));
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
