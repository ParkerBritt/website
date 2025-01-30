#!/usr/bin/env bash

podman-compose -f ./docker-compose-prod.yaml up -d
browser-sync start --proxy "0.0.0.0:8001" --files "./**/*" --no-ui --no-notify
