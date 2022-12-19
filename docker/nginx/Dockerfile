FROM nginx:alpine

COPY reverseproxy/nginx.conf /etc/nginx/nginx.conf

RUN apk update && apk add bash && apk add curl
