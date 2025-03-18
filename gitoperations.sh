#!/bin/bash

if [ z "$1" = z ]; then
  echo "Please provide a commit message"
  exit
fi

git add .
git commit -m "$1"
git push origin main