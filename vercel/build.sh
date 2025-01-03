#!/bin/bash
# Deploy using the Vercel Build Output API.
# https://vercel.com/docs/build-output-api/v3

set -x # set -o xtrace

# 1. Remove existing `.vercel` directory in case it exists.
rm -rf .vercel

# 2. Create a new `.vercel` directory.
mkdir -p .vercel/output

# 3. Copy the `.vercel` directory scaffold.
cp -a vercel/output/. .vercel/output

# 4. Build project on Vercel.
# yarn build:web

ls -la ./dist
cat ./dist/index.js

# 5. Copy static files to `.vercel` directory.
cp -a dist/client/. .vercel/output/static

cp -a dist/client/. .vercel/output/static

# 6. Bundle render function to a single file.
mv node_modules .vercel/output/functions/index.func/node_modules
cd .vercel/output/functions/index.func

npx ncc build --minify --out . index.js
mv node_modules ../../../../node_modules
# npx ncc build --out . index.js
# npx ncc build --out .vercel/output/functions/index.func .vercel/output/functions/index.func/index.js
