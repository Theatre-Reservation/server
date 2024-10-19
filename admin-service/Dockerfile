# Stage 1: Build Stage
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and tsconfig.json to the container
COPY package*.json tsconfig.json ./

# Install both dev and production dependencies to get the NestJS CLI
RUN npm install

# Install NestJS CLI globally for build step
RUN npm install -g @nestjs/cli

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy built application and necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Expose the necessary port
EXPOSE 8000

CMD ["node", "dist/main"]
