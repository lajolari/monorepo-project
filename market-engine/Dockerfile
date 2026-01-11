FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \

    git curl libpng-dev libonig-dev libxml2-dev zip unzip libsqlite3-dev sqlite3

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath pdo_sqlite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . /var/www

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache