FROM node:20-alpine AS node
WORKDIR ./app
COPY .env .
COPY ssl ./ssl

RUN mkdir intermediate

WORKDIR ./server
COPY server .
RUN npm install
CMD ["npm", "run", "start:dev"]


FROM nginx AS nginx
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
COPY ssl ./etc/nginx/ssl
COPY ./nginx.conf /etc/nginx/templates/nginx.conf.template

