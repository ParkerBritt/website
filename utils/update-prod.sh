#!/usr/bin/env bash
podman-compose -f ./docker-compose-prod.yaml down
git pull origin main
./start-prod.sh

