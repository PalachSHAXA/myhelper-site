#!/bin/bash

# Скрипт для развертывания сайта MY HELPER на сервер
# Сервер: 95.46.96.147
# Домен: myhelper.uz

set -e  # Остановка при ошибке

SERVER="95.46.96.147"
DOMAIN="myhelper.uz"
WEB_ROOT="/var/www/$DOMAIN"
SITE_DIR="/Users/shaxzodisamahamadov/myhelper-site"

echo "🚀 Начинаем развертывание сайта MY HELPER на $DOMAIN"
echo "=================================================="

# 1. Проверка подключения к серверу
echo "📡 Проверка подключения к серверу..."
if ssh -o ConnectTimeout=5 root@$SERVER "echo 'OK'" 2>/dev/null; then
    echo "✅ Подключение к серверу успешно"
else
    echo "❌ Не удалось подключиться к серверу"
    echo "Убедитесь что:"
    echo "  1. У вас есть SSH доступ к root@$SERVER"
    echo "  2. SSH ключ настроен или вы можете ввести пароль"
    exit 1
fi

# 2. Создание директории для сайта
echo ""
echo "📁 Создание директории для сайта..."
ssh root@$SERVER "mkdir -p $WEB_ROOT"
echo "✅ Директория создана: $WEB_ROOT"

# 3. Загрузка файлов на сервер
echo ""
echo "📤 Загрузка файлов сайта на сервер..."
cd "$SITE_DIR"
rsync -avz --exclude 'node_modules' \
           --exclude '.git' \
           --exclude '*.backup' \
           --exclude 'DEPLOYMENT.md' \
           --exclude 'deploy.sh' \
           ./ root@$SERVER:$WEB_ROOT/
echo "✅ Файлы загружены"

# 4. Проверка установки Nginx
echo ""
echo "🔍 Проверка установки Nginx..."
if ssh root@$SERVER "which nginx" > /dev/null 2>&1; then
    echo "✅ Nginx установлен"
else
    echo "⚠️  Nginx не установлен. Устанавливаем..."
    ssh root@$SERVER "apt update && apt install nginx -y"
    ssh root@$SERVER "systemctl start nginx && systemctl enable nginx"
    echo "✅ Nginx установлен и запущен"
fi

# 5. Создание конфигурации Nginx
echo ""
echo "⚙️  Создание конфигурации Nginx..."
ssh root@$SERVER "cat > /etc/nginx/sites-available/$DOMAIN << 'NGINX_CONFIG'
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    root $WEB_ROOT;
    index index.html;

    # Основной location
    location / {
        try_files \$uri \$uri/ =404;
    }

    # Кэширование статических файлов
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control \"public, immutable\";
        access_log off;
    }

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json image/svg+xml;

    # Логи
    access_log /var/log/nginx/$DOMAIN.access.log;
    error_log /var/log/nginx/$DOMAIN.error.log;
}
NGINX_CONFIG"
echo "✅ Конфигурация создана"

# 6. Активация конфигурации
echo ""
echo "🔗 Активация конфигурации..."
ssh root@$SERVER "ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/"
ssh root@$SERVER "rm -f /etc/nginx/sites-enabled/default"  # Удаляем дефолтный сайт
echo "✅ Конфигурация активирована"

# 7. Проверка конфигурации Nginx
echo ""
echo "🧪 Проверка конфигурации Nginx..."
if ssh root@$SERVER "nginx -t" 2>&1; then
    echo "✅ Конфигурация корректна"
else
    echo "❌ Ошибка в конфигурации Nginx"
    exit 1
fi

# 8. Перезапуск Nginx
echo ""
echo "🔄 Перезапуск Nginx..."
ssh root@$SERVER "systemctl restart nginx"
echo "✅ Nginx перезапущен"

# 9. Установка прав доступа
echo ""
echo "🔐 Установка прав доступа..."
ssh root@$SERVER "chown -R www-data:www-data $WEB_ROOT"
ssh root@$SERVER "chmod -R 755 $WEB_ROOT"
echo "✅ Права доступа установлены"

# 10. Проверка статуса
echo ""
echo "📊 Статус служб:"
ssh root@$SERVER "systemctl status nginx --no-pager | head -5"

echo ""
echo "=================================================="
echo "✅ Развертывание завершено успешно!"
echo ""
echo "🌐 Сайт доступен по адресам:"
echo "   http://$DOMAIN"
echo "   http://www.$DOMAIN"
echo ""
echo "📝 Следующие шаги:"
echo "   1. Убедитесь что DNS записи указывают на $SERVER"
echo "   2. Для установки SSL сертификата запустите:"
echo "      ssh root@$SERVER"
echo "      certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo "🔄 Для обновления сайта просто запустите этот скрипт снова!"
