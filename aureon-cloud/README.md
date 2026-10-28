# Aureon Cloud (deploy kit)

OpenVSCode Server + JDK + Android SDK (apna Codespaces) + Forgejo (apna GitHub) + Caddy (HTTPS) + APK download.

## Chalane ke steps (VPS par, Docker installed)
1. DNS me teen A records banao: IDE_DOMAIN, GIT_DOMAIN aur APK_DOMAIN -> VPS IP
2. `cd aureon-cloud && cp .env.example .env` aur values bharo
3. `docker compose up -d --build`
3b. Forgejo me pehla admin banao (ek baar):
   `docker compose exec -u git forgejo forgejo admin user create --admin --username TUMHARA_NAAM --password 'LAMBA-PASSWORD' --email tum@example.com`
   Phir `https://GIT_DOMAIN` kholo aur login karo. Naye log tabhi aa sakte hain jab tum unhe admin panel se banao.
4. IDE kholo: `https://IDE_DOMAIN/?tkn=AUREON_TOKEN`
5. APK banao: `./gradlew assembleDebug`, phir APK ko `/home/workspace/apk-out/` me copy karo
6. Phone me `https://APK_DOMAIN` kholo (user/password se) aur download karo

Note: VPS me kam se kam 4 GB RAM rakho (Gradle build ke liye).

## Android app (APK)
GitHub par repo push karo -> Actions tab -> "Build Aureon Cloud APK" -> Run workflow.
Khatam hone par run kholo, neeche Artifacts me `aureon-cloud-apk` download karo (zip ke andar app-debug.apk).
App pehli baar khulne par server ka link maangti hai (https://IDE_DOMAIN/?tkn=AUREON_TOKEN).

## Apna GitHub (Forgejo)
- Repos, issues, pull requests: `https://GIT_DOMAIN`
- Git push/clone sirf HTTPS se (SSH band hai): `git clone https://GIT_DOMAIN/naam/repo.git`
- Actions (CI) ke liye alag se `forgejo-runner` chalana padega. Abhi isme nahi hai, baad me add karenge.
- Backup: `forgejo_data` volume me sab kuch hai, use kabhi mat delete karna.
