FROM node:lts
WORKDIR /usr/src/app
COPY . .
CMD yarn install && \
    yarn start