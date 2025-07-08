FROM node:18-alpine

# Working Directory 
WORKDIR /app

# Copy package json
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy Source Code 
COPY . .



EXPOSE 3000

CMD ["npm","start"]

