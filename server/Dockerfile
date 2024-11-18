FROM php:8.0-apache 

RUN docker-php-ext-install pdo pdo_pgsql 

WORKDIR /var/www/html 

COPY . /var/www/html 

RUN chown -R www-data:www-data /var/www/html \ 
    && a2enmod rewrite 
    
EXPOSE 80