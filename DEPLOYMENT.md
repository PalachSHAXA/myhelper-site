# Инструкция по развертыванию сайта MY HELPER

## Связь с доменом myhelper.uz (IP: 95.46.96.147)

### 1. Подключение к серверу
```bash
ssh root@95.46.96.147
```

### 2. Установка веб-сервера (если еще не установлен)

#### Для Nginx:
```bash
# Установка Nginx
apt update
apt install nginx -y

# Запуск и включение автозапуска
systemctl start nginx
systemctl enable nginx
```

### 3. Загрузка файлов сайта на сервер

```bash
# На вашем локальном компьютере
cd /Users/shaxzodisamahamadov/myhelper-site
scp -r * root@95.46.96.147:/var/www/myhelper.uz/
```

### 4. Настройка Nginx для домена myhelper.uz

Создайте конфигурацию сайта:
```bash
nano /etc/nginx/sites-available/myhelper.uz
```

Добавьте следующий конфиг:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name myhelper.uz www.myhelper.uz;

    root /var/www/myhelper.uz;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Кэширование статических файлов
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
}
```

### 5. Активация конфигурации

```bash
# Создание символической ссылки
ln -s /etc/nginx/sites-available/myhelper.uz /etc/nginx/sites-enabled/

# Проверка конфигурации
nginx -t

# Перезапуск Nginx
systemctl restart nginx
```

### 6. Настройка DNS (если еще не настроено)

В панели управления доменом myhelper.uz добавьте A-запись:
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

### 7. Установка SSL сертификата (HTTPS)

```bash
# Установка Certbot
apt install certbot python3-certbot-nginx -y

# Получение и установка SSL сертификата
certbot --nginx -d myhelper.uz -d www.myhelper.uz

# Автопродление будет настроено автоматически
```

После установки SSL, nginx автоматически обновит конфигурацию для редиректа с HTTP на HTTPS.

### 8. Проверка работы

Откройте в браузере:
- http://myhelper.uz
- https://myhelper.uz
- http://www.myhelper.uz
- https://www.myhelper.uz

---

## Обновление сайта

Для обновления файлов сайта:

```bash
# Локально
cd /Users/shaxzodisamahamadov/myhelper-site
scp -r * root@95.46.96.147:/var/www/myhelper.uz/

# На сервере (если нужно очистить кэш)
systemctl reload nginx
```

---

## Альтернатива: использование Git

### На сервере:
```bash
cd /var/www/myhelper.uz
git init
git remote add origin <ваш-git-репозиторий>
```

### Для обновления:
```bash
cd /var/www/myhelper.uz
git pull origin main
systemctl reload nginx
```
