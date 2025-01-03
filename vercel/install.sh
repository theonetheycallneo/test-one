#!/bin/bash

set -x # set -o xtrace

# 1. Remove existing `.vercel` directory in case it exists.
rm -rf node_modules

# 2. Only install production node_modules
yarn workspaces focus --production
