FROM public.ecr.aws/docker/library/node:18-alpine AS development
ENV NODE_ENV development

WORKDIR /app

COPY ./server.js /app/
COPY ./package.json /app/

RUN npm install && \
    mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

EXPOSE 8080

CMD [ "npm", "start" ]