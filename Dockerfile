FROM node:latest as build
WORKDIR /app
ENV NODE_ENV production
COPY ./package.json /app/package.json
RUN npm install
COPY . .
RUN npm install --prefix client 
RUN npm run build --prefix client
EXPOSE 5000
CMD ["npm", "run" ,"start"]