FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

ARG PUBLIC_PB_URL
ARG PB_EMAIL
ARG PB_PW

RUN npm run build

EXPOSE 4321
# CMD ["npm", "run", "dev", "--", "--host"]
CMD [ "npm", "run", "preview", "--", "--host" ]
