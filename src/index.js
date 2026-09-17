export default {
  async fetch(request, env) {
    // Telegram'dan gelen istek
    if (request.method === "POST") {
      try {
        const update = await request.json();

        // Mesaj geldiyse
        if (update.message) {
          const chatId = update.message.chat.id;
          const text = update.message.text || "";

          let cevap = "🤖 Merhaba! Bot çalışıyor.";

          if (text === "/start") {
            cevap =
              "👋 Hoş geldin!\n\n🤖 Telegram bot aktif.\n\nKomutlarını kullanabilirsin.";
          }

          if (text === "/yardim") {
            cevap =
              "📋 Komutlar:\n\n/start - Botu başlat\n/yardim - Yardım menüsü";
          }

          // Telegram'a cevap gönder
          await fetch(
            `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                chat_id: chatId,
                text: cevap
              })
            }
          );
        }

        return new Response("OK");
      } catch (error) {
        return new Response("Hata: " + error.message, {
          status: 500
        });
      }
    }

    // Tarayıcıdan açıldığında
    return new Response("🤖 Telegram bot aktif!");
  }
};
