# 🤖 TypeScript Discord botu başlangıç altyapısı

-   TypeScript ile Discord botu yapmak isteyenler için güzel bir başlangıç altyapısı.
-   Command ve event handler hazır bir şekilde bulunmaktadır.
-   Komut oluştururken takip edeceğiniz taslağı `src/struct/Command.ts` içerisinde bulabilirsiniz (`src/commands/bot/ping.ts` içinde bir örnek görebilirsiniz.).
-   Event oluştururken takip edeceğiniz taslağı `src/struct/Event.ts` içerisinde bulabilirsiniz (`src/events/ready.ts` içinde bir örnek görebilirsiniz.).

# 🐮 Kurulum

-   Bilgisayarınıza https://nodejs.org sitesinden NodeJS kurun.
-   Bilgisayarınıza https://git-scm.com sitesinden Git kurun.
-   Bilgisayarınıza `npm i -g typescript` komutu ile TypeScript kurun.
-   `git clone https://github.com/barbarbar338/ts-discord-bot-template` komutuyla repoyu klonlayın.
-   `npm i` komutuyla modülleri indirin.
-   `.env.example` dosyasını `.env` olarak yeniden adlandırın ve içini doldurun.
-   `src/config.ts` içini doldurun.

# 🚀 Çalıştırma

-   (Production) `npm run build` komutu ile bot dosyalarını oluşturun ve `npm run start:prod` komutu ile botu başlatın.
-   (Development) `npm run start:dev` komutu ile development serverini başlatın.
