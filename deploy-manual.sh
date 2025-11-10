#!/bin/bash

# Ручное развертывание MY HELPER на myhelper.uz
# Запускайте команды по одной

echo "=========================================="
echo "ИНСТРУКЦИЯ ПО РАЗВЕРТЫВАНИЮ"
echo "=========================================="
echo ""
echo "1. Подключитесь к серверу:"
echo "   ssh root@95.46.96.147"
echo ""
echo "2. Установите Nginx (если еще не установлен):"
echo "   apt update && apt install nginx -y"
echo "   systemctl start nginx"
echo "   systemctl enable nginx"
echo ""
echo "3. Создайте директорию для сайта:"
echo "   mkdir -p /var/www/myhelper.uz"
echo ""
echo "4. ОТКРОЙТЕ НОВЫЙ ТЕРМИНАЛ и загрузите файлы:"
echo "   cd /Users/shaxzodisamahamadov/myhelper-site"
echo "   scp -r *.html *.css *.js images/ root@95.46.96.147:/var/www/myhelper.uz/"
echo ""
echo "5. Вернитесь в SSH сессию на сервере и создайте конфигурацию Nginx:"
echo "   nano /etc/nginx/sites-available/myhelper.uz"
echo ""
echo "6. Вставьте эту конфигурацию:"
cat << 'EOF'

server {
    listen 80;
    listen [::]:80;
    server_name myhelper.uz www.myhelper.uz;

    root /var/www/myhelper.uz;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json image/svg+xml;

    access_log /var/log/nginx/myhelper.uz.access.log;
    error_log /var/log/nginx/myhelper.uz.error.log;
}

EOF
echo ""
echo "7. Активируйте конфигурацию:"
echo "   ln -s /etc/nginx/sites-available/myhelper.uz /etc/nginx/sites-enabled/"
echo "   rm -f /etc/nginx/sites-enabled/default"
echo ""
echo "8. Проверьте конфигурацию:"
echo "   nginx -t"
echo ""
echo "9. Перезапустите Nginx:"
echo "   systemctl restart nginx"
echo ""
echo "10. Установите права:"
echo "   chown -R www-data:www-data /var/www/myhelper.uz"
echo "   chmod -R 755 /var/www/myhelper.uz"
echo ""
echo "11. Установите SSL (HTTPS):"
echo "   apt install certbot python3-certbot-nginx -y"
echo "   certbot --nginx -d myhelper.uz -d www.myhelper.uz"
echo ""
echo "=========================================="
echo "ГОТОВО! Сайт будет доступен на:"
echo "http://myhelper.uz"
echo "https://myhelper.uz (после установки SSL)"
echo "=========================================="
