FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PUBLIC_PB_URL=https://api.breadone.xyz

RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs