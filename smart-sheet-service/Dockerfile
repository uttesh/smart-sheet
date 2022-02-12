FROM node:16.10.0-alpine

WORKDIR /usr/app

COPY *.json ./
RUN yarn

COPY . .

EXPOSE 3006

CMD ["yarn", "run", "start"]