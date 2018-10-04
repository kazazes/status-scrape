#! /bin/bash

# Without this script, watching with lerna on a per-package level only prints a partial path, which makes debugging a pain.
PREFIX="tsc --preserveWatchOutput true -w -p packages/"

concurrently --prefix " " \
  "${PREFIX}common" \
  "${PREFIX}functions" \
  "${PREFIX}prisma" \
  "${PREFIX}server" \
  "yarn run watch:webpack" \
  | sed '/^\s*$/d'

node_modules/.bin/notify -t 'Compiler' -m 'Watch ended'
