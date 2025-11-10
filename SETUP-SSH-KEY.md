# Настройка SSH ключа для автоматического развертывания

## Проблема
Скрипты не могут подключиться к серверу автоматически, так как требуется пароль.

## Решение: Настройка SSH ключа

### Вариант 1: Если у вас уже есть SSH ключ

```bash
# Скопируйте ваш публичный ключ на сервер
ssh-copy-id root@95.46.96.147
```

Введите пароль один раз, и после этого все скрипты будут работать без пароля.

### Вариант 2: Создать новый SSH ключ

```bash
# 1. Создайте SSH ключ
ssh-keygen -t ed25519 -C "myhelper-deployment"

# Нажмите Enter 3 раза (без пароля для ключа)

# 2. Скопируйте ключ на сервер
ssh-copy-id root@95.46.96.147

# Введите пароль от сервера
```

### После настройки SSH ключа

Просто запустите:
```bash
./quick-deploy.sh
./install-ssl.sh
```

---

## Альтернатива: Ручное развертывание (БЕЗ SSH ключа)

Если вы не хотите настраивать SSH ключ, выполните команды вручную:

### 1. Подключитесь к серверу
```bash
ssh root@95.46.96.147
```

### 2. На сервере выполните:
```bash
# Установка Nginx
apt update && apt install nginx -y
systemctl start nginx && systemctl enable nginx

# Создание директории
mkdir -p /var/www/myhelper.uz
```

### 3. ОТКРОЙТЕ НОВЫЙ ТЕРМИНАЛ (не закрывая первый) и загрузите файлы:
```bash
cd /Users/shaxzodisamahamadov/myhelper-site
scp index.html styles.css script.js translations.js i18n.js root@95.46.96.147:/var/www/myhelper.uz/
scp -r images/ root@95.46.96.147:/var/www/myhelper.uz/
scp nginx-config.conf root@95.46.96.147:/etc/nginx/sites-available/myhelper.uz
```

### 4. Вернитесь в первый терминал (на сервере):
```bash
# Активация конфигурации
ln -s /etc/nginx/sites-available/myhelper.uz /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Проверка
nginx -t

# Перезапуск
systemctl restart nginx

# Права
chown -R www-data:www-data /var/www/myhelper.uz
chmod -R 755 /var/www/myhelper.uz
```

### 5. Установите SSL:
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d myhelper.uz -d www.myhelper.uz
```

Следуйте инструкциям certbot (введите email, согласитесь с условиями).

---

## ✅ Готово!

Сайт будет доступен на:
- http://myhelper.uz
- https://myhelper.uz (после SSL)
