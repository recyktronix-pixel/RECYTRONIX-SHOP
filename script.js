const products = [
  {id:1,name:"Smartfon Pro 256 GB",category:"electronics",price:1299,image:"assets/products/smartphone.jpg"},
  {id:2,name:"Słuchawki Gaming Pro RGB",category:"audio",price:249,image:"assets/products/headphones.jpg"},
  {id:3,name:"Laptop Business 16",category:"computers",price:1899,image:"assets/products/laptop.jpg"},
  {id:4,name:"Kamera 4K Ultra HD",category:"electronics",price:299,image:"assets/products/camera.jpg"},
  {id:5,name:"Dron Pro 4K GPS",category:"electronics",price:599,image:"assets/products/drone.jpg"},
  {id:6,name:"Akcesoria komputerowe",category:"accessories",price:199,image:""}
];

const translations = {
  pl: {
    search: "Szukaj produktów, kategorii, modelu...",
    categories: "KATEGORIE",
    allProducts: "Wszystkie produkty",
    electronics: "Elektronika",
    computers: "Komputery i IT",
    audio: "Audio i Video",
    accessories: "Akcesoria",
    home: "Dom i biuro",
    tools: "Narzędzia",
    other: "Pozostałe",
    aiTitle: "RECYKTRONIX AI",
    aiDesc: "Twój asystent zakupowy. Porady, dobór sprzętu i pomoc technologiczna.",
    openAI: "Otwórz AI",
    featured: "Wybrane produkty",
    sort: "Sortowanie",
    recommended: "Polecane",
    priceAsc: "Cena rosnąco",
    priceDesc: "Cena malejąco",
    nameAZ: "Nazwa A–Z",
    noProducts: "Nie znaleziono produktów.",
    benefits1: "Szybka wysyłka",
    benefits2: "Bezpieczne zakupy",
    benefits3: "Sprawdzony asortyment",
    benefits4: "Obsługa zwrotów",
    benefits5: "Pomoc PL / DE",
    heroTitle: "RECYKTRONIX",
    heroSubtitle: "e-Shop Business Pro",
    heroDesc: "Nowoczesna technologia. Sprawdzony sprzęt. Profesjonalna obsługa.",
    checkOffer: "SPRAWDŹ OFERTĘ",
    contact: "Kontakt:",
    rights: "Wszelkie prawa zastrzeżone.",
    cart: "Koszyk",
    favorites: "Ulubione",
    account: "Konto",
    addedToCart: "Dodano do koszyka",
    updatedFavorites: "Zaktualizowano ulubione",
    cartEmpty: "Koszyk jest pusty",
    showingFavorites: "Wyświetlasz ulubione produkty",
    showingAll: "Wyświetlasz wszystkie produkty",
    products: "produkty",
    total: "Razem"
  },
  de: {
    search: "Produkte, Kategorien, Modell suchen...",
    categories: "KATEGORIEN",
    allProducts: "Alle Produkte",
    electronics: "Elektronik",
    computers: "Computer & IT",
    audio: "Audio & Video",
    accessories: "Zubehör",
    home: "Haus & Büro",
    tools: "Werkzeuge",
    other: "Sonstige",
    aiTitle: "RECYKTRONIX AI",
    aiDesc: "Ihr Einkaufsassistent. Beratung, Produktauswahl und technische Hilfe.",
    openAI: "AI öffnen",
    featured: "Ausgewählte Produkte",
    sort: "Sortieren",
    recommended: "Empfohlen",
    priceAsc: "Preis aufsteigend",
    priceDesc: "Preis absteigend",
    nameAZ: "Name A–Z",
    noProducts: "Keine Produkte gefunden.",
    benefits1: "Schneller Versand",
    benefits2: "Sicheres Einkaufen",
    benefits3: "Geprüftes Sortiment",
    benefits4: "Rückgabe-Service",
    benefits5: "Hilfe PL / DE",
    heroTitle: "RECYKTRONIX",
    heroSubtitle: "e-Shop Business Pro",
    heroDesc: "Moderne Technologie. Geprüfte Ausrüstung. Professioneller Service.",
    checkOffer: "ANGEBOT PRÜFEN",
    contact: "Kontakt:",
    rights: "Alle Rechte vorbehalten.",
    cart: "Warenkorb",
    favorites: "Merkliste",
    account: "Konto",
    addedToCart: "Zum Warenkorb hinzugefügt",
    updatedFavorites: "Merkliste aktualisiert",
    cartEmpty: "Der Warenkorb ist leer",
    showingFavorites: "Sie sehen Ihre Favoriten",
    showingAll: "Sie sehen alle Produkte",
    products: "Produkte",
    total: "Gesamt"
  },
  en: {
    search: "Search products, categories, model...",
    categories: "CATEGORIES",
    allProducts: "All products",
    electronics: "Electronics",
    computers: "Computers & IT",
    audio: "Audio & Video",
    accessories: "Accessories",
    home: "Home & Office",
    tools: "Tools",
    other: "Other",
    aiTitle: "RECYKTRONIX AI",
    aiDesc: "Your shopping assistant. Advice, product selection and technical help.",
    openAI: "Open AI",
    featured: "Featured products",
    sort: "Sort",
    recommended: "Recommended",
    priceAsc: "Price ascending",
    priceDesc: "Price descending",
    nameAZ: "Name A–Z",
    noProducts: "No products found.",
    benefits1: "Fast shipping",
    benefits2: "Secure shopping",
    benefits3: "Verified assortment",
    benefits4: "Return service",
    benefits5: "Help PL / DE",
    heroTitle: "RECYKTRONIX",
    heroSubtitle: "e-Shop Business Pro",
    heroDesc: "Modern technology. Verified equipment. Professional service.",
    checkOffer: "CHECK OFFER",
    contact: "Contact:",
    rights: "All rights reserved.",
    cart: "Cart",
    favorites: "Favorites",
    account: "Account",
    addedToCart: "Added to cart",
    updatedFavorites: "Favorites updated",
    cartEmpty: "Cart is empty",
    showingFavorites: "Showing favorites",
    showingAll: "Showing all products",
    products: "products",
    total: "Total"
  },
  nl: {
    search: "Zoek producten, categorieën, model...",
    categories: "CATEGORIEËN",
    allProducts: "Alle producten",
    electronics: "Elektronica",
    computers: "Computers & IT",
    audio: "Audio & Video",
    accessories: "Accessoires",
    home: "Huis & Kantoor",
    tools: "Gereedschap",
    other: "Overig",
    aiTitle: "RECYKTRONIX AI",
    aiDesc: "Uw winkelassistent. Advies, productselectie en technische hulp.",
    openAI: "Open AI",
    featured: "Uitgelichte producten",
    sort: "Sorteren",
    recommended: "Aanbevolen",
    priceAsc: "Prijs oplopend",
    priceDesc: "Prijs aflopend",
    nameAZ: "Naam A–Z",
    noProducts: "Geen producten gevonden.",
    benefits1: "Snelle verzending",
    benefits2: "Veilig winkelen",
    benefits3: "Geverifieerd assortiment",
    benefits4: "Retourservice",
    benefits5: "Hulp PL / DE",
    heroTitle: "RECYKTRONIX",
    heroSubtitle: "e-Shop Business Pro",
    heroDesc: "Moderne technologie. Geverifieerde apparatuur. Professionele service.",
    checkOffer: "AANBOD BEKIJKEN",
    contact: "Contact:",
    rights: "Alle rechten voorbehouden.",
    cart: "Winkelwagen",
    favorites: "Favorieten",
    account: "Account",
    addedToCart: "Toegevoegd aan winkelwagen",
    updatedFavorites: "Favorieten bijgewerkt",
    cartEmpty: "Winkelwagen is leeg",
    showingFavorites: "Favorieten worden getoond",
    showingAll: "Alle producten worden getoond",
    products: "producten",
    total: "Totaal"
  },
  ru: {
    search: " , , ...",
    categories: "",
    allProducts: " ",
    electronics: "",
    computers: "  IT",
    audio: "  ",
    accessories: "",
    home: "  ",
    tools: "",
    other: "",
    aiTitle: "RECYKTRONIX AI",
    aiDesc: " shopping-. ,     .",
    openAI: " AI",
    featured: " ",
    sort: "",
    recommended: "",
    priceAsc: "  ",
    priceDesc: "  ",
    nameAZ: " –",
    noProducts: "  .",
    benefits1: " ",
    benefits2: " ",
    benefits3: " ",
    benefits4: " ",
    benefits5: " PL / DE",
    heroTitle: "RECYKTRONIX",
    heroSubtitle: "e-Shop Business Pro",
    heroDesc: " .  .  .",
    checkOffer: " ",
    contact: ":",
    rights: "  .",
    cart: "",
    favorites: "",
    account: "",
    addedToCart: "  ",
    updatedFavorites: " ",
    cartEmpty: " ",
    showingFavorites: "  ",
    showingAll: "  ",
    products: "",
    total: ""
  }
};

