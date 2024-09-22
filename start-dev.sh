#!/usr/bin/env bash

podman-compose -f ./docker-compose-dev.yaml up -d --force-recreate
browser-sync start --proxy "0.0.0.0:8000" --files "./**/*" --no-ui --no-notify
