# Step 1: Use a Smaller Base Image with Multi-Stage Build
# Stage 1: Build Stage
FROM node:16-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Step 2: Copy only the necessary files and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the application files
COPY . .

# Step 3: Build the application
RUN npm run build

# Stage 2: Production Stage (Smaller base image for runtime)
FROM node:16-alpine

# Step 4: Set the working directory for the production environment
WORKDIR /usr/src/app

# Step 5: Copy only the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Step 6: Expose the necessary port
EXPOSE 3001

# Step 7: Start the application in production mode
CMD ["node", "dist/main"]

# Step 8: .dockerignore (exclude unnecessary files)
# Create a .dockerignore file to reduce the size of the build context:
# .dockerignore content:
# node_modules
# .git
# logs
# tmp
