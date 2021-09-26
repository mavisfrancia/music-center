#!/bin/zsh
# https://www.marksayson.com/blog/wait-until-docker-containers-initialized/
set -e

# Max query attempts before consider setup failed
MAX_TRIES=10

# Return true-like values if and only if logs
# contain the expected "ready" line
function dbIsReady() {
  docker-compose logs test_db | grep "database system is ready to accept connections"
}

function waitUntilServiceIsReady() {
  attempt=1
  while [ $attempt -le $MAX_TRIES ]; do
    if "$@"; then
      echo "$2 container is up!"
      break
    fi
    echo "Waiting for $2 container... (attempt: $((attempt++)))"
    sleep 1
  done

  if [ $attempt -gt $MAX_TRIES ]; then
    echo "Error: $2 not responding, cancelling set up"
    exit 1
  fi
}

waitUntilServiceIsReady dbIsReady "test_db"
