#!/bin/bash

# Быстрое развертывание MY HELPER
# Вам нужно будет ввести пароль от сервера несколько раз

SERVER="root@95.46.96.147"
DOMAIN="myhelper.uz"
WEB_ROOT="/var/www/$DOMAIN"

echo "🚀 Начинаем развертывание MY HELPER на $DOMAIN"
echo "=================================================="
echo ""
echo "⚠️  ВНИМАНИЕ: Вам нужно будет ввести пароль от сервера несколько раз"
echo ""
read -p "Нажмите Enter чтобы продолжить..."

# ШАГ 1 и 2: Установка Nginx и создание директории
echo ""
echo "📦 ШАГ 1-2: Установка Nginx и создание директории..."
ssh -o StrictHostKeyChecking=no $SERVER << 'ENDSSH'
echo "Обновление системы..."
apt update -qq

echo "Проверка Nginx..."
if ! command -v nginx &> /dev/null; then
    echo "Установка Nginx..."
    apt install nginx -y
    systemctl start nginx
    systemctl enable nginx
    echo "✅ Nginx установлен"
else
    echo "✅ Nginx уже установлен"
fi

echo "Создание директории для сайта..."
mkdir -p /var/www/myhelper.uz
echo "✅ Директория создана: /var/www/myhelper.uz"
ENDSSH

if [ $? -eq 0 ]; then
    echo "✅ Шаги 1-2 завершены успешно"
else
    echo "❌ Ошибка на шагах 1-2"
    exit 1
fi

# ШАГ 3: Загрузка файлов
echo ""
echo "📤 ШАГ 3: Загрузка файлов на сервер..."
cd /Users/shaxzodisamahamadov/myhelper-site

# Загрузка файлов
scp -o StrictHostKeyChecking=no \
    index.html styles.css script.js translations.js i18n.js favicon.ico \
    $SERVER:$WEB_ROOT/

# Загрузка папки images
scp -o StrictHostKeyChecking=no -r images/ $SERVER:$WEB_ROOT/

if [ $? -eq 0 ]; then
    echo "✅ Файлы загружены"
else
    echo "❌ Ошибка при загрузке файлов"
    exit 1
fi

# ШАГ 4: Загрузка конфигурации Nginx
echo ""
echo "⚙️  ШАГ 4: Загрузка конфигурации Nginx..."
scp -o StrictHostKeyChecking=no nginx-config.conf $SERVER:/etc/nginx/sites-available/$DOMAIN

if [ $? -eq 0 ]; then
    echo "✅ Конфигурация загружена"
else
    echo "❌ Ошибка при загрузке конфигурации"
    exit 1
fi

# ШАГ 5: Активация конфигурации
echo ""
echo "🔗 ШАГ 5: Активация конфигурации и перезапуск Nginx..."
ssh -o StrictHostKeyChecking=no $SERVER << 'ENDSSH'
# Активация конфигурации
ln -sf /etc/nginx/sites-available/myhelper.uz /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Проверка конфигурации
echo "Проверка конфигурации Nginx..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Конфигурация корректна"

    # Перезапуск Nginx
    systemctl restart nginx
    echo "✅ Nginx перезапущен"

    # Установка прав
    chown -R www-data:www-data /var/www/myhelper.uz
    chmod -R 755 /var/www/myhelper.uz
    echo "✅ Права установлены"
else
    echo "❌ Ошибка в конфигурации Nginx"
    exit 1
fi
ENDSSH

if [ $? -eq 0 ]; then
    echo "✅ Шаг 5 завершен успешно"
else
    echo "❌ Ошибка на шаге 5"
    exit 1
fi

# Проверка статуса
echo ""
echo "📊 Проверка статуса..."
ssh -o StrictHostKeyChecking=no $SERVER "systemctl status nginx --no-pager | head -10"

echo ""
echo "=================================================="
echo "✅ РАЗВЕРТЫВАНИЕ ЗАВЕРШЕНО!"
echo "=================================================="
echo ""
echo "🌐 Сайт доступен по адресу: http://myhelper.uz"
echo ""
echo "📝 СЛЕДУЮЩИЙ ШАГ: Установка SSL (HTTPS)"
echo ""
echo "Для установки SSL выполните:"
echo "  ssh $SERVER"
echo "  apt install certbot python3-certbot-nginx -y"
echo "  certbot --nginx -d myhelper.uz -d www.myhelper.uz"
echo ""
echo "Или запустите автоматическую установку SSL:"
echo "  ./install-ssl.sh"
echo ""
