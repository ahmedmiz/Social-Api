#Use the official Node.js image as a base

FROM node:23.4.0-alpine


#Set the working directory in the container

WORKDIR /usr/src/app

#Copy package.json and package-lock.json (if available)

COPY package*.json ./

#Install dependencies

RUN npm install --legacy-peer-deps

#Copy the rest of your application code

COPY . .

#Build the TypeScript code

RUN npm run build

#Expose the port the app runs on

EXPOSE 3000

#Command to run the application

CMD ["node", "dist/server.js"]