let currentLang = localStorage.getItem('recyktronix-lang') || 'pl';
let selectedCategory="all",searchQuery="",favorites=[],cart=[],showFavoritesOnly=false;
const grid=document.getElementById("productGrid");
const emptyMessage=document.getElementById("emptyMessage");
const toast=document.getElementById("toast");

function formatPrice(price){
  const locale = currentLang === 'pl' ? 'pl-PL' : currentLang === 'de' ? 'de-DE' : currentLang === 'en' ? 'en-US' : currentLang === 'nl' ? 'nl-NL' : 'ru-RU';
  return new Intl.NumberFormat(locale,{style:"currency",currency:"EUR"}).format(price);
}
function showToast(message){
  toast.textContent=message;toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>toast.classList.remove("show"),2500);
}
function updateCounters(){
  document.getElementById("cartCount").textContent=cart.length;
  document.getElementById("favoritesCount").textContent=favorites.length;
}
function t(key){
  return translations[currentLang]?.[key] || translations.pl[key] || key;
}
function renderProducts(){
  let filtered=products.filter(product=>{
    const categoryMatch=selectedCategory==="all"||product.category===selectedCategory;
    const searchMatch=product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const favoritesMatch=!showFavoritesOnly||favorites.includes(product.id);
    return categoryMatch&&searchMatch&&favoritesMatch;
  });
  const sort=document.getElementById("sortProducts").value;
  if(sort==="priceAsc")filtered.sort((a,b)=>a.price-b.price);
  if(sort==="priceDesc")filtered.sort((a,b)=>b.price-a.price);
  if(sort==="name")filtered.sort((a,b)=>a.name.localeCompare(b.name));
  grid.innerHTML="";
  filtered.forEach(product=>{
    const card=document.createElement("article");card.className="product-card";
    const imageArea=product.image
      ? `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="image-placeholder" style="display:none">R</span>`
      : `<span class="image-placeholder">R</span>`;
    card.innerHTML=`
      <div class="product-image">${imageArea}
        <button class="favorite ${favorites.includes(product.id)?"selected":""}" data-favorite="${product.id}" aria-label="${t('favorites')}">${favorites.includes(product.id)?"♥":"♡"}</button>
      </div>
      <div class="product-info"><h3>${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <div class="product-bottom"><span class="product-price">${formatPrice(product.price)}</span>
          <button class="add-cart" data-cart="${product.id}" aria-label="${t('cart')}">🛒</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  emptyMessage.hidden=filtered.length>0;emptyMessage.textContent=t('noProducts');updateCounters();
}
function updateLanguage(){
  document.getElementById("language").value=currentLang;
  document.getElementById("searchInput").placeholder=t('search');
  document.querySelectorAll(".category").forEach(btn=>{
    const cat=btn.dataset.category;
    const key = cat === 'all' ? 'allProducts' : cat;
    btn.textContent = t(key) || btn.textContent;
  });
  document.querySelectorAll(".benefits span").forEach((span,i)=>{
    const keys=['benefits1','benefits2','benefits3','benefits4','benefits5'];
    span.textContent=t(keys[i]);
  });
  document.querySelector(".ai-card h3").textContent=t('aiTitle');
  document.querySelector(".ai-card p").textContent=t('aiDesc');
  document.querySelector(".ai-card a").textContent=t('openAI')+" →";
  document.querySelector(".section-heading h2").textContent=t('featured');
  document.getElementById("sortProducts").options[0].textContent=t('recommended');
  document.getElementById("sortProducts").options[1].textContent=t('priceAsc');
  document.getElementById("sortProducts").options[2].textContent=t('priceDesc');
  document.getElementById("sortProducts").options[3].textContent=t('nameAZ');
  document.querySelector(".hero h1").textContent=t('heroTitle');
  document.querySelector(".hero h2 span").textContent=t('heroSubtitle');
  document.querySelector(".hero p").textContent=t('heroDesc');
  document.querySelector(".primary-button").textContent=t('checkOffer')+" →";
  document.querySelector(".footer-brand span").textContent=t('heroSubtitle');
  document.querySelector(".footer-links a:nth-child(2)").textContent="Privacy Policy";
  document.querySelectorAll(".footer-links a")[0].textContent="Terms";
  document.querySelectorAll(".footer-links a")[2].textContent="Shipping & Returns";
  localStorage.setItem('recyktronix-lang',currentLang);
}
document.querySelectorAll(".category").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".category").forEach(item=>item.classList.remove("active"));
  button.classList.add("active");selectedCategory=button.dataset.category;showFavoritesOnly=false;renderProducts();
}));
document.getElementById("searchInput").addEventListener("input",event=>{searchQuery=event.target.value;renderProducts();});
document.getElementById("searchButton").addEventListener("click",()=>{searchQuery=document.getElementById("searchInput").value;renderProducts();});
document.getElementById("sortProducts").addEventListener("change",renderProducts);
grid.addEventListener("click",event=>{
  const favoriteButton=event.target.closest("[data-favorite]");
  const cartButton=event.target.closest("[data-cart]");
  if(favoriteButton){
    const id=Number(favoriteButton.dataset.favorite);
    favorites=favorites.includes(id)?favorites.filter(item=>item!==id):[...favorites,id];
    renderProducts();showToast(t('updatedFavorites'));
  }
  if(cartButton){
    const id=Number(cartButton.dataset.cart),product=products.find(item=>item.id===id);
    if(product){cart.push(id);updateCounters();showToast(t('addedToCart')+": "+product.name);}
  }
});
document.getElementById("favoritesButton").addEventListener("click",()=>{
  showFavoritesOnly=!showFavoritesOnly;selectedCategory="all";
  document.querySelectorAll(".category").forEach(item=>item.classList.toggle("active",item.dataset.category==="all"));
  renderProducts();showToast(showFavoritesOnly?t('showingFavorites'):t('showingAll'));
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
});
document.getElementById("cartButton").addEventListener("click",()=>{
  if(!cart.length){showToast(t('cartEmpty'));return;}
  const total=cart.reduce((sum,id)=>sum+(products.find(item=>item.id===id)?.price||0),0);
  showToast(`${cart.length} ${t('products')} | ${t('total')}: ${formatPrice(total)}`);
});
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("language").addEventListener("change",event=>{
  currentLang=event.target.value;
  updateLanguage();
  renderProducts();
});

// Interface switcher
document.getElementById("interfaceSwitch").addEventListener("click",()=>{
  const current = localStorage.getItem('recyktronix-interface') || 'default';
  const next = current === 'default' ? 'alt' : 'default';
  localStorage.setItem('recyktronix-interface', next);
  document.body.classList.toggle('alt-interface', next === 'alt');
  showToast(next === 'alt' ? 'Interfejs: Alternatywny' : 'Interfejs: Domyślny');
});

// Apply saved interface
if (localStorage.getItem('recyktronix-interface') === 'alt') {
  document.body.classList.add('alt-interface');
}

updateLanguage();
renderProducts();

// AI Chat Modal
document.querySelector(".ai-card a").addEventListener("click",(e)=>{
  e.preventDefault();
  document.getElementById("aiChatModal").style.display="flex";
});

document.getElementById("closeAiChat").addEventListener("click",()=>{
  document.getElementById("aiChatModal").style.display="none";
});

document.getElementById("sendAiMessage").addEventListener("click",()=>{
  const input=document.getElementById("aiChatInput");
  const message=input.value.trim();
  if(!message)return;
  
  const messages=document.getElementById("aiChatMessages");
  const userMsg=document.createElement("div");
  userMsg.className="user-message";
  userMsg.textContent=message;
  messages.appendChild(userMsg);
  
  input.value="";
  messages.scrollTop=messages.scrollHeight;
  
  // Redirect to Telegram with pre-filled message
  const telegramMessage = encodeURIComponent(`[Strona WWW] ${message}`);
  const telegramUrl = `https://t.me/ShadowAIHubBot?start=${telegramMessage}`;
  
  setTimeout(()=>{
    const aiMsg=document.createElement("div");
    aiMsg.className="ai-message";
    aiMsg.innerHTML=`Twoja wiadomość została wysłana do Shadow AI. <a href="${telegramUrl}" target="_blank" style="color:var(--blue);text-decoration:underline">Kliknij tutaj aby kontynuować rozmowę w Telegram</a>`;
    messages.appendChild(aiMsg);
    messages.scrollTop=messages.scrollHeight;
  },1000);
});

document.getElementById("aiChatInput").addEventListener("keypress",(e)=>{
  if(e.key==="Enter")document.getElementById("sendAiMessage").click();
});
