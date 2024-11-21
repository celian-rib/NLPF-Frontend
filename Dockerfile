FROM node:21-alpine as build

WORKDIR /code

COPY package.json .
COPY package-lock.json .


RUN npm ci 

COPY . .

RUN npm run build

FROM nginx:1.25.4-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/build /usr/share/nginx/html

EXPOSE 80