FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
ENV PUBLIC_PB_URL=http://pb:8080
ENV PUBLIC_URL=http://localhost:4321

RUN npm run build

EXPOSE 4321
# CMD ["npm", "run", "dev", "--", "--host"]
CMD [ "npm", "run", "preview", "--", "--host" ]
