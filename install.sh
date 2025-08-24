#!/bin/bash

echo " Welcome to Urvan Plant Store Installation!"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo " Node.js is not installed. Please install Node.js v16 or higher first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo " Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo " Node.js version: $(node -v)"

# Check if MongoDB is running
if ! command -v mongod &> /dev/null; then
    echo "  MongoDB is not installed. Please install MongoDB first."
    echo "Visit: https://docs.mongodb.com/manual/installation/"
    echo "Continuing with installation..."
else
    echo "MongoDB found"
fi

echo ""
echo "Installing dependencies..."

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Return to root
cd ..

echo ""
echo " Dependencies installed successfully!"
echo ""
echo " Next steps:"
echo "1. Start MongoDB (if not already running)"
echo "2. Run: npm run dev"
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo " For detailed instructions, see README.md"
