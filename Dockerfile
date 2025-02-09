FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile || yarn install

COPY . .

RUN yarn build

ENV PORT=3002

EXPOSE $PORT

CMD ["yarn", "dev"]