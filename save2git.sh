#!/bin/bash
echo "Staging..."
git add .
echo "Commiting..."
git commit -m "$1"
echo "Pushing master..."
git push origin master
echo "DONE!"