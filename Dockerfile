FROM node:carbon

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]