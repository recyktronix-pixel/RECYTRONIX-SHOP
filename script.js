const DEFAULT_PRODUCTS = [
  {id:1,name:"Smartfon Pro 256 GB",category:"electronics",price:1299,image:"assets/products/smartphone.jpg",description:"Nowoczesny smartfon z pamięcią 256 GB - przestrzeń na zdjęcia, aplikacje, filmy i dokumenty. Praktyczne urządzenie do komunikacji, pracy, rozrywki i codziennego użytkowania.",stock:5,condition:"new"},
  {id:2,name:"Słuchawki Gaming Pro RGB",category:"audio",price:249,image:"assets/products/headphones.jpg",description:"Słuchawki gamingowe RGB łączące nowoczesny wygląd z funkcjonalnością. Efektowne podświetlenie i konstrukcja gamingowa do gier, rozmów internetowych i multimediów.",stock:12,condition:"new"},
  {id:3,name:"Laptop Business 16",category:"computers",price:1899,image:"assets/products/laptop.jpg",description:"Laptop z ekranem 16 cali - wygodna przestrzeń do pracy z dokumentami, przeglądania internetu i multimediów. Mobilny, do domu, biura i podróży.",stock:3,condition:"new"},
  {id:4,name:"Kamera 4K Ultra HD",category:"electronics",price:299,image:"assets/products/camera.jpg",description:"Kamera 4K do nagrywania materiałów wideo w wysokiej rozdzielczości. Do filmów, dokumentowania wydarzeń i codziennych chwil.",stock:8,condition:"new"},
  {id:5,name:"Dron Pro 4K GPS",category:"electronics",price:599,image:"assets/products/drone.jpg",description:"Dron 4K GPS z kamerą i lokalizacją satelitarną. Do fotografii z powietrza, filmów krajobrazowych i projektów kreatywnych.",stock:4,condition:"new"},
  {id:6,name:"Zestaw akcesoriów technologicznych",category:"accessories",price:199,image:"",description:"Praktyczny zestaw akcesoriów do codziennego wyposażenia elektronicznego. Uzupełnienie stanowiska komputerowego do pracy, nauki i rozrywki.",stock:20,condition:"new"}
];

const DEFAULT_CATEGORIES = [
  {id:"all", name:"Wszystkie produkty"},
  {id:"electronics", name:"Elektronika"},
  {id:"computers", name:"Komputery i IT"},
  {id:"audio", name:"Audio i Video"},
  {id:"accessories", name:"Akcesoria"},
  {id:"home", name:"Dom i biuro"},
  {id:"tools", name:"Narzędzia"},
  {id:"other", name:"Pozostałe"}
];

function loadJSON(key, fallback){
  try{ const v=localStorage.getItem(key); return v?JSON.parse(v):fallback; }catch(e){ return fallback; }
}
function saveJSON(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

let products = loadJSON('recyktronix-products-v2', null) || DEFAULT_PRODUCTS.slice();
let categories = loadJSON('recyktronix-categories', null) || DEFAULT_CATEGORIES.slice();
if (!localStorage.getItem('recyktronix-products-v2')) saveJSON('recyktronix-products-v2', products);
if (!localStorage.getItem('recyktronix-categories')) saveJSON('recyktronix-categories', categories);

function saveProducts(){ saveJSON('recyktronix-products-v2', products); }
function saveCategories(){ saveJSON('recyktronix-categories', categories); }

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
    search: "Поиск товаров, категорий, модели...",
    categories: "КАТЕГОРИИ",
    allProducts: "Все товары",
    electronics: "Электроника",
    computers: "Компьютеры и IT",
    audio: "Аудио и видео",
    accessories: "Аксессуары",
    home: "Дом и офис",
    tools: "Инструменты",
    other: "Прочее",
    aiTitle: "RECYKTRONIX AI",
    aiDesc: "Ваш помощник по покупкам. Советы, подбор техники и техническая помощь.",
    openAI: "Открыть AI",
    featured: "Избранные товары",
    sort: "Сортировка",
    recommended: "Рекомендуемые",
    priceAsc: "Цена по возрастанию",
    priceDesc: "Цена по убыванию",
    nameAZ: "Название А–Я",
    noProducts: "Товары не найдены.",
    benefits1: "Быстрая доставка",
    benefits2: "Безопасные покупки",
    benefits3: "Проверенный ассортимент",
    benefits4: "Возврат товара",
    benefits5: "Помощь PL / DE",
    heroTitle: "RECYKTRONIX",
    heroSubtitle: "e-Shop Business Pro",
    heroDesc: "Современные технологии. Проверенная техника. Профессиональный сервис.",
    checkOffer: "СМОТРЕТЬ ПРЕДЛОЖЕНИЯ",
    contact: "Контакт:",
    rights: "Все права защищены.",
    cart: "Корзина",
    favorites: "Избранное",
    account: "Аккаунт",
    addedToCart: "Добавлено в корзину",
    updatedFavorites: "Избранное обновлено",
    cartEmpty: "Корзина пуста",
    showingFavorites: "Показаны избранные товары",
    showingAll: "Показаны все товары",
    products: "товары",
    total: "Итого"
  }
};

