FROM node:13 AS BASE

# Set the working directory
WORKDIR /usr/app

# Copy everything in current directory current working dir
ADD . .

# install dependencies
RUN npm install --no-optional

# expose port
EXPOSE 3000

# Run node 
CMD ["npm", "start"]
