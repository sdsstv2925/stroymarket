export async function onRequestPost(context) {
  const data = await context.request.json();
  const text = `🔥 Новый заказ! Товар: ${data.product} Город: ${data.city} Клиент: ${data.name} ${data.phone} Кол-во: ${data.qty}`;
  if (context.env.TELEGRAM_BOT_TOKEN) {
    await fetch(`https://api.telegram.org/bot${context.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: context.env.TELEGRAM_CHAT_ID, text: text })
    });
  }
  return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
}