let currentLang = localStorage.getItem('recyktronix-lang') || 'en';
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
        <p class="product-category">${categoryLabel(categories.find(c=>c.id===product.category)||{id:product.category,name:product.category})}</p>
        ${product.description?`<p class="product-desc">${product.description}</p>`:""}
        <div class="product-bottom"><span class="product-price">${formatPrice(product.price)}</span>
          <div style="display:flex;gap:5px">
            <button class="add-cart" data-cart="${product.id}" aria-label="${t('cart')}">🛒</button>
            <a href="https://t.me/BetaTester91?text=${encodeURIComponent('Interesuje mnie produkt: '+product.name+' (ID: '+product.id+')')}" target="_blank" class="contact-btn" title="Kontakt">✉</a>
          </div>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  emptyMessage.hidden=filtered.length>0;emptyMessage.textContent=t('noProducts');updateCounters();
}
function categoryLabel(cat){
  // domyślne kategorie mają tłumaczenia, własne pokazują nazwę
  if (cat.id === 'all') return t('allProducts');
  const translated = t(cat.id);
  return translated === cat.id ? cat.name : translated;
}

function renderCategories(){
  const list = document.getElementById("categoryList");
  if (!list) return;
  list.innerHTML = "";
  categories.forEach(cat=>{
    const btn=document.createElement("button");
    btn.className="category"+(selectedCategory===cat.id?" active":"");
    btn.dataset.category=cat.id;
    btn.textContent=categoryLabel(cat);
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".category").forEach(item=>item.classList.remove("active"));
      btn.classList.add("active");selectedCategory=cat.id;showFavoritesOnly=false;renderProducts();
    });
    list.appendChild(btn);
  });
}

