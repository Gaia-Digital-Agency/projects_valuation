# Deploy notes

## Server
- Host: `gda-s01` (34.124.244.233)
- User: `azlan`
- Site root: `/var/www/valuations`
- Frontend dist: `/var/www/valuations/frontend/dist`
- Backend (planned): `127.0.0.1:3020`

## DNS (GoDaddy → net1io.space)
- `valuations` A → `34.124.244.233` ✅

## Nginx
Config tracked at `deploy/nginx/valuations.net1io.space.conf`.
After edits:
```
sudo cp deploy/nginx/valuations.net1io.space.conf /etc/nginx/sites-available/
sudo nginx -t && sudo systemctl reload nginx
```

## TLS
Let's Encrypt issued via:
```
sudo certbot --nginx -d valuations.net1io.space --redirect -m ai@gaiada.com --agree-tos
```
Auto-renew handled by certbot.timer.

## Frontend rebuild + deploy
```
cd frontend && npm run build
# dist/ is served directly by nginx — no restart needed
```
