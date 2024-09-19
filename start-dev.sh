#!/usr/bin/env bash
browser='firefox'

podman-compose -f ./docker-compose-dev.yaml up -d --force-recreate
$browser 'http://0.0.0.0:8000/'