function updateLanguage(){
  document.getElementById("language").value=currentLang;
  document.getElementById("searchInput").placeholder=t('search');
  const catTitle=document.getElementById("categoriesTitle");
  if (catTitle) catTitle.textContent=t('categories');
  renderCategories();
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
const cartModal=document.getElementById("cartModal");

function renderCart(){
  const itemsEl=document.getElementById("cartItems");
  const totalEl=document.getElementById("cartTotal");
  const checkoutBtn=document.getElementById("checkoutBtn");
  itemsEl.innerHTML="";
  if(!cart.length){
    itemsEl.innerHTML=`<p class="cart-empty">${t('cartEmpty')}</p>`;
    totalEl.textContent=formatPrice(0);
    checkoutBtn.disabled=true;
    return;
  }
  checkoutBtn.disabled=false;
  let total=0;
  cart.forEach((id,idx)=>{
    const p=products.find(item=>item.id===id);
    if(!p)return;
    total+=p.price;
    const row=document.createElement("div");
    row.className="cart-item";
    row.innerHTML=`
      <div class="cart-item-info">
        <strong>${p.name}</strong>
        <span>${formatPrice(p.price)}</span>
      </div>
      <button class="cart-remove" data-idx="${idx}" title="Usuń">×</button>`;
    itemsEl.appendChild(row);
  });
  totalEl.textContent=formatPrice(total);
}

document.getElementById("cartButton").addEventListener("click",()=>{
  renderCart();
  cartModal.style.display="flex";
});
document.getElementById("closeCart").addEventListener("click",()=>{
  cartModal.style.display="none";
});
cartModal.addEventListener("click",(e)=>{
  if(e.target===cartModal)cartModal.style.display="none";
});
document.getElementById("cartItems").addEventListener("click",(e)=>{
  const btn=e.target.closest("[data-idx]");
  if(btn){
    cart.splice(Number(btn.dataset.idx),1);
    updateCounters();renderCart();
  }
});
document.getElementById("checkoutBtn").addEventListener("click",()=>{
  if(!cart.length)return;
  const lines=cart.map(id=>{
    const p=products.find(item=>item.id===id);
    return p?`- ${p.name} (${formatPrice(p.price)})`:"";
  }).filter(Boolean);
  const total=cart.reduce((s,id)=>s+(products.find(i=>i.id===id)?.price||0),0);
  const msg=`Nowe zamówienie ze strony RECYKTRONIX:\n${lines.join("\n")}\nRazem: ${formatPrice(total)}\n\nProszę o kontakt w sprawie płatności.`;
  window.open(`https://t.me/ShadowAIHubBot?start=${encodeURIComponent(msg)}`,"_blank");
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

// Admin Panel
const adminButton=document.getElementById("adminButton");
const adminModal=document.getElementById("adminModal");
const closeAdmin=document.getElementById("closeAdmin");
const adminTabs=document.querySelectorAll(".admin-tab");
const adminSections=document.querySelectorAll(".admin-section");

adminButton.addEventListener("click",()=>{
  adminModal.style.display="flex";
  loadAdminData();
});

closeAdmin.addEventListener("click",()=>{
  adminModal.style.display="none";
});

adminTabs.forEach(tab=>{
  tab.addEventListener("click",()=>{
    adminTabs.forEach(t=>t.classList.remove("active"));
    adminSections.forEach(s=>s.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`admin${tab.dataset.tab.charAt(0).toUpperCase()+tab.dataset.tab.slice(1)}`).classList.add("active");
  });
});

function populateCategorySelect(){
  const sel=document.getElementById("prodCategory");
  if(!sel)return;
  sel.innerHTML="";
  categories.filter(c=>c.id!=="all").forEach(c=>{
    const opt=document.createElement("option");
    opt.value=c.id;opt.textContent=c.name;
    sel.appendChild(opt);
  });
}

function loadAdminData(){
  populateCategorySelect();
  // Load products
  const productList=document.getElementById("adminProductList");
  productList.innerHTML="";
  products.forEach(p=>{
    const item=document.createElement("div");
    item.className="admin-item";
    item.innerHTML=`
      <div class="admin-item-info">
        <div class="admin-item-name">${p.name}</div>
        <div class="admin-item-details">${formatPrice(p.price)} | ${p.category} | stock: ${p.stock??0} | ${p.condition||"new"}</div>
      </div>
      <div class="admin-item-actions">
        <button class="edit-btn" data-edit="${p.id}">Edit</button>
        <button class="delete-btn" data-del-prod="${p.id}">Delete</button>
      </div>`;
    productList.appendChild(item);
  });

  // Load categories
  const categoryList=document.getElementById("adminCategoryList");
  categoryList.innerHTML="";
  categories.filter(c=>c.id!=="all").forEach(cat=>{
    const inUse=products.some(p=>p.category===cat.id);
    const item=document.createElement("div");
    item.className="admin-item";
    item.innerHTML=`
      <div class="admin-item-info">
        <div class="admin-item-name">${cat.name} <small>(${cat.id})</small></div>
        ${inUse?'<div class="admin-item-details">in use</div>':''}
      </div>
      <div class="admin-item-actions">
        <button class="delete-btn" data-del-cat="${cat.id}">Delete</button>
      </div>`;
    categoryList.appendChild(item);
  });

  // Users (local demo list)
  const users=loadJSON('recyktronix-users',[]);
  const userList=document.getElementById("adminUserList");
  userList.innerHTML=users.length
    ? users.map(u=>`<div class="admin-item"><div class="admin-item-info"><div class="admin-item-name">${u.name||u}</div></div></div>`).join("")
    : '<p class="admin-hint">Brak zarejestrowanych użytkowników.</p>';

  // Settings
  const s=loadJSON('recyktronix-settings',{});
  document.getElementById("siteName").value=s.name||"RECYKTRONIX";
  document.getElementById("siteEmail").value=s.email||"recyktronix@gmail.com";
  document.getElementById("sitePhone").value=s.phone||"";
  document.getElementById("siteDesc").value=s.desc||"";
}

// Product delete/edit delegation
document.getElementById("adminProductList").addEventListener("click",(e)=>{
  const del=e.target.closest("[data-del-prod]");
  const edit=e.target.closest("[data-edit]");
  if(del){
    const id=Number(del.dataset.delProd);
    products=products.filter(p=>p.id!==id);
    saveProducts();renderProducts();loadAdminData();
    showToast("Product deleted");
  }
  if(edit){
    const id=Number(edit.dataset.edit);
    const p=products.find(item=>item.id===id);
    if(!p)return;
    const name=prompt("Name:",p.name);if(name===null)return;
    const price=parseFloat(prompt("Price EUR:",p.price));if(isNaN(price))return;
    const stock=parseInt(prompt("Stock:",p.stock??0),10);
    const desc=prompt("Description:",p.description||"");
    p.name=name;p.price=price;if(!isNaN(stock))p.stock=stock;if(desc!==null)p.description=desc;
    saveProducts();renderProducts();loadAdminData();
    showToast("Product updated");
  }
});

document.getElementById("adminCategoryList").addEventListener("click",(e)=>{
  const del=e.target.closest("[data-del-cat]");
  if(!del)return;
  const id=del.dataset.delCat;
  if(products.some(p=>p.category===id)){showToast("Category in use - cannot delete");return;}
  categories=categories.filter(c=>c.id!==id);
  saveCategories();renderCategories();populateCategorySelect();loadAdminData();
  showToast("Category deleted");
});

document.getElementById("addProductForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const name=document.getElementById("prodName").value.trim();
  const price=parseFloat(document.getElementById("prodPrice").value);
  const stock=parseInt(document.getElementById("prodStock").value,10)||0;
  const category=document.getElementById("prodCategory").value;
  const condition=document.getElementById("prodCondition").value;
  const desc=document.getElementById("prodDesc").value.trim();
  const image=document.getElementById("prodImage").value.trim();
  if(!name||isNaN(price))return;

  products.push({
    id:Date.now(),
    name,
    price,
    category,
    condition,
    stock,
    description:desc,
    image:image||""
  });

  saveProducts();
  renderProducts();
  loadAdminData();
  e.target.reset();
  showToast("Product added");
});

document.getElementById("addCategoryForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const name=document.getElementById("catName").value.trim();
  if(!name)return;
  const id="custom-"+Date.now();
  categories.push({id,name});
  saveCategories();
  renderCategories();
  populateCategorySelect();
  loadAdminData();
  e.target.reset();
  showToast(`Category "${name}" added`);
});

document.getElementById("settingsForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  saveJSON('recyktronix-settings',{
    name:document.getElementById("siteName").value.trim(),
    email:document.getElementById("siteEmail").value.trim(),
    phone:document.getElementById("sitePhone").value.trim(),
    desc:document.getElementById("siteDesc").value.trim()
  });
  applySettings();
  showToast("Settings saved");
});

