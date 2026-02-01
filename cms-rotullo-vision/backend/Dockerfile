FROM node:18-alpine as builder

WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as runtime
WORKDIR /home/node/app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --production
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 3000
CMD ["node", "dist/server.js"]
