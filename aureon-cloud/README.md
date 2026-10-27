# Aureon Cloud (deploy kit)

OpenVSCode Server (rebranded) + JDK + Android SDK + Caddy (HTTPS) + APK download.

## Chalane ke steps (VPS par, Docker installed)
1. DNS me do A records banao: IDE_DOMAIN aur APK_DOMAIN -> VPS IP
2. `cd aureon-cloud && cp .env.example .env` aur values bharo
3. `docker compose up -d --build`
4. IDE kholo: `https://IDE_DOMAIN/?tkn=AUREON_TOKEN`
5. APK banao: `./gradlew assembleDebug`, phir APK ko `/home/workspace/apk-out/` me copy karo
6. Phone me `https://APK_DOMAIN` kholo (user/password se) aur download karo

Note: VPS me kam se kam 4 GB RAM rakho (Gradle build ke liye).

## Android app (APK)
GitHub par repo push karo -> Actions tab -> "Build Aureon Cloud APK" -> Run workflow.
Khatam hone par run kholo, neeche Artifacts me `aureon-cloud-apk` download karo (zip ke andar app-debug.apk).
App pehli baar khulne par server ka link maangti hai (https://IDE_DOMAIN/?tkn=AUREON_TOKEN).
