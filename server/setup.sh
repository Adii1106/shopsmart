#!/bin/bash

# Idempotent setup script for the server

# Create a data directory if it doesn't exist
mkdir -p data

# Initialize a default config file if it doesn't exist
if [ ! -f data/config.json ]; then
  echo '{"port": 5000, "env": "development"}' > data/config.json
  echo "Created default config."
else
  echo "Config already exists. Skipping."
fi

echo "Setup complete."
