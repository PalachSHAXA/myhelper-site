#!/bin/bash

# Скрипт для деплоя сайта MY HELPER из GitHub на DirectAdmin хостинг
# Этот скрипт нужно запустить на сервере хостинга через SSH

echo "🚀 MY HELPER - Деплой из GitHub"
echo "================================"
echo ""

# Проверка, что скрипт запущен на сервере
if [ ! -d "/home/myhelper1" ]; then
    echo "❌ Этот скрипт должен быть запущен на сервере хостинга"
    echo ""
    echo "Инструкция:"
    echo "1. Войдите в SSH: ssh myhelper1@web4.webspace.uz"
    echo "2. Скачайте этот скрипт: wget https://raw.githubusercontent.com/PalachSHAXA/myhelper-site/main/deploy-from-github.sh"
    echo "3. Сделайте его исполняемым: chmod +x deploy-from-github.sh"
    echo "4. Запустите: ./deploy-from-github.sh"
    exit 1
fi

# Настройки
GITHUB_REPO="https://github.com/PalachSHAXA/myhelper-site"
GITHUB_ARCHIVE="https://github.com/PalachSHAXA/myhelper-site/archive/refs/heads/main.zip"
DOMAIN="myhelper.uz"
PUBLIC_HTML="$HOME/domains/$DOMAIN/public_html"
TEMP_DIR="/tmp/myhelper-deploy-$$"

echo "📦 Параметры деплоя:"
echo "   Репозиторий: $GITHUB_REPO"
echo "   Домен: $DOMAIN"
echo "   Директория: $PUBLIC_HTML"
echo ""

# Проверка наличия unzip
if ! command -v unzip &> /dev/null; then
    echo "❌ Ошибка: unzip не установлен"
    echo "Установите unzip: sudo apt install unzip или используйте альтернативный метод"
    exit 1
fi

# Создание временной директории
echo "📁 Создание временной директории..."
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR" || exit 1

# Скачивание репозитория
echo "⬇️  Скачивание файлов из GitHub..."
wget -q --show-progress "$GITHUB_ARCHIVE" -O myhelper-site.zip

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при скачивании репозитория"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Распаковка
echo "📦 Распаковка архива..."
unzip -q myhelper-site.zip

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при распаковке архива"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Создание директории для сайта, если её нет
echo "📁 Проверка директории сайта..."
mkdir -p "$PUBLIC_HTML"

# Создание бэкапа текущих файлов
if [ "$(ls -A $PUBLIC_HTML)" ]; then
    echo "💾 Создание бэкапа текущих файлов..."
    BACKUP_DIR="$HOME/backups/myhelper-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    cp -r "$PUBLIC_HTML"/* "$BACKUP_DIR/"
    echo "   Бэкап сохранён в: $BACKUP_DIR"
fi

# Копирование файлов сайта
echo "📤 Копирование файлов на сервер..."
cd myhelper-site-main || exit 1

# Копируем только необходимые файлы для веб-сайта
cp index.html "$PUBLIC_HTML/" 2>/dev/null
cp styles.css "$PUBLIC_HTML/" 2>/dev/null
cp script.js "$PUBLIC_HTML/" 2>/dev/null
cp translations.js "$PUBLIC_HTML/" 2>/dev/null
cp i18n.js "$PUBLIC_HTML/" 2>/dev/null
cp favicon.ico "$PUBLIC_HTML/" 2>/dev/null

# Копируем папку images
if [ -d "images" ]; then
    cp -r images "$PUBLIC_HTML/" 2>/dev/null
fi

# Установка правильных прав доступа
echo "🔒 Установка прав доступа..."
find "$PUBLIC_HTML" -type f -exec chmod 644 {} \;
find "$PUBLIC_HTML" -type d -exec chmod 755 {} \;

# Очистка временных файлов
echo "🧹 Очистка временных файлов..."
cd /
rm -rf "$TEMP_DIR"

echo ""
echo "================================"
echo "✅ ДЕПЛОЙ ЗАВЕРШЁН УСПЕШНО!"
echo "================================"
echo ""
echo "🌐 Сайт доступен по адресу:"
echo "   http://$DOMAIN"
echo ""
echo "📝 Следующие шаги:"
echo "   1. Проверьте сайт в браузере"
echo "   2. Настройте SSL сертификат в DirectAdmin"
echo "   3. После установки SSL сайт будет доступен на https://$DOMAIN"
echo ""
echo "📋 Файлы развернуты в:"
echo "   $PUBLIC_HTML"
echo ""
if [ -n "$BACKUP_DIR" ]; then
echo "💾 Бэкап предыдущей версии:"
echo "   $BACKUP_DIR"
echo ""
fi

# Показываем список файлов
echo "📂 Развёрнутые файлы:"
ls -lh "$PUBLIC_HTML"
echo ""
