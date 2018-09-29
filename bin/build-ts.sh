#! /bin/bash

# Without this script, tsc -w on a per-package level would only print a partial path, which makes debugging a pain.
PREFIX="tsc --preserveWatchOutput true -w -p packages/"

concurrently --prefix " " \
  "${PREFIX}common" \
  "${PREFIX}functions" \
  "${PREFIX}prisma" \
  "${PREFIX}server" \
  | sed '/^\s*$/d'

node_modules/.bin/notify -t 'Typescript Compiler' -m 'Watch ended'
