FROM node:9-alpine

ADD .babelrc /.babelrc
ADD package.json /package.json
ADD node_modules /node_modules
ADD demo /demo
ADD dist /dist
ADD webpack /webpack

CMD ["npm", "run", "prod"]
