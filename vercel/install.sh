#!/bin/bash

set -x # set -o xtrace

# 1. Remove existing `.vercel` directory in case it exists.
rm -rf node_modules

# 2. Only install production node_modules
yarn workspaces focus --production

# 3. Remove and prune uncessary files inside node_modules directory
npx clean-modules clean '**/*.d.ts' '**/@types/**' '!**/*.png' '!**/*.xls' '!**/*.ppt' '!**/*.rtf' -y
# npx modclean --patterns="default:safe,default:caution" --additional-patterns="*.xls?(x),*.ppt?(x),*.rtf" --ignore="validate-npm-license,readme*"
# du -sh ./node_modules/* | sort -nr | grep '\dM.*'

