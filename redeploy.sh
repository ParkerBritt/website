#!/usr/bin/env bash
podman-compose build && podman-compose down && podman-compose up -d

