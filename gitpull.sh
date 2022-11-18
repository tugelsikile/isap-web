git reset --hard
git pull https://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:x-oauth-basic@github.com/tugelsikile/isap-web.git main
php artisan route:cache
php artisan config:cache
chmod -R 755 public