function applySettings(){
  const s=loadJSON('recyktronix-settings',{});
  const brand=document.querySelector(".brand strong");
  if(brand&&s.name)brand.textContent=s.name.toUpperCase();
  const mail=document.querySelector(".footer-brand");
  if(mail&&s.name)mail.childNodes[0].textContent=s.name.toUpperCase()+" ";
  const emailLink=document.querySelector('.footer a[href^="mailto:"]');
  if(emailLink&&s.email){emailLink.href="mailto:"+s.email;emailLink.textContent=s.email;}
}

// RODO Consent
document.addEventListener("DOMContentLoaded",()=>{
  const rodoAccepted=localStorage.getItem("rodo-accepted");
  if(!rodoAccepted){
    document.getElementById("rodoModal").style.display="flex";
  }
});

document.getElementById("acceptRodo").addEventListener("click",()=>{
  localStorage.setItem("rodo-accepted","true");
  document.getElementById("rodoModal").style.display="none";
  showToast("RODO accepted");
});

document.getElementById("declineRodo").addEventListener("click",()=>{
  document.getElementById("rodoModal").style.display="none";
  showToast("RODO declined - some features may be limited");
});

// Apply saved interface
if (localStorage.getItem('recyktronix-interface') === 'alt') {
  document.body.classList.add('alt-interface');
}

updateLanguage();
renderProducts();
applySettings();

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

// --- Newsletter ---
(function(){
  const form=document.getElementById("newsletterForm");
  if(!form)return;
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const input=document.getElementById("newsletterEmail");
    const msg=document.getElementById("newsletterMsg");
    const email=(input.value||"").trim().toLowerCase();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){msg.textContent="Podaj poprawny adres e-mail.";msg.style.color="#ff7b7b";return;}
    let list=[];
    try{list=JSON.parse(localStorage.getItem("recyktronix-newsletter")||"[]");}catch(_){}
    if(list.some(x=>x.email===email)){msg.textContent="Ten adres jest już zapisany.";msg.style.color="var(--muted)";return;}
    list.push({email,ts:new Date().toISOString()});
    localStorage.setItem("recyktronix-newsletter",JSON.stringify(list));
    input.value="";
    msg.textContent="Dziękujemy! Zapisaliśmy Twój adres. Wkrótce napiszemy z nowościami.";
    msg.style.color="#4ade80";
  });
})();
