#!/usr/bin/env bash
podman stop nginx
git pull origin main
./start-prod.sh

