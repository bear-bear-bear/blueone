FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 8001
