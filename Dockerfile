FROM node:14
WORKDIR ./
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "app.js" ]
EXPOSE 8080
