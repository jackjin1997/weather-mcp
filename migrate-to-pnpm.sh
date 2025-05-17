#!/bin/bash

# This script helps migrate from npm to pnpm

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "pnpm is not installed. Installing pnpm globally..."
    npm install -g pnpm
fi

# Remove existing node_modules and lock files
echo "Removing existing node_modules and lock files..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Install dependencies with pnpm
echo "Installing dependencies with pnpm..."
pnpm install

echo "Migration to pnpm completed successfully!"
echo "You can now use 'pnpm dev' to start the development server." 