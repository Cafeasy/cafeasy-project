FROM node:19.5.0-alpine

#WORKING DIR
WORKDIR /usr/src/app/

#COPY PACKAGE JSON FILE
COPY package*.json ./

#INSTALL PACKAGE
RUN npm install --force

#COPY SOURCE FILES
COPY . .

#EXPOSE API PORT
EXPOSE 3000

#RUN THE APP
CMD ["npm", "start"]