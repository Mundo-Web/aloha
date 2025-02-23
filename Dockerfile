FROM php:8.1-fpm

# Instalar dependencias
RUN apt-get update && apt-get install -y \
  libpng-dev \
  libjpeg62-turbo-dev \
  libfreetype6-dev \
  libzip-dev \
  zip \
  unzip \
  nano


# Configurar y instalar extensiones PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo pdo_mysql zip gd bcmath

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer directorio de trabajo
WORKDIR /var/www/

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias de Composer
RUN composer install --no-interaction --no-dev --optimize-autoloader
RUN php artisan key:generate 
RUN chmod -R 777 storage
RUN chmod -R 777 bootstrap/cache
RUN php artisan storage:link



# Configurar permisos
RUN chown -R www-data:www-data storage bootstrap/cache

# Exponer puerto 9001
EXPOSE 9000

CMD ["php-fpm"]