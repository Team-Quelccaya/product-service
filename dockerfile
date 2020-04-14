FROM node:13.13
RUN mkdir /app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . .

EXPOSE 4000
CMD ["node", "/usr/src/app/server/index.js"]