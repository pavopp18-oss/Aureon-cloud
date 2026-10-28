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

## Apna GitHub (Aureon Git = Forgejo)
- Repos, issues, pull requests, wiki, projects, packages: `https://GIT_DOMAIN`
- Git push/clone sirf HTTPS se (SSH band hai): `git clone https://GIT_DOMAIN/naam/repo.git`
- Branding: naam "Aureon Git", Aureon dark/light theme, logo. Files `forgejo-custom/` me hain. Theme badalna ho to `forgejo-custom/public/assets/css/` ki CSS edit karo aur `docker compose restart forgejo`.
- **Open in Aureon Cloud** button: har repo page pe aata hai. Dabane par `git clone ...` command copy hota hai aur IDE naye tab me khulta hai; IDE ke terminal me paste karo. IDE ka address `GIT_DOMAIN` ke `git.` ko `ide.` karke banta hai. Alag naam ho to `forgejo-custom/public/assets/aureon/open-in-aureon.js` me `window.AUREON_IDE_URL` set karo. Token button me nahi hota; IDE pehli baar `https://IDE_DOMAIN/?tkn=AUREON_TOKEN` se kholo, browser yaad rakhega.
- Doosre log: registration band hai. Admin panel (Site Administration, Create User Account) se banao.

## CI runner (Actions)
1. Forgejo chal raha ho tab token nikaalo:
   `docker compose exec -u git forgejo forgejo actions generate-runner-token`
2. Token `.env` me `RUNNER_TOKEN=` ke aage daalo.
3. `docker compose --profile ci up -d`
4. Repo me Actions tab. Is repo ka APK workflow `.forgejo/workflows/build-apk.yml` hai (GitHub wala `.github/...` alag).
- Runner ko Docker socket milta hai, matlab wo server pe Docker ko control kar sakta hai. Sirf apne bharose ke repos pe use karo.

## Backup
`./backup.sh` chalao, `backup-TARIKH.tar.gz` banega (repos, database, settings). Use kisi doosri jagah copy karke rakho.
