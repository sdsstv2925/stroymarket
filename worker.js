export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/order' && request.method === 'POST') {
      try {
        const data = await request.json();
        const text = `🔥 Новый заказ!\nТовар: ${data.product}\nГород: ${data.city}\nКлиент: ${data.name} ${data.phone}\nКол-во: ${data.qty}`;
        if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
          await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: text })
          });
        }
        return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false }), { status: 500 });
      }
    }
    return env.ASSETS.fetch(request);
  }
}
