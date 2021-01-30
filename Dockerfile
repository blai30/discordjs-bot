FROM node:12 AS build

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

RUN npm run build



FROM node:12
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY --from=build /usr/src/app/dist dist

CMD ["npm", "run", "start"]
