# Пошаговая инструкция по деплою сайта MY HELPER

## ШАГ 1: Настройка домена (myhelper.uz)

### 1.1 Настройте DNS записи у вашего регистратора домена

Зайдите в панель управления доменом myhelper.uz и добавьте следующие записи:

```
Тип: A
Имя: @
Значение: 95.46.96.147
TTL: 3600

Тип: A
Имя: www
Значение: 95.46.96.147
TTL: 3600
```

**Проверка**: Через 5-30 минут выполните команду на вашем компьютере:
```bash
ping myhelper.uz
```
Должен вернуться адрес: 95.46.96.147

---

## ШАГ 2: Подключение к серверу и установка Nginx

### 2.1 Подключитесь к серверу через SSH:

```bash
ssh root@95.46.96.147
```

Введите пароль когда будет запрошен.

### 2.2 Установите Nginx:

```bash
# Обновите пакеты
yum update -y

# Установите Nginx
yum install -y nginx

# Запустите Nginx
systemctl start nginx
systemctl enable nginx

# Проверьте статус
systemctl status nginx
```

### 2.3 Настройте firewall (если нужно):

```bash
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
```

**Проверка**: Откройте в браузере http://95.46.96.147 - должна появиться стандартная страница Nginx.

---

## ШАГ 3: Загрузка файлов сайта на сервер

### 3.1 НА ВАШЕМ КОМПЬЮТЕРЕ создайте директорию для проекта (если еще не в ней):

```bash
cd /Users/shaxzodisamahamadov/myhelper-site
```

### 3.2 Загрузите файлы на сервер через SCP:

```bash
# Создайте архив файлов
tar -czf myhelper-site.tar.gz index.html styles.css script.js i18n.js translations.js images/

# Загрузите архив на сервер
scp myhelper-site.tar.gz root@95.46.96.147:/tmp/

# Также загрузите конфиг Nginx
scp nginx-config.conf root@95.46.96.147:/tmp/
```

### 3.3 НА СЕРВЕРЕ распакуйте файлы:

```bash
# Создайте директорию для сайта
mkdir -p /var/www/myhelper.uz

# Распакуйте файлы
cd /var/www/myhelper.uz
tar -xzf /tmp/myhelper-site.tar.gz

# Установите правильные права
chown -R nginx:nginx /var/www/myhelper.uz
chmod -R 755 /var/www/myhelper.uz
```

**Проверка**: Выполните `ls -la /var/www/myhelper.uz` - должны увидеть все файлы сайта.

---

## ШАГ 4: Настройка Nginx для домена

### 4.1 НА СЕРВЕРЕ создайте конфигурацию:

```bash
# Скопируйте загруженный конфиг
cp /tmp/nginx-config.conf /etc/nginx/conf.d/myhelper.uz.conf

# ИЛИ создайте вручную:
cat > /etc/nginx/conf.d/myhelper.uz.conf << 'EOF'
server {
    listen 80;
    server_name myhelper.uz www.myhelper.uz;

    root /var/www/myhelper.uz;
    index index.html;

    # Логи
    access_log /var/log/nginx/myhelper.uz.access.log;
    error_log /var/log/nginx/myhelper.uz.error.log;

    # Основная локация
    location / {
        try_files $uri $uri/ =404;
    }

    # Кеширование статических файлов
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
EOF
```

### 4.2 Проверьте конфигурацию и перезапустите Nginx:

```bash
# Проверка синтаксиса
nginx -t

# Перезапуск
systemctl restart nginx

# Проверка статуса
systemctl status nginx
```

**Проверка**: Откройте в браузере http://myhelper.uz - должен открыться ваш сайт!

---

## ШАГ 5: Установка SSL сертификата (HTTPS)

### 5.1 Установите Certbot:

```bash
# Установите EPEL репозиторий (если нужно)
yum install -y epel-release

# Установите Certbot
yum install -y certbot python3-certbot-nginx
```

### 5.2 Получите SSL сертификат:

```bash
# Автоматическая настройка SSL
certbot --nginx -d myhelper.uz -d www.myhelper.uz

# Следуйте инструкциям:
# - Введите email для уведомлений
# - Согласитесь с условиями (Y)
# - Выберите опцию перенаправления HTTP на HTTPS (рекомендуется опция 2)
```

### 5.3 Настройте автообновление:

```bash
# Проверьте автоматическое обновление
certbot renew --dry-run

# Добавьте задачу в cron (если не добавлена автоматически)
echo "0 3 * * * certbot renew --quiet" | crontab -
```

**Проверка**: Откройте в браузере https://myhelper.uz - должен открыться сайт с зеленым замочком!

---

## ШАГ 6: Финальная проверка

### 6.1 Проверьте все URL:
- http://myhelper.uz → должен перенаправлять на https://myhelper.uz
- http://www.myhelper.uz → должен перенаправлять на https://myhelper.uz
- https://www.myhelper.uz → должен работать

### 6.2 Проверьте функциональность:
- ✅ Переключение языков RU/UZ работает
- ✅ Все изображения загружаются
- ✅ Анимации работают
- ✅ Кнопки кликабельны
- ✅ Навигация работает
- ✅ Мобильная версия отображается корректно

### 6.3 Проверьте производительность:
- Google PageSpeed Insights: https://pagespeed.web.dev/
- SSL Test: https://www.ssllabs.com/ssltest/

---

## Troubleshooting (Решение проблем)

### Проблема: Сайт не открывается
```bash
# Проверьте статус Nginx
systemctl status nginx

# Проверьте логи
tail -f /var/log/nginx/myhelper.uz.error.log

# Проверьте права на файлы
ls -la /var/www/myhelper.uz

# Перезапустите Nginx
systemctl restart nginx
```

### Проблема: DNS не обновился
```bash
# Проверьте DNS
nslookup myhelper.uz
dig myhelper.uz

# Очистите кеш DNS на вашем компьютере (macOS)
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

### Проблема: SSL сертификат не устанавливается
```bash
# Проверьте, что домен доступен по HTTP
curl http://myhelper.uz

# Проверьте firewall
firewall-cmd --list-all

# Попробуйте вручную
certbot certonly --webroot -w /var/www/myhelper.uz -d myhelper.uz -d www.myhelper.uz
```

---

## Обновление сайта в будущем

Когда нужно обновить файлы сайта:

```bash
# НА ВАШЕМ КОМПЬЮТЕРЕ
cd /Users/shaxzodisamahamadov/myhelper-site
tar -czf myhelper-site.tar.gz index.html styles.css script.js i18n.js translations.js images/
scp myhelper-site.tar.gz root@95.46.96.147:/tmp/

# НА СЕРВЕРЕ
cd /var/www/myhelper.uz
tar -xzf /tmp/myhelper-site.tar.gz
chown -R nginx:nginx /var/www/myhelper.uz
systemctl reload nginx
```

---

## Готово! 🎉

Ваш сайт MY HELPER теперь доступен по адресу: **https://myhelper.uz**
