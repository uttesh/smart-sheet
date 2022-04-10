FROM node:latest

WORKDIR /usr/app

COPY *.json ./
RUN yarn

COPY . .

EXPOSE 3006

CMD ["yarn", "run", "start"]