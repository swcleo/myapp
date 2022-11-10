FROM nginx

RUN apt-get update -y
RUN apt-get install nginx-extras -y
RUN apt-get install libossp-uuid-perl -y

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/json_log.conf /etc/nginx/json_log.conf
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/conf.d /etc/nginx/conf.d
COPY docker/error-page.html /usr/share/nginx/html
COPY dist/angular-web /usr/share/nginx/html
