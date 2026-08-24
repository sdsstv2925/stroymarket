# СТРОЙ.МАРКЕТ - Deploy на Cloudflare Pages

1. Залей ВСЮ папку stroymarket-site на Cloudflare Pages (Upload assets)
2. В настройках Pages -> Settings -> Environment variables добавь:
   - TELEGRAM_BOT_TOKEN = токен твоего бота
   - TELEGRAM_CHAT_ID = id чата куда слать заказы
   - MAX_BOT_TOKEN = токен бота MAX (когда получишь)
   - MAX_CHAT_ID = чат в MAX

3. Форма на сайте шлет POST на /api/order - Worker автоматически подхватится из /functions/api/order.js

Структура:
- index.html - главная
- catalog.html - каталог /catalog
- product.html - карточка товара
- functions/api/order.js - бэкенд для заявок в Telegram + MAX

Для SEO: потом можно сделать отдельные html под каждый город /product/rotband-balashikha.html
