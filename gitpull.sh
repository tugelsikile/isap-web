git reset --hard
git pull https://37a3a2551e0f1f2b6ff224d04e5e2f3f167c44cf:x-oauth-basic@github.com/tugelsikile/isap-web.git main
php artisan route:cache
php artisan config:cache
chmod -R 755 public
php artisan migrate --seed
