FROM node:13-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

# only production
# RUN yarn install --production=true
RUN yarn

COPY ./src .

EXPOSE 3333

# CMD ["yarn", "build", "yarn", "start"]
CMD ["yarn", "dev"]
