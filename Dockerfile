FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN apt-get update && apt-get install -y libav-tools
RUN npm install

COPY . /usr/src/app

CMD [ "node", "bot.js" ]