# RECYKTRONIX e-Shop – Business Pro

Responsywny frontend demonstracyjny sklepu RECYKTRONIX w stylistyce Business Pro.

## Uruchomienie
1. Rozpakuj archiwum.
2. Zachowaj strukturę folderów.
3. Otwórz `index.html` w przeglądarce albo prześlij cały katalog na hosting.
4. Na serwerze WWW ustaw `index.html` jako stronę startową.

Do lokalnego podglądu nie jest wymagany build ani instalacja zależności.

## Pliki
- `index.html` – struktura strony.
- `style.css` – wygląd i responsywność.
- `script.js` – demonstracyjny katalog, filtrowanie, sortowanie, ulubione i licznik koszyka.
- `assets/products/` – katalog na zdjęcia produktów.
- `assets/logo.png` – opcjonalny plik logo.

## Własne produkty
Edytuj tablicę `products` w `script.js`. Każdy produkt ma:
- `id` – unikalny numer,
- `name` – nazwa,
- `category` – identyfikator kategorii,
- `price` – cena liczbowa w EUR,
- `image` – ścieżka do zdjęcia.

Dostępne identyfikatory kategorii: `electronics`, `computers`, `audio`, `accessories`, `home`, `tools`, `other`.

Wgraj zdjęcia do `assets/products/` i wpisz ich ścieżki w danych produktów. Logo można umieścić w `assets/logo.png`.

## Ważne ograniczenia demonstracji
To jest frontend, nie kompletny sklep produkcyjny:
- koszyk działa wyłącznie w pamięci bieżącej strony;
- nie ma składania zamówień ani płatności;
- nie ma kont użytkowników ani panelu administratora;
- dane produktów są zapisane w pliku JavaScript;
- wybór PL/DE jest obecnie tylko demonstracją – niemieckie tłumaczenia trzeba uzupełnić;
- odnośniki regulaminu, polityki prywatności i kontaktu wymagają podania prawdziwych danych.

## Przed uruchomieniem sprzedaży
Podłącz backend i bazę danych, panel administracyjny, obsługę zamówień, płatności, dostaw, podatków, zwrotów, regulaminu i polityki prywatności. Skonfiguruj HTTPS i ochronę danych klientów.
