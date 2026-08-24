export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { name, phone, qty, product, city, channel } = data;
    const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
    const text = `🔥 Новый заказ!\n\n📦 Товар: ${product}\n🏙 Город: ${city}\n👤 Клиент: ${name}\n📞 Телефон: ${phone}\n🔢 Кол-во: ${qty}\n💬 Канал ответа: ${channel}\n⏰ Время: ${time}`;

    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: text })
      });
    }
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500 });
  }
}
