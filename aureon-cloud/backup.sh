#!/bin/sh
# Forgejo ka poora backup (repos + database + settings) ek tar.gz me.
# Chalao: ./backup.sh   -> backup-YYYY-MM-DD.tar.gz banega. Isse kisi doosri jagah copy karke rakho.
set -e
cd "$(dirname "$0")"
OUT="backup-$(date +%F).tar.gz"
docker compose exec -T -u git forgejo forgejo dump --type tar.gz --file - > "$OUT"
echo "Backup ban gaya: $OUT ($(du -h "$OUT" | cut -f1))"
