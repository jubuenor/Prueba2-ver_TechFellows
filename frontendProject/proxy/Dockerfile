FROM nginx

RUN apt-get update -qq && apt-get -y install apache2-utils

ENV NODE_ROOT /var/www/api-gateway

WORKDIR $NODE_ROOT

RUN mkdir log
RUN mkdir /etc/nginx/certs

COPY app.conf /tmp/app.nginx

COPY ./openssl/cert.crt /etc/nginx/certs/cert.crt 
COPY ./openssl/cert.key /etc/nginx/certs/cert.key

RUN envsubst '$NODE_ROOT' < /tmp/app.nginx > /etc/nginx/conf.d/default.conf

EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]
