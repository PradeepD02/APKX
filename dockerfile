FROM node:lts-alpine3.21
WORKDIR /app
# Copy only package files first
COPY package*.json ./
# Install dependencies inside container (build native modules here)
RUN npm install
# Now copy rest of the source code
COPY . .
# Expose port and define the start command
EXPOSE 3000
CMD ["node", "index.js"]
